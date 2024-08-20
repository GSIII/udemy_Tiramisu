import { PropsWithChildren } from 'react';

export default function ErrorMessage({ children }: PropsWithChildren) {
  return <p className="ml-[2px] mt-2 text-xs text-red-400">{children}</p>;
}
