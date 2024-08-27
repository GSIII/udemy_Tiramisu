export type Study = {
  id?: string;
  // 모집 직군
  role: string;
  // 스킬
  // skill: string,
  // 스터디 제목
  title: string;
  // 스터디 목적,, purpose
  purpose: string;
  // 스터디 목표 goal
  goal: string;
  // 스터디 주제
  topic: string;
  // 스터디 소개, 진행방식과 커리큘럼
  info: string;
  // 시작일
  startDate: Date;
  // 종료일
  endDate: Date;
  // 모집 인원
  recruitNum: number;
  // 관련 태그들
  tags: string[];
  //
  created_at?: string;
  //
  viewCount?: Number;
};
