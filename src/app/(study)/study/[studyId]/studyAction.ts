import { Study } from '@/types/study';
import supabase from '@/utils/supabase/client';
// 스터디 생성
export const addStudy = async (study: Study) => {
  console.log('study는', study);
  const { data, error } = await supabase
    .from('study')
    .insert(study)
    .select('*');

  if (error) console.log(error);

  if (data) {
    // id 값 가져오기
    const { id } = data[0];
    alert('스터디 등록이 완료되었습니다!');
    return { id };
  }
};

// ID로 스터디 조회
export const getStudy = async (studyId: string | string[]) => {
  try {
    console.log('studyId', studyId);
    const { data, error } = await supabase
      .from('study')
      .select('*')
      .eq('id', studyId)
      .single();

    if (error) throw error;

    return { data };
  } catch (error) {
    console.error('알 수 없는 에러가 발생했습니다.', error);
    throw error;
  }
};

// 스터디 수정
export const editStudy = async (studyId: string) => {
  try {
    const { error } = await supabase
      .from('study')
      .update({ title: '제목 수정' })
      .eq('id', studyId);

    if (error) throw error;
  } catch (error) {
    console.error('알 수 없는 에러가 발생했습니다.', error);
    throw error;
  }
};

// 스터디 삭제

export const deleteStudy = async (studyId: string | string[]) => {
  try {
    const { error } = await supabase.from('study').delete().eq('id', studyId);
    if (error) throw error;
    alert('스터디 삭제가 완료되었습니다.');
  } catch (error) {
    console.error('알 수 없는 에러가 발생했습니다.', error);
    throw error;
  }
};
