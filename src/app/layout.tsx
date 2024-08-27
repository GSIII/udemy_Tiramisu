import localFont from 'next/font/local';

import '@/css/globals.css';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import InitUser from '@/stores/user/InitUser';
import { createClient } from '@/utils/supabase/server';

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export const metadata = {
  title: '밋티',
  description: 'Generated by Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <div className="m-auto w-full max-w-[600px] px-4 py-2">
          <Header />
          <main className="h-full">{children}</main>
          <Footer />
          <InitUser user={data.user} />
        </div>
      </body>
    </html>
  );
}
