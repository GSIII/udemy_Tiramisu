'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import ErrorMessage from '@/components/form/ErrorMessage';
import Input from '@/components/form/Input';
import { EMAIL_REG, PASSWORD_REG } from '@/constants/regexPatterns';
import supabase from '@/utils/supabase/client';

interface IFormInput {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
}

export default function SignUpForm() {
  const {
    register,
    watch,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: 'onBlur' });

  const router = useRouter();

  const emailPattern = {
    value: EMAIL_REG,
    message: '올바른 메일 형식으로 입력해주세요.',
  };
  const passwordPattern = {
    value: PASSWORD_REG,
    message: '최소 8자의 영문, 숫자, 특수문자를 입력해주세요.',
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });
    if (error) {
      alert('이미 등록된 계정입니다');
      return;
    }
    router.replace('/login');
    console.log(signUpData, error);
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
          label="이메일 주소"
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
          label="비밀번호"
          errors={errors}
          register={register}
          rules={{
            required: '새 비밀번호를 입력해주세요.',
            pattern: passwordPattern,
          }}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <div>
        <Input<IFormInput>
          id="passwordCheck"
          name="passwordCheck"
          type="password"
          placeholder="비밀번호"
          label="비밀번호 확인"
          errors={errors}
          register={register}
          rules={{
            required: '비밀번호를 입력해주세요.',
            validate: (value) =>
              value === watch('password') ||
              '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
          }}
        />
        {errors.passwordCheck && (
          <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>
        )}
      </div>

      <div>
        <Input<IFormInput>
          id="name"
          name="name"
          type="text"
          placeholder="비밀번호"
          label="이름"
          errors={errors}
          register={register}
          rules={{
            required: '이름을 입력해주세요.',
          }}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <button type="submit">가입하기</button>
    </form>
  );
}
