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

export async function DELETE(req) {
    try {
        const { pageName } = await req.json();

        if (!pageName) {
            return NextResponse.json({ error: 'Page name is required' }, { status: 400 });
        }

        const data = fs.readFileSync(dataFilePath, 'utf8');
        const jsonData = JSON.parse(data);

        if (jsonData.pages.includes(pageName)) {
            jsonData.pages = jsonData.pages.filter(page => page !== pageName);
            delete jsonData.tasks[pageName];
            fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}