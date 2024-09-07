import supabase from '@/utils/supabase/client';

// STUDY_MEMBER 테이블 조회
export async function getStudyMember(studyId: string) {
  console.log(studyId)
  try {
    const { data, error } = await supabase
      .from('studymember')
      .select(`*`)
      .eq('studyId', studyId);

    if (error) {
      console.error('Error fetching study details:', error);
      throw new Error('Failed to fetch study details');
    }

    console.log(data)
    return data;
  } catch (error) {
    console.error('Error in server action:', error);
    throw new Error('Failed to fetch study applies');
  }
}
