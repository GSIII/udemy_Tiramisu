import supabase from '@/utils/supabase/client';
import supabaseServer from '@/utils/supabase/server';

export async function POST(request: Request) {
  const {
    nickname,
    introduction,
    job,
    purposes,
    personalities,
    studySpan,
    image_id,
  } = await request.json();

  const supabaseAuth = supabaseServer();

  const { data, error } = await supabaseAuth.auth.getUser();

  if (error || !data || !data.user) {
    console.error('User not authenticated or session invalid');
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = data.user.id;
  console.log(data);

  try {
    const { data: existingProfile, error: fetchError } = await supabase
      .from('user')
      .select('id')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;
    if (existingProfile) {
      // 기존 프로필이 있으면 업데이트하거나 삽입
      const { data, error } = await supabase
        .from('user')
        .upsert({
          id: userId,
          nickname,
          introduction,
          job,
          purpose: purposes,
          personality: personalities,
          expected_study_span: studySpan,
          image_id,
        })
        .select();

      if (error) throw error;

      return Response.json({
        message: '프로필이 추가되거나 업데이트되었습니다.',
        data,
      });
    } else {
      return Response.json(
        { error: '해당 사용자 ID에 대한 프로필이 존재하지 않습니다.' },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error('error adding or updating profile', error);
    return Response.json(
      { error: '프로필을 추가하거나 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  const supabaseAuth = supabaseServer();

  const { data, error } = await supabaseAuth.auth.getUser();

  if (error || !data || !data.user) {
    console.error('User not authenticated or session invalid');
    return new Response('Unauthorized', { status: 401 });
  }

  const userId = data.user.id;

  try {
    // 1. `user` 테이블에서 사용자 정보 가져오기 (단일 사용자)
    const { data: user, error: userError } = await supabase
      .from('user')
      .select(
        `
        nickname,
        introduction,
        job,
        purpose,
        personality,
        expected_study_span,
        image_id
      `,
      )
      .eq('id', userId)
      .single(); // 단일 사용자를 가져오기 위해 `single()` 사용

    if (userError) throw userError;

    // 2. `image_id`를 사용해 `images` 테이블에서 URL 가져오기
    let imageUrl = null;
    if (user.image_id) {
      const { data: image, error: imageError } = await supabase
        .from('images')
        .select('url')
        .eq('id', user.image_id)
        .single(); // 단일 이미지 가져오기 위해 `single()` 사용

      if (imageError) throw imageError;
      imageUrl = image?.url || null;
    }

    // 3. 사용자 정보와 이미지 URL을 함께 반환
    return Response.json({ ...user, imageUrl });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return Response.json('Failed to fetch user profile', { status: 500 });
  }
}
