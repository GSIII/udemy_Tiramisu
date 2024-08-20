'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { addProfile } from './actions';
import Chip from '@/components/html/Chip';

export default function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedIntros, setSelectedIntros] = useState<string[]>([]);
  const [selectedStudySpan, setSelectedStudySpan] = useState<string>('');

  const steps = ['job', 'goal', 'introduction', 'studySpan'];

  const jobs = ['개발자', '디자이너', '기획자'];
  const goals = [
    '자기 개발',
    '툴 능력 향상',
    '해당 분야의 네트워킹 확장',
    '취미',
  ];
  const introductions = [
    '주도적인',
    '열정적인',
    '손이 빠른',
    '시간을 지키는',
    '꼼꼼한',
    '모험적인',
    '신중한',
    '커뮤니케이션에 능숙한',
    '논리적인',
    '파워 J',
    '분석적인',
    '동기부여가 필요한',
    '완벽주의',
  ];
  const studySpans = ['1개월 이내', '1개월~3개월', '3개월~6개월', '6개월 이상'];

  const handleJobClick = (job: string) => {
    setSelectedJob((prev) => (prev === job ? '' : job));
  };

  const handleGoalClick = (goal: string) => {
    setSelectedGoals((prevGoals) =>
      prevGoals.includes(goal)
        ? prevGoals.filter((g) => g !== goal)
        : [...prevGoals, goal],
    );
  };

  const handleIntroClick = (introduction: string) => {
    setSelectedIntros((prevIntros) =>
      prevIntros.includes(introduction)
        ? prevIntros.filter((i) => i !== introduction)
        : [...prevIntros, introduction],
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
        selectedGoals,
        selectedIntros,
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
        selectedGoals,
        selectedIntros,
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

  return (
    <>
      <h1>Profile</h1>
      {searchParams.get('step') !== 'job' && (
        <button onClick={handleSkipClick}>skip</button>
      )}

      {searchParams.get('step') === 'job' && (
        <div id="jobs">
          <h2>직업 선택</h2>
          {jobs.map((job) => (
            <Chip
              key={job}
              label={job}
              selected={selectedJob === job}
              onClick={() => handleJobClick(job)}
            />
          ))}
        </div>
      )}

      {searchParams.get('step') === 'goal' && (
        <div id="goals">
          <h2>목표 선택</h2>
          {goals.map((goal) => (
            <Chip
              key={goal}
              label={goal}
              selected={selectedGoals.includes(goal)}
              onClick={() => handleGoalClick(goal)}
            />
          ))}
        </div>
      )}

      {searchParams.get('step') === 'introduction' && (
        <div id="introduction">
          <h2>소개 선택</h2>
          {introductions.map((introduction) => (
            <Chip
              key={introduction}
              label={introduction}
              selected={selectedIntros.includes(introduction)}
              onClick={() => handleIntroClick(introduction)}
            />
          ))}
        </div>
      )}

      {searchParams.get('step') === 'studySpan' && (
        <div id="studySpans">
          <h2>스터디 기간 선택</h2>
          {studySpans.map((studySpan) => (
            <Chip
              key={studySpan}
              label={studySpan}
              selected={selectedStudySpan === studySpan}
              onClick={() => handleStudySpanClick(studySpan)}
            />
          ))}
        </div>
      )}

      <button
        onClick={handlePreviousClick}
        disabled={searchParams.get('step') === 'job'}
      >
        이전
      </button>
      <button onClick={handleNextClick}>
        {searchParams.get('step') === 'studySpan' ? '프로필 추가' : '다음'}
      </button>
    </>
  );
}
