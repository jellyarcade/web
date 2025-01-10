'use client';

import Image from 'next/image';

const Logo = ({ size = 'small' }) => {
  const dimensions = {
    small: { width: 100, height: 32 },
    medium: { width: 120, height: 38 },
    large: { width: 160, height: 50 },
    xlarge: { width: 160, height: 50 },
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
