'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { addProfile } from './actions';
import Chip from '@/components/html/Chip';
import ProgressBar from '@/components/html/ProgressBar';
import {
  steps,
  jobs,
  purposes,
  personalities,
  studySpans,
} from '@/lib/profileConstants';

export default function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>(
    [],
  );
  const [selectedStudySpan, setSelectedStudySpan] = useState<string>('');

  const handleJobClick = (job: string) => {
    setSelectedJob((prev) => (prev === job ? '' : job));
  };

  const handlePurposeClick = (purpose: string) => {
    setSelectedPurposes((prevPurposes) =>
      prevPurposes.includes(purpose)
        ? prevPurposes.filter((g) => g !== purpose)
        : [...prevPurposes, purpose],
    );
  };

  const handlePersonalityClick = (personality: string) => {
    setSelectedPersonalities((prevPersonalities) =>
      prevPersonalities.includes(personality)
        ? prevPersonalities.filter((i) => i !== personality)
        : [...prevPersonalities, personality],
    );
  };

  const handleStudySpanClick = (studySpan: string) => {
    setSelectedStudySpan((prev) => (prev === studySpan ? '' : studySpan));
  };

  const handleNextClick = async () => {
    const currentStepIndex = steps.indexOf(searchParams.get('step') as string);

    if (!selectedJob) {
      alert('직업은 필수 선택입니다');
      return;
    }

    if (currentStepIndex === -1) return;

    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) {
      router.push(`/profile/create?step=${nextStep}`);
    } else {
      await addProfile(
        selectedJob,
        selectedPurposes,
        selectedPersonalities,
        selectedStudySpan,
        router,
      );
    }
  };

  const handlePreviousClick = () => {
    const currentStepIndex = steps.indexOf(searchParams.get('step') as string);

    if (currentStepIndex > 0) {
      const previousStep = steps[currentStepIndex - 1];
      router.push(`/profile/create?step=${previousStep}`);
    }
  };

  const handleSkipClick = async () => {
    if (searchParams.get('step') !== 'job') {
      await addProfile(
        selectedJob,
        selectedPurposes,
        selectedPersonalities,
        selectedStudySpan,
        router,
      );

      router.push('/profile/success');
    }
  };

  useEffect(() => {
    if (!searchParams.get('step')) {
      router.push('/profile/create?step=job');
    }
  }, [searchParams, router]);

  const currentStepIndex = steps.indexOf(searchParams.get('step') as string);

  return (
    <>
      <div className="relative mb-20">
        <ProgressBar
          currentStepIndex={currentStepIndex}
          totalSteps={steps.length}
        />

        {searchParams.get('step') !== 'job' && (
          <button
            onClick={handleSkipClick}
            className="absolute right-0 top-0 mb-8 mr-4 mt-2 text-[#82829B]"
          >
            skip
          </button>
        )}
      </div>

      {searchParams.get('step') === 'job' && (
        <div id="job" className="text-left">
          <div>
            <div className="mb-5 text-2xl font-semibold">
              김서희님이 관심있는
              <br /> 직무는 무엇인가요?
            </div>
            <div className="mb-[60px] text-[14px]">
              선택한 직무를 바탕으로 스터디를 추천해줄게요!
            </div>
          </div>
          <div className="mb-[138px] flex flex-col items-start gap-y-3">
            {jobs.map((job) => (
              <Chip
                key={job}
                label={job}
                selected={selectedJob === job}
                onClick={() => handleJobClick(job)}
              />
            ))}
          </div>
        </div>
      )}

      {searchParams.get('step') === 'purpose' && (
        <div id="purposes" className="text-left">
          <div>
            <div className="mb-5 text-2xl font-semibold">
              김서희님의
              <br /> 스터디 목적은 무엇인가요?
            </div>
            <div className="mb-[60px] text-[14px]">중복선택도 가능해요</div>
          </div>
          <div className="mb-[138px] flex flex-col items-start gap-y-3">
            {purposes.map((purpose) => (
              <Chip
                key={purpose}
                label={purpose}
                selected={selectedPurposes.includes(purpose)}
                onClick={() => handlePurposeClick(purpose)}
              />
            ))}
          </div>
        </div>
      )}

      {searchParams.get('step') === 'personality' && (
        <div id="personality" className="text-left">
          <div>
            <div className="mb-5 text-2xl font-semibold">
              김서희님은
              <br /> 어떤 스타일이신가요?
            </div>
            <div className="mb-[60px] text-[14px]">중복선택도 가능해요</div>
          </div>
          <div className="mb-[138px] flex flex-wrap items-start gap-x-2 gap-y-3">
            {personalities.map((personality) => (
              <Chip
                key={personality}
                label={personality}
                selected={selectedPersonalities.includes(personality)}
                onClick={() => handlePersonalityClick(personality)}
              />
            ))}
          </div>
        </div>
      )}

      {searchParams.get('step') === 'studySpan' && (
        <div id="studySpans" className="text-left">
          <div>
            <div className="mb-5 text-2xl font-semibold">
              김서희님의
              <br /> 예상 스터디 기간은 얼마인가요?
            </div>
            <div className="mb-[60px] text-[14px]">
              나와 비슷한 유저들과 스터디할 수 있도록 도와드려요!
            </div>
          </div>
          <div className="mb-[138px] flex flex-col items-start gap-y-3">
            {studySpans.map((studySpan) => (
              <Chip
                key={studySpan}
                label={studySpan}
                selected={selectedStudySpan === studySpan}
                onClick={() => handleStudySpanClick(studySpan)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-y-[13px]">
        <div className="text-xs text-middle-gray">
          내용은 다시 수정할 수 있어요!
        </div>
        <div className="flex w-full gap-x-5">
          <button
            onClick={handlePreviousClick}
            className={`flex-[2] cursor-pointer rounded-[8px] border border-middle-gray bg-white ${searchParams.get('step') === 'job' ? 'opacity-50' : ''} h-[49px] w-[124px]`}
          >
            이전
          </button>
          <button
            onClick={handleNextClick}
            className="h-[49px] w-[206px] flex-[3] cursor-pointer rounded-[8px] bg-main-purple text-white"
          >
            {searchParams.get('step') === 'studySpan' ? '프로필 추가' : '다음'}
          </button>
        </div>
      </div>
    </>
  );
}
