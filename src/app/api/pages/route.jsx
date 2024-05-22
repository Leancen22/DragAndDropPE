import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data', 'data.json');

export async function GET() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        return NextResponse.json(jsonData.pages);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(req) {
    const { pageName } = await req.json();

    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        const jsonData = JSON.parse(data);

        if (!jsonData.pages.includes(pageName)) {
            jsonData.pages.push(pageName);
            jsonData.tasks[pageName] = [];
            fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
            return NextResponse.json(jsonData.pages);
        } else {
            return NextResponse.json({ error: 'Page already exists' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
    }
}
