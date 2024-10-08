'use server';

import { getServerUserId } from '../../lib/actions/getServerUserId';
import supabaseServer from '@/utils/supabase/server';

const FOLDER = 'handin';

function handleError(error: any) {
  if (error) {
    throw new Error(error.message);
  }
}

export async function createHandin(formData: FormData) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const file = formData.get('file') as File;
  const text = formData.get('text');
  const homeworkId = formData.get('homeworkId');
  const studyId = formData.get('studyId');
  try {
    if (!userId) {
      throw new Error('There is no user.');
    }
    // 1. 과제 테이블에 데이터 삽입
    const { data: handinData, error: handinError }: { data: any; error: any } =
      await supabase
        .from('handin') // 과제 테이블 이름
        .insert({ homework_id: homeworkId, user_id: userId, text, study_id: studyId })
        .select();

    if (handinError) {
      throw new Error(`Failed to insert handin: ${handinError.message}`);
    }

    const handinId = handinData[0].id;

    // 2. 스토리지 업로드
    const fileName = `handin_${crypto.randomUUID()}`;
    const filePath = `${FOLDER}/${fileName}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from(`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`)
      .upload(filePath, file);

    if (storageError) {
      throw new Error(`Failed to upload storage: ${storageError.message}`);
    }

    const { data: imgData, error: imgError } = await supabase
      .from('images')
      .insert({ url: storageData?.path, target: 'handin', target_id: handinId })
      .select();

    if (imgError) {
      throw new Error(`Failed to upload images: ${imgError.message}`);
    }
    return { success: true, data: { handin: handinData, image: imgData } };
  } catch (error: any) {
    console.log(error.message);
    
    return { success: false, error: error.message };
  }
}

export async function deleteHandin(handinId: string) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  try {
    if (!userId) {
      throw new Error('There is no user.');
    }

    const { data, error } = await supabase
      .from('handin')
      .delete()
      .eq('id', handinId);

    if (error) {
      throw new Error(`Failed to delete handin: ${error.message}`);
    }
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateHandin(formData: FormData) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  const file = formData.get('file') as File;

  const text = formData.get('text');
  const homeworkId = formData.get('homeworkId');
  const id = formData.get('id');
  console.log(file);

  try {
    if (!userId) {
      throw new Error('There is no user.');
    }
    // 과제 업로드
    const { data: handinData, error: handinError }: { data: any; error: any } =
      await supabase
        .from('handin')
        .update({ homework_id: homeworkId, text })
        .eq('id', id)
        .select();

    if (handinError) {
      throw new Error(`Failed to insert handin: ${handinError.message}`);
    }

    const handinId = handinData.id;

    // 스토리지 업로드
    if (file.size > 0) {
      const fileName = `handin_${crypto.randomUUID()}`;
      const filePath = `${FOLDER}/${fileName}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from(`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`)
        .upload(filePath, file, {
          upsert: true,
        });

      if (storageError) {
        throw new Error(`Failed to upload storage: ${storageError.message}`);
      }

      // 이미지 테이블 업로드
      const { data: imgData, error: imgError } = await supabase
        .from('images')
        .insert({
          url: storageData?.path,
          target: 'handin',
          target_id: handinId,
        })
        .select();
      if (imgError) {
        throw new Error(`Failed to upload images: ${imgError.message}`);
      }
      return { success: true, data: { handin: handinData, image: imgData } };
    }
    return { success: true, data: { handin: handinData } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getFeedback(id: string) {
  const supabase = supabaseServer();
  try {
    if (!id) {
      throw new Error('handin id is required');
    }

    const { data, error } = await supabase
      .from('handin')
      .select('*, homework(id, title, subtitle), user(id, name, images(url)), images(url), comments(*)')
      .eq('id', id);

    handleError(error);
    return data;
  } catch (err: any) {
    handleError(err);
  }
}

export async function getJoinedStudyRoomList() {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  try {
    if (!userId) {
      handleError(new Error('user is required'));
    }
    const { data, error } = await supabase
      .from('studymember')
      .select('*, study(id, title, topic, endDate)')
      .eq('participantId', userId);

    const studyList = data?.map((item) => {
      return item.study;
    });
    return { success: true, data: studyList };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
export async function getJoinedStudyRoom(studyId: string) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();

  try {
    if (!userId) {
      handleError(new Error('user is required'));
    }
    const { data, error } = await supabase
      .from('study')
      .select('*')
      .eq('id', studyId)
      .single();

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createComment(formData: FormData) {
  const supabase = supabaseServer();
  const userId = await getServerUserId();
  const comment = formData.get('comment');
  const targetId = formData.get('target_id');
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
      .select('id, user(name), comment');

    if (error) {
      throw new Error(`${error}`);
    }
    return { success: true, data: data};
  } catch (err: any) {
    // TODO 에러 타입
    return { success: false, error: err.message };
  }
}
// export async function createComment({comment, targetId}: {comment: string, targetId: string}) {
//   const supabase = supabaseServer();
//   const userId = await getServerUserId();
//   try {
//     if (!userId) {
//       throw new Error('There is no User');
//     }
//     if (comment === '') {
//       throw new Error('comment is required');
//     }
//     const { data, error } = await supabase
//       .from('comments')
//       .insert({
//         target_id: targetId,
//         user_id: userId,
//         comment,
//       })
//       .select('id, user(name), comment');

//     if (error) {
//       throw new Error(`${error}`);
//     }
//     return { success: true, data: data};
//   } catch (err: any) {
//     // TODO 에러 타입
//     return { success: false, error: err.message };
//   }
// }
