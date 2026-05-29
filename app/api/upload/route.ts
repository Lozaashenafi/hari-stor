// app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Check if token exists
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.error("Missing BLOB_READ_WRITE_TOKEN in environment variables");
        return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Attempt the upload
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const blob = await put(filename, file, {
      access: 'public',
    });

    console.log("Upload successful:", blob.url);
    return NextResponse.json(blob);
    
  } catch (error: any) {
    // THIS WILL SHOW IN YOUR VERCEL LOGS
    console.error('VERCEL BLOB UPLOAD ERROR:', error.message);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}