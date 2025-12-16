import { NextResponse } from 'next/server';

const PASTEBIN_URL = 'https://pastebin.com/raw/3UkfrnXe';

export async function GET() {
    try {
        const response = await fetch(PASTEBIN_URL, {
            cache: 'no-store', // toujours à jour
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch Pastebin data' },
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
