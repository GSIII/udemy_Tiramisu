'use client';

import ProfileAvatar from '@/components/common/\bProfileAvatar';
import Tag from '@/components/common/\bTag';
import Button from '@/components/common/Button';
import { useUser } from '@/stores/user/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserProfileData {
  nickname: string;
  introduction: string;
  job: string;
  purpose: string[];
  personality: string[];
  expected_study_span: string;
  imageUrl: string | null;
}

export default function UserProfile() {
  const router = useRouter();
  const { user } = useUser();
  console.log(user?.user_metadata.name);
  const [profile, setProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile`); // 서버에서 작성한 GET 요청을 호출
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data: UserProfileData = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleGoHome = () => {
    router.push('/'); // 홈 화면으로 이동
  };

  return (
    <div className="flex flex-col items-center">
      <ProfileAvatar src={profile?.imageUrl} alt="Profile" className="mb-2" />

      <div className="mb-10 flex flex-col items-center">
        <div className="mb-2.5 text-xl font-semibold">{profile?.nickname}</div>
        <div className="text-sm">{profile?.job}</div>
      </div>

      <div className="space-y-4 text-left">
        <div>
          <div className="mb-2 text-base font-bold">한줄 자기 소개</div>
          <div>{profile?.introduction}</div>
        </div>
        <hr className="my-4 w-full" />
        <div>
          <div className="mb-2 text-base font-bold">하이라이트 뱃지</div>
          <div>뱃지</div>
        </div>
        <div>
          <div className="mb-2 text-base font-bold">스터디 목적</div>
          <div>
            {profile?.purpose.map((item, index) => (
              <Tag key={index}>{item}</Tag>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 text-base font-bold">키워드</div>
          <div>
            {profile?.personality.map((item, index) => (
              <Tag key={index}>{item}</Tag>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 text-base font-semibold">예상 스터디 기간</div>
          <div>{profile?.expected_study_span}</div>
        </div>
      </div>
      <div className="mt-7">
        <Button
          label="홈으로 가기"
          type="primary"
          size="large"
          borderStyle="flex-[3] rounded-[8px] h-[49px] w-[206px]"
          onClick={handleGoHome}
        />
      </div>
    </div>
  );
}
