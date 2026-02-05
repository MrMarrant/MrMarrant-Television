import { NextResponse } from 'next/server';

const PASTEBIN_URL = process.env.STORAGE_LINK;

export async function GET() {
    try {
        if (!PASTEBIN_URL) {
            return NextResponse.json(
                { error: 'STORAGE_LINK environment variable is not set' },
                { status: 500 }
            );
        }
        const response = await fetch(PASTEBIN_URL, {
            cache: 'no-store', // toujours à jour
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch data' },
                { status: 500 }
            );
        }

        const data = await response.json();

        return NextResponse.json(data, {
            status: 200,
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}
