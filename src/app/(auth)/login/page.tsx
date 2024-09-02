import Image from 'next/image';

import AccountRecoveryLinks from '@/components/loginPage/AccountRecoveryLinks';
import LoginForm from '@/components/loginPage/LoginForm';
import SocialButtons from '@/components/loginPage/SocialButtons';

export default function Login() {
  return (
    <div className="bg-gradient-to-bl from-[#e4e4ff] to-[#fff] to-45% pt-16">
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
      <div className="my-6 flex items-center px-4">
        <hr className="flex-grow border-disabled" />
        <span className="mx-4 text-disabled">OR</span>
        <hr className="flex-grow border-disabled" />
      </div>
      <SocialButtons />
      <AccountRecoveryLinks />
    </div>
  );
}
