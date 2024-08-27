'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import ErrorMessage from '@/components/form/ErrorMessage';
import Input from '@/components/form/Input';
import { EMAIL_REG } from '@/constants/regexPatterns';
import supabase from '@/utils/supabase/client';

interface IFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: 'onBlur' });

  const router = useRouter();

  const emailPattern = {
    value: EMAIL_REG,
    message: '올바른 메일 형식으로 입력해주세요.',
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { data: loginData, error } =
      await supabase.auth.signInWithPassword(data);

    if (error) {
      alert('정확한 로그인 정보를 입력해주세요.');
      return;
    }
    router.replace('/');
  };

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <form
      className="flex flex-col gap-3 px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input<IFormInput>
          id="email"
          name="email"
          type="email"
          placeholder="이메일"
          errors={errors}
          register={register}
          rules={{
            required: '이메일을 입력해주세요.',
            pattern: emailPattern,
          }}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div>
        <Input<IFormInput>
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          errors={errors}
          register={register}
          rules={{
            required: '비밀번호를 입력해주세요.',
          }}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <button type="submit">로그인</button>
    </form>
  );
}
