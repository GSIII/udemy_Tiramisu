import { useStudyStore } from '@/app/stores/studyStore';
import { Study } from '@/types/study';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

export default function Calendar() {
  //  useForm
  const {
    // 특정 필드 값 업데이트
    setValue,
  } = useForm<Study>();

  const { study, setStudy } = useStudyStore();

  // 캘린더
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(),
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  ]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (dates: [Date, Date]) => {
    console.log('dates', dates);
    const [newStartDate, newEndDate] = dates;

    setDateRange([newStartDate, newEndDate]);

    setValue('startDate', newStartDate);
    setValue('endDate', newEndDate);

    setStudy({ startDate: newStartDate, endDate: newEndDate });
  };
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <label
          className="mb-[10px] inline-block font-semibold"
          htmlFor="endDate"
        >
          시작일 | 종료일
        </label>
        <DatePicker
          locale={ko}
          dateFormat={'YYYY.MM.dd(eee)'}
          selectsRange
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          closeOnScroll={true}
          onChange={(dates) => {
            if (dates) {
              handleDateChange(dates as [Date, Date]);
            }
          }}
          withPortal
          placeholderText="종료일을 선택하세요"
          className="mt-[10px] h-[50px] w-full rounded-lg border border-[#c4c4c4] px-[18px] py-[14px]"
        />
        <p className="mb-[34px] mt-[10px] text-sm text-sub-purple">
          스터디 시작일이 모집 마감일로 설정돼요
        </p>
      </div>
    </div>
  );
}
