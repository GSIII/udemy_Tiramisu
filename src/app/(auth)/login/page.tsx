import Image from 'next/image';

import AccountRecoveryLinks from '@/components/loginPage/AccountRecoveryLinks';
import LoginForm from '@/components/loginPage/LoginForm';
import SocialButtons from '@/components/loginPage/SocialButtons';

export default function Login() {
  return (
    <div className="bg-gradient-custom py-16">
      <div className="mb-6 flex flex-col gap-4 px-4">
        <Image
          src="/images/wavingHand.png"
          width={85}
          height={85}
          alt="손 흔드는 이미지"
          className=""
        />
        <p className="text-[26px] font-semibold">
          반가워요! <br />
          밋티에 오신 것을 환영해요
        </p>
      </div>
      <LoginForm />
      <hr className="mx-4 my-10 border-disabled px-4 after:absolute after:left-1/2 after:-translate-x-2/4 after:-translate-y-2/4 after:bg-white after:px-4 after:text-disabled after:content-['OR']" />
      <div className="flex justify-center gap-6">
        <SocialButtons />
      </div>
      <AccountRecoveryLinks />
    </div>
  );
}
