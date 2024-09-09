'use client';
import { fetchStudyList } from '@/actions/studyList.action';
import BookmarkIcon from '@/components/icons/Bookmark';
import CalendarSmallIcon from '@/components/icons/CalendarSmallIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import ScrapIcon from '@/components/icons/Scrap';
import { Study } from '@/types/study';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SearchSkeleton from './SearchSkeleton';
import { Checkbox } from '@/components/ui/checkbox';
import Select from '@/components/form/Select';

export default function StudyList() {
  const [loading, setLoading] = useState(true);
  const [studyList, setStudyList] = useState<Study[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('desc');

  function sortStudiesByDate(studyList: Study[], order: string) {
    return studyList.sort((a, b) => {
      return order === 'asc'
        ? new Date(String(a.created_at)).getTime() -
            new Date(String(b.created_at)).getTime()
        : new Date(String(b.created_at)).getTime() -
            new Date(String(a.created_at)).getTime();
    });
  }
  function sortStudiesByViewCount(studyList: Study[]) {
    return studyList.sort((a, b) => Number(b.viewCount) - Number(a.viewCount));
  }

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const studies = await fetchStudyList();
        const sortedStudies = await (selectedFilter === 'desc'
          ? sortStudiesByDate(studies, selectedFilter)
          : sortStudiesByViewCount(studies));
        setStudyList(sortedStudies);
        setLoading(false);
      } catch (error) {
        console.error('스터디 목록을 가져오는 중 오류가 발생했습니다', error);
      }
    };

    fetchStudies();
  }, [selectedFilter]);

  const handleToggleScrap = (id: string) => {
    setStudyList((prevStudyList) =>
      prevStudyList.map((study) =>
        study.id === id ? { ...study, scraped: !study.scraped } : study,
      ),
    );
  };

  return (
    <>
      <div className={'my-5 flex justify-between text-xs text-[#555555]'}>
        {loading ? (
          <div
            className={'my-5 h-4 w-9 animate-pulse rounded-sm bg-[#efefef]'}
          ></div>
        ) : (
          `총 ${studyList.length}건`
        )}
        <div>
          <select onChange={(e) => setSelectedFilter(e.target.value)}>
            <option value="desc">최신순</option>
            <option value="viewCount">조회수순</option>
          </select>
          <select className="ml-4">
            <option>등록일 전체</option>
            <option>최근 1주일</option>
            <option>최근 1개월</option>
          </select>
        </div>
      </div>
      <div className="flex min-h-dvh w-full flex-col gap-4 bg-[#fafafa] px-4 pb-[100px] pt-4">
        <div className={'flex items-center gap-2 text-sm'}>
          {loading ? (
            <div
              className={'h-5 w-24 animate-pulse rounded-sm bg-[#efefef]'}
            ></div>
          ) : (
            <>
              <Checkbox
                id={'isRecruting'}
                className={
                  'h-4 w-4 border-[#999999] data-[state=checked]:bg-[#837486]'
                }
              />
              <label htmlFor={'isRecruting'}> 모집중만 보기</label>
            </>
          )}
        </div>
        {loading ? (
          <SearchSkeleton />
        ) : (
          studyList?.map((study) => (
            // 스터디 카드
            <Link
              href={`/study/${study.id}`}
              key={study.id}
              className="cursor-pointer rounded-lg border border-muted bg-white px-4 py-5 shadow-[0_4px_4px_rgb(0,0,0,0.03)]"
            >
              <div className={'mb-1 flex justify-between text-[#777777]'}>
                {/* {study.created_at} */}
                {/* 모집 직군 */}
                <ul className={'flex gap-1 text-xs'}>
                  {study.roles?.map((role, index) => (
                    <li key={index} className={'flex'}>
                      {role}
                      {index !== study.roles.length - 1 && (
                        <div
                          className={'ml-1 mt-[5px] h-1.5 w-[1px] bg-[#aaaaaa]'}
                        ></div>
                      )}
                    </li>
                  ))}
                </ul>
                {/* 스크랩 버튼 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    study.id && handleToggleScrap(study.id);
                  }}
                >
                  <ScrapIcon
                    className="transition-all duration-300 ease-in-out"
                    stroke={study.scraped ? '' : '#bbbbbb'}
                    fill={study.scraped ? '#6224FD' : 'transparent'}
                  />
                </button>
              </div>
              <div className={'flex flex-col gap-2'}>
                <div
                  className={`w-fit rounded-full border px-2 py-0.5 text-xs ${study.isRecruiting ? 'border-[#ba9fff] bg-accent text-secondary' : 'bg-muted text-[#aaaaaa]'} `}
                >
                  {study.isRecruiting ? '모집 중' : '모집 완료'}
                </div>
                {/* 스터디 제목 */}
                <h2 className="font-medium">{study.title}</h2>
              </div>
              {/* 스터디 태그들 */}
              {study.tags.length !== 0 && (
                <ul className={'mb-6 mt-2 flex flex-wrap gap-2'}>
                  {study.tags?.map((tag, index) => (
                    <li
                      key={index}
                      className="rounded-sm bg-accent px-2 py-1 text-xs text-[#777777]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              <div className={'mt-6 flex'}>
                {/* 디데이 */}

                <div className={'mr-3 text-xs font-semibold text-primary'}>
                  {`D${
                    Number(new Date(study.endDate)) - Number(new Date()) > 0
                      ? '-'
                      : '+'
                  }${Math.abs(
                    Math.round(
                      (Number(new Date(study.endDate)) - Number(new Date())) /
                        1000 /
                        60 /
                        60 /
                        24,
                    ),
                  )}`}
                </div>

                {/* 기간 */}
                <div
                  className={'flex items-center gap-1 text-xs text-[#777777]'}
                >
                  <CalendarSmallIcon fill={'#82829b'} />
                  {format(new Date(study.startDate), 'yyyy.MM.dd (EE)', {
                    locale: ko,
                  })}
                  &nbsp;-&nbsp;
                  {format(new Date(study.endDate), 'MM.dd (EE)', {
                    locale: ko,
                  })}
                </div>
                {/* 조회수 */}
                <div className={'ml-auto flex gap-1 text-xs text-[#908794]'}>
                  <EyeIcon fill={'#908794'} />
                  {study.viewCount?.toString()}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
