import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
// TODO 컴포넌트 퍼블리싱과 분리 및 예외처리
export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  const resetPassword = async (formData: FormData) => {
    'use server';

    const supabase = createClient();
    const password = formData.get('password') as string;

    if (searchParams.code) {
      const { error } = await supabase.auth.exchangeCodeForSession(
        searchParams.code,
      );

      if (error) {
        return redirect(
          `/login/update/password?message=Unable to reset Password. Link expired!`,
        );
      }
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.log(error);
      return redirect(
        `/login/update/password?message=Unable to reset Password. Try again!`,
      );
    }

    redirect(
      `/login?message=Your Password has been reset successfully. Sign in.`,
    );
  };

  return (
    <div>
      <Link
        href="/"
        className="text-foreground bg-btn-background hover:bg-btn-background-hover m-4 rounded-md px-4 py-2 text-sm no-underline"
      >
        Home
      </Link>

      <div className="mx-auto mt-4 w-full px-8 sm:max-w-md">
        <form
          className="animate-in text-foreground mb-4 flex w-full flex-1 flex-col justify-center gap-2"
          action={resetPassword}
        >
          <label className="text-md" htmlFor="password">
            New Password
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <label className="text-md" htmlFor="password">
            Confirm New Password
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            required
          />
          <button
            type="submit"
            className="text-foreground mb-2 rounded-md bg-indigo-700 px-4 py-2"
          >
            Reset
          </button>

          {searchParams?.message && (
            <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
