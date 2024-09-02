'use server';

import supabase from '@/utils/supabase/client';
import { getServerUserId } from './getServerUserId';


export async function createComment(state: any, formData: FormData) {
  const userId = await getServerUserId();
  const comment = formData.get('comment');
  const targetId = formData.get('targetId');

  try {
    if (!userId) {
      throw new Error('There is no User');
    }
    if (comment === '') {
      throw new Error('comment is required');
    }
    const { data, error } = await supabase
      .from('comments')
      .insert({
        target_id: targetId,
        user_id: userId,
        comment,
      })
      .select();

    if (error) {
      throw new Error(`${error}`);
    }
    return { success: true, data };
  } catch (err: any) {
    // TODO 에러 타입
    return { success: false, error: err.message };
  }
}
