import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const theme = searchParams.get('theme');

        // Build the query
        // If a theme is provided, we filter the POIs by checking if they contain the specified tag
        const whereClause = theme ? {
            tags: {
                some: {
                    name: theme
                }
            }
        } : {};

        const pois = await prisma.pOI.findMany({
            where: whereClause,
            include: {
                tags: true,
                galleries: true,
                // Calculate aggregations or fetch reviews if needed
            },
            orderBy: {
                vouchCount: 'desc'
            }
        });

        return NextResponse.json({ pois });
    } catch (error) {
        console.error("Failed to fetch POIs", error);
        return NextResponse.json({ error: "Failed to fetch POIs" }, { status: 500 });
    }
}
