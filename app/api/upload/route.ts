import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 1. Upload to Vercel Blob
    // We add a timestamp to the name to prevent overwriting files with the same name
    const filename = `${Date.now()}-${file.name}`;
    
    const blob = await put(filename, file, {
      access: 'public', // Makes the URL readable by everyone
    });

    // 2. Return the cloud URL back to your ImageUpload component
    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}