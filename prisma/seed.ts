import 'dotenv/config';
import { PrismaClient } from '../lib/generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { findTagSeedByName, POI_TAG_CLUSTERS } from '../lib/poi-tag-taxonomy';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const CSV_COLUMN_INDEX = {
    poiName: 0,
    latitude: 4,
    longitude: 5,
    tag: 6,
    cityMunicipality: 8,
    province: 9,
    street: 10,
    barangay: 11,
    postalCode: 12,
} as const;

type CsvRow = string[];

function getCell(row: CsvRow, index: number): string | undefined {
    const value = row[index]?.trim();
    return value ? value : undefined;
}

function resolveCsvPath(): string {
    const candidates = [
        path.resolve(process.cwd(), 'POI-Legazpi.csv'),
        path.resolve(process.cwd(), '..', 'POI-Legazpi.csv'),
    ];

    for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }

    throw new Error(
        `Could not find POI-Legazpi.csv. Checked: ${candidates.join(', ')}`
    );
}

async function main() {
    console.log('Seeding POIs from POI-Legazpi.csv...');

    const csvFilePath = resolveCsvPath();
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    const rows = parse(fileContent, {
        columns: false,
        skip_empty_lines: true,
        delimiter: ',',
        trim: true,
        bom: true,
    }) as CsvRow[];

    if (rows.length <= 1) {
        throw new Error('CSV has no data rows to seed.');
    }

    const dataRows = rows.slice(1);

    console.log('Clearing existing POI data...');
    await prisma.pOI.deleteMany();
    await prisma.pOITag.deleteMany();
    await prisma.pOITagCluster.deleteMany();

    for (const clusterData of POI_TAG_CLUSTERS) {
        await prisma.pOITagCluster.create({
            data: {
                id: clusterData.id,
                name: clusterData.name,
                iconName: clusterData.iconName,
            },
        });

        for (const tagData of clusterData.tags) {
            await prisma.pOITag.create({
                data: {
                    id: tagData.id,
                    name: tagData.name,
                    iconName: tagData.iconName,
                    clusterId: tagData.clusterId,
                },
            });
        }
    }

    let created = 0;
    let skipped = 0;

    for (const [rowIndex, row] of dataRows.entries()) {
        const poiName = getCell(row, CSV_COLUMN_INDEX.poiName);
        const latitudeRaw = getCell(row, CSV_COLUMN_INDEX.latitude);
        const longitudeRaw = getCell(row, CSV_COLUMN_INDEX.longitude);

        if (!poiName || !latitudeRaw || !longitudeRaw) {
            skipped += 1;
            console.warn(`Skipping row ${rowIndex + 2}: missing POI name or coordinates.`);
            continue;
        }

        const latitude = Number.parseFloat(latitudeRaw);
        const longitude = Number.parseFloat(longitudeRaw);

        if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
            skipped += 1;
            console.warn(`Skipping row ${rowIndex + 2}: invalid coordinates.`);
            continue;
        }

        const rawTag = getCell(row, CSV_COLUMN_INDEX.tag);
        const mappedTag = findTagSeedByName(rawTag);
        const tagId = mappedTag?.id ?? rawTag;
        const street = getCell(row, CSV_COLUMN_INDEX.street);
        const barangay = getCell(row, CSV_COLUMN_INDEX.barangay);
        const cityMunicipality = getCell(row, CSV_COLUMN_INDEX.cityMunicipality);
        const province = getCell(row, CSV_COLUMN_INDEX.province);
        const postalCode = getCell(row, CSV_COLUMN_INDEX.postalCode);

        if (tagId) {
            await prisma.pOITag.upsert({
                where: { id: tagId },
                update: mappedTag
                    ? {
                          name: mappedTag.name,
                          iconName: mappedTag.iconName,
                          clusterId: mappedTag.clusterId,
                      }
                    : {
                          name: tagId,
                      },
                create: mappedTag
                    ? {
                          id: mappedTag.id,
                          name: mappedTag.name,
                          iconName: mappedTag.iconName,
                          clusterId: mappedTag.clusterId,
                      }
                    : {
                          id: tagId,
                          name: tagId,
                      },
            });
        }

        const hasAddress = [street, barangay, cityMunicipality, province, postalCode].some(
            (value) => Boolean(value)
        );

        const poi = await prisma.pOI.create({
            data: {
                name: poiName,
                description: `Autogenerated seed description for ${poiName}.`,
                latitude,
                longitude,
                primaryTagId: tagId,
                tags: tagId
                    ? {
                            connect: [
                                {
                                    id: tagId,
                                },
                            ],
                        }
                    : undefined,
                address: hasAddress
                    ? {
                            create: {
                                street,
                                barangay,
                                cityMunicipality,
                                province,
                                postalCode,
                            },
                        }
                    : undefined,
            },
            include: {
                tags: true,
                address: true,
            },
        });

        created += 1;
        const tagNames = poi.tags.map((item) => item.name).join(', ');
        console.log(
            `Created POI: ${poi.name} | Primary Tag: ${poi.primaryTagId ?? 'none'} | Tags: ${tagNames || 'none'} | Address: ${poi.address ? 'yes' : 'no'}`
        );
    }

    console.log(`Seeding completed successfully. Created: ${created}, Skipped: ${skipped}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
