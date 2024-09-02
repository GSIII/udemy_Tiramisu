import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';

const BUCKET_NAME = 'images';

export async function GET (req: NextRequest) {
  let query = supabase.from('handin').select('id, text, created_at, images(url), user(name)').order('created_at', {ascending: false});
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (id) {
    query = supabase.from('handin')
    .select('id, text, created_at, images(url), user(name), comments(id, comment, created_at, user_id, user(name), reactions(reactions))').order('created_at', { referencedTable: 'comments', ascending: false }).eq('id', id);
  }
  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error });
  }
  return NextResponse.json(data);
};

export async function POST (req: NextRequest) {
  const newFileName = 'handinImg_' + crypto.randomUUID();
  const formData = await req.formData();
  const files = formData.getAll('files') as File[];
  const jsonData = JSON.parse(formData.get('data') as string);

  try {
      if (files.length > 0) {
          const fileToStorage = files[0];

          const { data: storageData, error: storageError } = await supabase.storage.from(BUCKET_NAME).upload(`handin/${newFileName}`, fileToStorage);
          if (storageError) {
              throw { message: 'File upload error', error: storageError };
          }
          
          const { data: storageUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storageData.path);
          
          
          const { data: imgData, error: imgError } = await supabase.from('images')
          .insert({ target: 'handin', url: storageUrlData.publicUrl}).select();
          if (imgError) {
              throw { message: 'File upload error', error: imgError };
          }

          const { data, error } = await supabase.from('handin')
          .insert({homework_id: jsonData.homework_id, user_id: 'afbf8da9-baf2-4c34-ba94-49fa57b3c813', text: jsonData.text, images: imgData[0].id})
          .select();

          if (error) {
              throw { message:'Handin update error', error: error };
          }

          return NextResponse.json(data);
      } else {
        throw { message: 'There is no Handin images.'};
          // console.log('파일 없음');
          // const { data, error } = await supabase.from('handin')
          //         .insert({ text: jsonData.text })
          //         .select()
          // if (error) {
          //     throw { message: 'Handin update error2', error: error };
          // }
      }
  } catch (err) {
      return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    try {
        if (id) {
            const response = await supabase
                .from('handin')
                .delete()
                .eq('id', id)

            return NextResponse.json(response);
        } else {
            throw { message: 'There is no handin id.' }
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}