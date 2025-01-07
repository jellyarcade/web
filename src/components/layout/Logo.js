'use client';

import Image from 'next/image';

const Logo = ({ size = 'small' }) => {
  const dimensions = {
    small: { width: 120, height: 32, className: 'h-8 w-auto' },
    large: { width: 300, height: 100, className: 'h-16 w-auto' },
  };

  const { width, height, className } = dimensions[size];

  return (
    <div className='block'>
      <Image
        src='/images/logo.png'
        alt='Jelly Arcade'
        width={width}
        height={height}
        className={className}
        priority
      />
    </div>
  );
};

export default Logo;
