import Link from 'next/link';

import LaptopIcon from '@/components/icons/LaptopIcon';
import MessageIcon from '@/components/icons/MessageIcon';
import MoreIcon from '@/components/icons/MoreIcon';
import NutIcon from '@/components/icons/NutIcon';
import RocketIcon from '@/components/icons/RocketIcon';
import SquareIcon from '@/components/icons/SquareIcon';
import AccountRecoveryLinks from '@/components/loginPage/AccountRecoveryLinks';
import SocialButtons from '@/components/loginPage/SocialButtons';
import ROUTE_PATH from '@/constants/route';

export default async function Home() {
  return (
    <div className="bg-gradient-custom py-16">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-lg font-semibold text-dark-gray">
          같은 목표로 공부중인 유저
        </p>
        <span className="text-center text-2xl font-extrabold text-sub-purple">
          123명
        </span>
      </div>

      <div className="relative m-auto mb-3 mt-20 h-[332px] w-full overflow-hidden">
        <SquareIcon
          width={150}
          height={150}
          className="absolute bottom-0 right-0 -translate-y-[20%] translate-x-[25%]"
        />
        <NutIcon
          width={120}
          height={120}
          className="absolute bottom-0 left-0 -translate-x-1/2 -translate-y-1/2"
        />
        <LaptopIcon
          width={167}
          height={126}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <MessageIcon
          width={68}
          height={38}
          className="animate-messageMove absolute left-[58%] top-14 z-10"
        />
        <RocketIcon
          className="animate-rocketMove absolute left-1/2 top-1/2"
          width={104}
          height={159}
        />
      </div>

      <div className="flex justify-center gap-6">
        <SocialButtons />
        <Link
          href={ROUTE_PATH.AUTH.LOGIN}
          className="flex h-11 w-11 items-center justify-center rounded bg-dark-gray shadow"
        >
          <MoreIcon className="h-7 w-7 fill-black stroke-white" />
        </Link>
      </div>

      <AccountRecoveryLinks />
    </div>
  );
}
