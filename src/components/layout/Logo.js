'use client';

import Image from 'next/image';

const Logo = ({ size = 'small' }) => {
  const dimensions = {
    small: { width: 90, height: 28 },
    medium: { width: 110, height: 34 },
    large: { width: 130, height: 40 },
  };

  const { width, height } = dimensions[size];

  return (
    <Image
      src='/images/logo.png'
      alt='Jelly Arcade'
      width={width}
      height={height}
      priority
    />
  );
};

export default Logo;
