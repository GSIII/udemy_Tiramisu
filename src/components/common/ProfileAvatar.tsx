// components/CustomAvatar.tsx
'use client';

import { Avatar as NextUIAvatar } from '@nextui-org/avatar';
import React from 'react';

interface CustomAvatarProps {
  src?: string | null; // `null`을 허용
  alt?: string;
  className?: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  src,
  alt = 'Profile',
  className = '',
}) => {
  const fallbackImage = 'https://images.unsplash.com/broken';

  // `src`가 `null`일 때 `fallbackImage`를 사용
  const imageSrc = src || fallbackImage;

  return (
    <NextUIAvatar
      showFallback
      src={imageSrc}
      alt={alt}
      className={`h-24 w-24 ${className}`}
    />
  );
};

export default CustomAvatar;
