'use client';

import Link from 'next/link';

import ROUTE_PATH from '@/constants/route';
import { useUser } from '@/stores/user/user';
import supabase from '@/utils/supabase/client';
import { NextUIProvider } from '@nextui-org/react';

export default function Notes() {
  const user = useUser((s) => s.user);
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  console.log(user);
  if (!user)
    return (
      <>
        <div>로그인이 필요합니다.</div>
        <Link href={ROUTE_PATH.AUTH.LOGIN}>로그인하기</Link>
      </>
    );
  return (
    <div>
      <h1>환영합니다, {user.email}</h1>
      <p>유저 ID: {user.id}</p>
      <button type="button" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}
