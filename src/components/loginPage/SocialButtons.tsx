'use client';

import { Provider } from '@supabase/supabase-js';

import SOCIAL_ICONS from '@/constants/socialIcons';
import supabase from '@/utils/supabase/client';

function SocialButtons() {
  const signInWithSocial = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `http://localhost:3000/api/auth/callback` },
    });
  };

  const bgColor: Partial<Record<Provider, string>> = {
    github: 'bg-[#3c4043]',
    kakao: 'bg-[#fae500]',
    google: 'bg-[#f8f8f8]',
  };

  return (
    <>
      {SOCIAL_ICONS.map((social) => (
        <button
          className={`flex h-11 w-11 items-center justify-center rounded shadow ${bgColor[social.name]}`}
          key={social.name}
          type="button"
          aria-label={social.name}
          onClick={() => signInWithSocial(social.name as Provider)}
        >
          <social.icon />
        </button>
      ))}
    </>
  );
}
export default SocialButtons;
