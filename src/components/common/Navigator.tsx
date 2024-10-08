'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { twMerge } from 'tailwind-merge';

import Chat from '../icons/Navigator/Chat';
import Lamp from '../icons/Navigator/Lamp';
import My from '../icons/Navigator/My';
import Search from '../icons/Navigator/Search';

export default function Navigator() {
  const path = usePathname().split('/')[1];

  const menus = [
    {
      icon: <Lamp className="stroke-current" />,
      name: '스터디룸',
      path: '/studyroom',
    },
    {
      icon: <Search className="stroke-current" />,
      name: '탐색',
      path: '/search',
    },
    {
      icon: <Chat className="stroke-current" />,
      name: '채팅',
      path: '/chat',
    },
    {
      icon: <My className="stroke-current" />,
      name: '마이페이지',
      path: '/mypage',
    },
  ];
  return (
    <div className="m-w-[600px] sticky bottom-0 flex justify-between bg-white px-6 py-2.5 shadow shadow-[rgba(0,0,15,0.1)_10px_5px_30px_0px] drop-shadow">
      {menus.map((menu) => {
        return (
          <Link key={menu.name} href={menu.path} className={'flex-1'}>
            <div
              className={twMerge(
                'flex flex-col items-center justify-center gap-1 text-xs',
                menu.path.includes(path)
                  ? 'text-primary'
                  : 'text-muted-foreground',
              )}
            >
              <span>{menu.icon}</span>
              <span>{menu.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
