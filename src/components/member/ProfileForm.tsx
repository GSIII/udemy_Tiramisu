import { useRef, useState } from 'react';
import { Avatar } from '@nextui-org/react';

interface ProfileFormProps {
  onFileChange: (file: File | null) => void;
  onNicknameChange: (nickname: string) => void;
  onIntroductionChange: (introduction: string) => void;
}

export default function ProfileForm({
  onFileChange,
  onNicknameChange,
  onIntroductionChange,
}: ProfileFormProps) {
  const [nickname, setNickname] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    onNicknameChange(e.target.value);
  };

  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setIntroduction(e.target.value);
    onIntroductionChange(e.target.value);
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        onFileChange(file);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImage(null);
      onFileChange(null);
    }
  };

  return (
    <>
      <div>
        <div className="mb-5 text-2xl font-semibold">
          김서희님의 프로필을 작성해주세요!
        </div>
        <div className="mb-[60px] text-[14px]">
          작성하신 내용은 공개 프로필에 사용됩니다.
        </div>
      </div>

      <div className="mb-[138px] flex flex-col items-center gap-y-3">
        <Avatar
          showFallback
          src={profileImage || 'https://images.unsplash.com/broken'}
          alt="Profile"
          onClick={handleAvatarClick}
          className="h-24 w-24 cursor-pointer"
        />

        {/* 숨겨진 파일 입력 요소 */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />

        <form className="w-full space-y-3">
          <div>
            <label htmlFor="nickname" className="block text-lg font-semibold">
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              className="mt-1 block w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="introduction" className="">
              한줄 소개
            </label>
            <textarea
              id="introduction"
              value={introduction}
              onChange={handleIntroductionChange}
              className="mt-1 block w-full rounded border border-gray-300 p-2"
            />
          </div>
        </form>
      </div>
    </>
  );
}
