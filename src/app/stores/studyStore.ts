import { Study } from '@/types/study';
import { create } from 'zustand';

type StudyState = {
  study: Study;
  setStudy: (study: Partial<Study>) => void;
};

export const useStudyStore = create<StudyState>((set) => ({
  // study 초기값
  study: {
    // 모집 직군
    role: '',
    // 스킬
    // skill: '',
    // 스터디 제목
    title: '',
    // 스터디 목적,, purpose
    purpose: '',
    // 스터디 목표 goal
    goal: '',
    // 스터디 주제
    topic: '',
    // 스터디 소개, 진행방식과 커리큘럼
    info: '',
    // 시작일
    startDate: new Date(),
    // 종료일
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    // 모집 인원ß
    recruitNum: 1,
    // 관련 태그들
    tags: [],
  },
  // 스터디 만들기
  setStudy: (study) =>
    set((state) => ({
      study: { ...state.study, ...study },
    })),
}));
