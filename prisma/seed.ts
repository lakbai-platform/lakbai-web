import 'dotenv/config';
import { PrismaClient } from '../lib/generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding the database with POIs from POI-Legazpi.csv...');

    // 1. Read and parse the CSV file
    const csvFilePath = path.join(__dirname, '../POI-Legazpi.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    // Parse the CSV content
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        delimiter: ';',
    });

    // 2. Clear existing tags and POIs (optional, good for clean runs)
    console.log('Clearing existing data...');
    await prisma.pOI.deleteMany();
    await prisma.pOITag.deleteMany();

    // 3. Process each record and create POIs
    for (const record of records as any[]) {
        const { poiName, lat, long, theme } = record;

        if (!poiName || !lat || !long) {
            continue; // Skip invalid rows
        }

        // Connect or Create the Tag based on the theme
        const tagData = theme ? {
            connectOrCreate: {
                where: { name: theme },
                create: { name: theme },
            }
        } : undefined;

        // Create the POI in the database
        const poi = await prisma.pOI.create({
            data: {
                name: poiName,
                description: `This is a placeholder description for ${poiName}. You can edit this later.`,
                latitude: parseFloat(lat),
                longitude: parseFloat(long),
                operatingHours: '9:00 AM - 5:00 PM', // Dummy data
                tags: tagData,
            },
            include: {
                tags: true,
            }
        });

        console.log(`Created POI: ${poi.name} | Tags: ${poi.tags.map((t: any) => t.name).join(', ')}`);
    }

    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
