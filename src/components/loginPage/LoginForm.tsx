'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { postLogin } from '@/apis/auth';
import Button from '@/components/common/Button';
import ErrorMessage from '@/components/form/ErrorMessage';
import Input from '@/components/form/Input';
import { emailPattern } from '@/constants/validationPatterns';
import { useUser } from '@/stores/user/user';
import { LoginFormData } from '@/types/auth';

export default function LoginForm() {
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ mode: 'onBlur' });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    try {
      const user = await postLogin(formData);
      useUser.setState({ user });
      if (user.onboarding) {
        const path = user.participatingStudy
          ? `/studyroom/${user.participatingStudy}/calendar`
          : '/studyroom';
        router.replace(path);
      } else {
        router.replace('/walkthrough');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <form className="flex flex-col gap-[60px]">
      <div className="flex flex-col gap-3">
        <Input<LoginFormData>
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
        <Input<LoginFormData>
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
      <div className="mt-5 flex justify-center">
        <Button
          label="로그인"
          type="primary"
          size="large"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}
