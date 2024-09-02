import React from 'react';

interface TagProps {
  children: React.ReactNode; // children의 타입을 React.ReactNode로 지정
}

const Tag: React.FC<TagProps> = ({ children }) => (
  <span className="mr-3 inline-block rounded-md border border-[#BCBCBC] bg-white px-3 py-[10px] text-sm">
    {children}
  </span>
);

export default Tag;
