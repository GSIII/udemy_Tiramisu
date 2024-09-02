'use server';

import supabase from '@/utils/supabase/client';
import { getServerUserId } from './getServerUserId';

const BUCKET = 'images';
const FOLDER = 'handin';


export async function createHandin(state: any, formData: FormData) {
  const userId = await getServerUserId();
  const id = formData.get('id');
  const file = formData.get('file');
  const text = formData.get('text');
  const homeworkId = formData.get('homeworkId');

  try {
    if (!userId) {
      throw new Error('There is no User');
    }
    if (text === '') {
      throw new Error('comment is required');
    }

    const { data, error } = await supabase
      .from('handin')
      .insert({
        homework_id: '2',
        user_id: userId,
        text: text,
        images: '1',
      })
      .select();

    if (error) {
      throw new Error(`${error}`);
    }
    console.log(data);
    return { success: true, data };
  } catch (err: any) {
    // TODO 에러 타입
    return { success: false, error: err.message };
  }
}

async function addStorage(file: File) {
  try {
    if (!file) {
      throw new Error('There is no File');
    }
    const fileName = 'handinImg_' + crypto.randomUUID();

    const { data, error } = await supabase
      .storage
      .from(BUCKET)
      .upload(`${FOLDER}/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })
      if (error) {
        throw new Error(`${error}`);
      }
      return { success: true, data: data };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
}

async function getStoragePublicUrl(path: string) {
  try {
    if (!path) {
      throw new Error('There is no path');
    }
    const { data } = supabase
    .storage
    .from(BUCKET)
    .getPublicUrl(`${FOLDER}/${path}`)

    return { success: true,  data: data};
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

async function insertFile(path: string) {
  try {
    if (!path) {
      throw new Error('There is no storage path');
    }
    const { data, error } = await supabase
      .from('images')
      .insert({ url: path })
      .select();
    if (error) {
      throw new Error(`${error}`);
    }
    return { sucess: true, data: data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
