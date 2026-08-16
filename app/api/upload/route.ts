// app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-guard';

export async function POST(request: Request) {
  try {
    // Only authenticated admins may upload files
    await requireAdmin();

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

    // Only allow images, and cap the file size at 10 MB
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 400 });
    }

    // Attempt the upload
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const blob = await put(filename, file, {
      access: 'public',
    });

    console.log("Upload successful:", blob.url);
    return NextResponse.json(blob);
    
  } catch (error: unknown) {
    // THIS WILL SHOW IN YOUR VERCEL LOGS
    console.error('VERCEL BLOB UPLOAD ERROR:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 500 });
  }
}