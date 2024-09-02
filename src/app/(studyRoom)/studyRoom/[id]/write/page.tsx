'use client';
import supabase from '@/utils/supabase/client';
import Button from '@/components/common/Button';
import { useForm } from 'react-hook-form';
import NavLink from '@/components/study/NavLink';
import { usePathname, useRouter } from 'next/navigation';
import ErrorMessage from '@/components/form/ErrorMessage';
// import Input from '@/components/form/Input';

export default function Page() {
  const path = usePathname();
  const pathID = path.split('/')[2];
  console.log(pathID);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const { title, subtitle, startDate, endDate } = data;

      const { error } = await supabase.from('homework').insert([
        {
          title,
          subtitle,
          startDate,
          endDate,
          studyId: pathID, // studyroomID
        },
      ]);

      if (error) throw error;

      router.push(`../${pathID}/handin`);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <>
      {/* TODO: Input 교체, error message  */}
      <NavLink />
      <div className="flex min-h-screen w-full max-w-[600px] flex-col items-center px-4 py-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col"
        >
          <div className="text-left text-base font-semibold leading-normal">
            스터디 제목
          </div>
          <input
            className="mt-2 h-12 w-full rounded-lg border border-[#c4c4c4] px-4"
            type="text"
            id="title"
            name="title"
            placeholder="스터디 과제의 제목을 작성해주세요."
            errors={errors}
            {...register('title', { required: '제목을 작성해주세요.' })}
          />
          {/* {errors.title && <ErrorMessage error={errors.title} />} */}

          <div className="mt-4 text-left text-base font-semibold leading-normal">
            스터디 부제목
          </div>
          <input
            className="mt-2 h-12 w-full rounded-lg border border-[#c4c4c4] px-4"
            type="text"
            id="subtitle"
            name="subtitle"
            placeholder="스터디 과제의 부제목을 작성해주세요."
            {...register('subtitle', { required: '부제목을 작성해주세요.' })}
          />
          {/* <ErrorMessage error={errors.subtitle} /> */}

          <div className="mt-4 flex justify-between">
            <div className="w-1/2">
              <div className="text-base font-semibold leading-normal text-black">
                시작일
              </div>
              <input
                type="date"
                {...register('startDate', {
                  required: '시작일을 선택해주세요.',
                })}
                className="mt-2 h-12 w-full rounded-lg border border-[#c4c4c4] px-4"
              />
              {/* <ErrorMessage error={errors.startDate} /> */}
            </div>

            <div className="ml-4 w-1/2">
              <div className="text-base font-semibold leading-normal text-black">
                종료일
              </div>
              <input
                type="date"
                {...register('endDate', { required: '종료일을 선택해주세요.' })}
                className="mt-2 h-12 w-full rounded-lg border border-[#c4 c4c4] px-4"
              />
              {/* <ErrorMessage error={errors.endDate} /> */}
            </div>
          </div>

          <footer className="flex w-full justify-center bg-white py-4">
            <Button type="primary" size="large" label="과제 생성" onClick={handleSubmit(onSubmit)} />

          </footer>
        </form>
      </div>
    </>
  );
}
