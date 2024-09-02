import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';

export async function POST (req: NextRequest) {
    // const bucket = 'images';
    const bucket = '';
    const newFileName = 'handinImg_' + crypto.randomUUID();
    const body = await req.json();

    const { data, error } = await supabase.storage.from(bucket).upload(`handin/${newFileName}`, body.file);
    if (error) {
        return NextResponse.json({ error: error });
    }
  
    return NextResponse.json(data);
  }