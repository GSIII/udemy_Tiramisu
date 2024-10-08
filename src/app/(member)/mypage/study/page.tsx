import { getJoinStudy } from '@/actions/mypage.action';
import StudyAvatar from '@/components/common/StudyAvatar';
import Header from '@/components/handin/Header';
import supabaseServer from '@/utils/supabase/server';
import Link from 'next/link';

type Studymember = {
  study: {
    id: string;
    title: string;
    roles: string;
    recruitNum: number;
    endDate: string;
  };
};

export default async function page() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const data = await getJoinStudy({ id: user?.id });
  console.log(data);

  const calddays = (data: string) => {
    const ddays = Math.round(
      (Number(new Date(data)) - Number(new Date())) / 1000 / 60 / 60 / 24,
    );

    const result =
      ddays === 0 ? 'D-Day' : ddays > 0 ? `D-${ddays}` : `D+${Math.abs(ddays)}`;
    return result;
  };

  return (
    <div className="relative h-full">
      <Header
        leftIcon
        label={`참여중인 스터디 ${data.studymember.length}`}
        rightIcon={<div></div>}
        sticky={true}
        useBorderBottom={false}
        bgColor={'bg-white'}
      />
      <div className="m-auto flex w-full max-w-[600px] flex-col px-4 pt-7">
        <div className="flex flex-col gap-2 rounded-lg">
          {data.studymember.map((item: Studymember) => (
            <Link
              href={`/studyroom/${item.study.id}/calendar`}
              key={item.study.id}
            >
              <div className="flex items-center gap-2 rounded-lg border border-[#dddddd] p-2">
                <StudyAvatar />
                <div className="flex-col items-start justify-start gap-6">
                  <div className="flex flex-col items-start justify-start gap-3">
                    <div className="flex w-full flex-col justify-start gap-1">
                      <p className="text- text-[16px] font-semibold text-black">
                        {item.study.title}
                      </p>
                      <div className="h-5 grow basis-0 text-xs font-medium text-muted-foreground">
                        {item.study.roles} | 멤버 {item.study.recruitNum} |{' '}
                        {calddays(item.study.endDate)}
                      </div>
                      <div className="w-72 items-center justify-start"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
