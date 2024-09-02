import { NextRequest, NextResponse } from 'next/server';

import supabase from '@/utils/supabase/client';

// 뱃지
// 옵저버 패턴으로 이벤트 즉시 실행

const BUCKET_NAME = 'images';

export async function POST(req: NextRequest) {
  const newFileName = `handinImg_${crypto.randomUUID()}`;
  const formData = await req.formData();
  const files = formData.getAll('files') as File[];
  const jsonData = JSON.parse(formData.get('data') as string);

  try {
    if (files.length > 0) {
      const fileToStorage = files[0];

      const { data: storageData, error: storageError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(`handin/${newFileName}`, fileToStorage);
      if (storageError) {
        throw new Error(`File upload error. ${storageError}`);
      }

      const { data: storageUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storageData.path);

      const { data: imgData, error: imgError } = await supabase
        .from('images')
        .insert({ target: 'handin', url: storageUrlData.publicUrl })
        .select();
      if (imgError) {
        throw new Error(`image insert on table has an error. ${imgError}`);
      }

      const { data, error } = await supabase
        .from('handin')
        .update({
          homework_id: jsonData.homework_id,
          user_id: 'afbf8da9-baf2-4c34-ba94-49fa57b3c813',
          text: jsonData.text,
          images: imgData[0].id,
        })
        .eq('id', jsonData.id);

      if (error) {
        throw new Error(`Handin with file update has an error. ${error}`);
      }

      return NextResponse.json(data);
    }

    const { data, error } = await supabase
      .from('handin')
      .update({ text: jsonData.text })
      .eq('id', jsonData.id)
      .select();
    if (error) {
      throw new Error(`Handin update Error ${error}`);
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
