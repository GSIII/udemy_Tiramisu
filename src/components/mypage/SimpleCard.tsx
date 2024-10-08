import Image from 'next/image';
import Link from 'next/link';
import ProfileAvatar from '@/components/common/ProfileAvatar';

export default function SimpleCard({ userdata }: { userdata: any }) {
  return (
    <>
      <div className="gap-15 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {userdata?.images ? (
            <img
              src={userdata?.images?.url}
              className="h-[60px] w-[60px] rounded-full"
            />
          ) : (
            <ProfileAvatar className="h-[60px] w-[60px]" />
          )}
          <div>
            <p className="text-base font-medium">{userdata.job}</p>
            <p className="text-xl font-bold">{userdata.name}님</p>
          </div>
        </div>

        <Link
          href={`/profile`}
          className="self-end rounded-lg border border-[#EEEAFF] bg-[#FDFBFF] p-2 text-xs text-[#645294]"
        >
          공개용 프로필
        </Link>
      </div>
      {/* <div className="flex h-16 w-full items-end justify-between px-4">
        <div className="flex items-center justify-center gap-4">
        <ProfileAvatar
        src={userdata?.images?.url}
        alt="user profile img"
        className="relative h-16 w-16 overflow-hidden rounded-full object-cover"
        fallback={
          <Image
          alt="user profile img"
          src={userdata?.images?.url}
          fill
          />
          }
          />
          <div className="flex flex-col items-start justify-start gap-1">
          <div className="text-base font-medium text-[#474747]">
          {userdata?.job || '직업정보가 없어요'}
          </div>
          <div className="text-xl font-bold text-black">
          {userdata?.name}
          </div>
          </div>
          </div>
          <div className="relative h-8 w-20">
          <div className="absolute left-0 top-0 h-8 w-20 rounded border border-[#ede9ff] bg-[#fdfbff]" />
          <div className="absolute left-[9px] top-[7px] text-center text-xs font-medium text-[#645294]">
          공개용 프로필
          </div>
          </Link>
          </div>
          </div> */}
    </>
  );
}
