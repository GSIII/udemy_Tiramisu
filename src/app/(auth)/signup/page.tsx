import SignUpForm from '@/components/signUpPage/SignUpForm';

export default function SignUp() {
  return (
    <div className="bg-gradient-to-bl from-[#e4e4ff] to-[#fff] to-45% py-16">
      <div className="mb-4 px-4 pb-6">
        <h1 className="text-2xl font-bold text-dark-gray">회원가입</h1>
      </div>
      <SignUpForm />
    </div>
  );
}
