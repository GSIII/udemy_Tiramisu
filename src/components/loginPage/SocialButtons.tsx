'use client';

/* eslint-disable jsx-a11y/control-has-associated-label */
import { Provider } from '@supabase/supabase-js';

import GithubIcon from '@/components/icons/GithubIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import KakaoIcon from '@/components/icons/KakaoIcon';
import supabase from '@/utils/supabase/client';

function SocialButtons() {
  const signInWithSocial = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    console.log(data, error);
  };
  return (
    <div className="flex justify-center gap-6">
      <button type="button" onClick={() => signInWithSocial('github')}>
        <GithubIcon width={46} height={46} />
      </button>
      <button type="button" onClick={() => signInWithSocial('kakao')}>
        <KakaoIcon width={46} height={46} />
      </button>
      <button type="button" onClick={() => signInWithSocial('google')}>
        <GoogleIcon width={46} height={46} />
      </button>
    </div>
  );
}
export default SocialButtons;
