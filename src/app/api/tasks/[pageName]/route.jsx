import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data', 'data.json');

export async function GET(req, { params }) {
    const { pageName } = params;

    if (!pageName) {
        return NextResponse.json({ error: 'Page name is required' }, { status: 400 });
    }

    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        return NextResponse.json(jsonData.tasks[pageName] || []);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    const { pageName } = params;
    const { tasks } = await req.json();

    if (!pageName) {
        return NextResponse.json({ error: 'Page name is required' }, { status: 400 });
    }

    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        jsonData.tasks[pageName] = tasks;
        fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
    }
}
