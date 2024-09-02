'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Chip from '@/components/html/Chip';
import ProgressBar from '@/components/html/ProgressBar';
import { steps } from '@/lib/profileConstants';
import { createStepsConfig } from '@/lib/profileStepsConfig';
import ProfileForm from '@/components/member/ProfileForm';
import { addProfile, saveImageUrl, uploadImage } from '@/utils/member/profile';
import Button from '@/components/common/Button';

export default function Profile() {
  const router = useRouter();
  const [step, setStep] = useState<string>(steps[0]);
  const [nickname, setNickname] = useState<string>('');
  const [imageId, setImageId] = useState<number | null>(null); // 상태로 관리
  const [introduction, setIntroduction] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
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

  const handleFileChange = (file: File | null) => {
    setImageFile(file);
  };

  const handleNicknameChange = (nickname: string) => {
    setNickname(nickname);
  };

  const handleIntroductionChange = (introduction: string) => {
    setIntroduction(introduction);
  };

  const handleNextClick = async () => {
    if (step === 'initial') {
      let imageId: number | null = null;
      if (imageFile) {
        // 이미지 업로드 및 URL 저장
        const imageUrl = await uploadImage(imageFile);
        if (!imageUrl) return;

        const id = await saveImageUrl(imageUrl);
        if (id === null) return;

        setImageId(id);
      }

      setStep('job');
    } else if (step === 'job') {
      if (!selectedJob) {
        alert('직업은 필수 선택입니다');
        return;
      }

      const currentStepIndex = steps.indexOf(step);
      const nextStep = steps[currentStepIndex + 1];

      if (nextStep) {
        setStep(nextStep);
      } else {
        await addProfile(
          {
            nickname,
            introduction,
            job: selectedJob,
            purposes: selectedPurposes,
            personalities: selectedPersonalities,
            studySpan: selectedStudySpan,
          },
          imageId,
        );
        router.push('/profile/success');
      }
    } else {
      const currentStepIndex = steps.indexOf(step);
      const nextStep = steps[currentStepIndex + 1];

      if (nextStep) {
        setStep(nextStep);
      } else {
        await addProfile(
          {
            nickname,
            introduction,
            job: selectedJob,
            purposes: selectedPurposes,
            personalities: selectedPersonalities,
            studySpan: selectedStudySpan,
          },
          imageId,
        );
        router.push('/profile/success');
      }
    }
  };

  const handlePreviousClick = () => {
    const currentStepIndex = steps.indexOf(step);

    if (currentStepIndex > 0) {
      const previousStep = steps[currentStepIndex - 1];
      setStep(previousStep);
    }
  };

  const handleSkipClick = async () => {
    if (step !== 'job') {
      await addProfile(
        {
          nickname,
          introduction,
          job: selectedJob,
          purposes: selectedPurposes,
          personalities: selectedPersonalities,
          studySpan: selectedStudySpan,
        },
        imageId,
      );

      router.push('/profile/success');
    }
  };

  const currentStepIndex = steps.indexOf(step);

  const stepsConfig = createStepsConfig(
    selectedJob,
    selectedPurposes,
    selectedPersonalities,
    selectedStudySpan,
    handleJobClick,
    handlePurposeClick,
    handlePersonalityClick,
    handleStudySpanClick,
  );

  const renderStep = stepsConfig[step];

  return (
    <>
      <div className="relative mb-20">
        <ProgressBar
          currentStepIndex={currentStepIndex}
          totalSteps={steps.length}
        />

        {!(step === 'initial' || step === 'job') && (
          <button
            onClick={handleSkipClick}
            className="absolute right-0 top-0 mb-8 mr-4 mt-2 text-[#82829B]"
          >
            skip
          </button>
        )}
      </div>

      <div id={step} className="text-left">
        {step === 'initial' ? (
          <ProfileForm
            onFileChange={handleFileChange}
            onIntroductionChange={handleIntroductionChange}
            onNicknameChange={handleNicknameChange}
          />
        ) : (
          <div>
            <div className="mb-5 text-2xl font-semibold">
              {renderStep.title.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
            <div className="mb-[60px] text-[14px]">
              {renderStep.description}
            </div>

            <div className="mb-[138px] flex flex-col items-start gap-y-3">
              {renderStep.options.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  selected={
                    Array.isArray(renderStep.selectedOptions)
                      ? renderStep.selectedOptions.includes(option)
                      : renderStep.selectedOptions === option
                  }
                  onClick={() => renderStep.handleClick(option)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-[13px]">
        <div className="text-xs text-middle-gray">
          내용은 다시 수정할 수 있어요!
        </div>
        <div className="flex w-full gap-x-5">
          {step !== 'initial' && (
            <Button
              label="이전"
              size="medium"
              borderStyle="flex-[2] rounded-[8px] border h-[49px] w-[124px]"
              onClick={handlePreviousClick}
            />
          )}
          <Button
            label={step === 'studySpan' ? '프로필 추가' : '다음'}
            type="primary"
            size="medium"
            borderStyle="flex-[3] rounded-[8px] h-[49px] w-[206px]"
            onClick={handleNextClick}
          />
        </div>
      </div>
    </>
  );
}
