'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import MoreIcon from '../icons/MoreIcon';
import Button from '../common/Button';
import { useState } from 'react';
import BackArrowIcon from '../icons/BackArrowIcon';
import ToggleMenu from './ToggleMenu';

export default function NavLink({
  pathName,
  children,
}: {
  pathName: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();
  const { studyId } = useParams();

  console.log('path는???', path);
  console.log('studyId는???', studyId);

  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };
  return (
    <>
      {!path.endsWith('study') && (
        <div className="m-auto flex w-full max-w-[600px] flex-col">
          <header className="mx-4 flex items-center justify-between py-2">
            {/* <Link href={`..`}> */}
            {/* 뒤로가기 */}
            <Button
              label={<BackArrowIcon className="fill-dark-gray" />}
              borderStyle={'border-none p-0'}
              onClick={() => router.back()}
              primary={false}
            />

            {/* </Link> */}
            <h2 className="text-lg font-bold">
              {path.endsWith('studyrequest') && <p>대기중인 요청</p>}
              {path.endsWith('write') && <p>스터디 만들기</p>}
            </h2>
            {/* 스터디 만들기 or 스터디 상세 */}
            <div className="relative z-[1] text-[12px]">
              {path.endsWith('write') ? (
                '1 / 2'
              ) : (
                <Button
                  label={
                    <MoreIcon className="h-7 w-7 fill-black stroke-black" />
                  }
                  primary={false}
                  borderStyle={'border-none'}
                  onClick={handleToggleMenu}
                />
              )}
              {/* 토글 메뉴(스터디장만) */}
              {path.endsWith(`study/${studyId}`) && toggleMenu && (
                <ToggleMenu
                  toggleMenu={toggleMenu}
                  onClose={() => setToggleMenu(false)}
                />
              )}
            </div>
          </header>
          {children}
        </div>
      )}
    </>
  );
}
