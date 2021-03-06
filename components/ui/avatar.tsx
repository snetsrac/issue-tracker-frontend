import Image from 'next/image';

type AvatarProps = {
  src?: string;
  height: number;
  width?: number;
  alt: string;
};

export function Avatar({ src, height, width, alt }: AvatarProps) {
  return src ? (
    <Image
      src={src}
      height={height}
      width={width || height}
      className='inline-block rounded-full'
      alt={alt}
    />
  ) : (
    <span
      className='inline-block overflow-hidden rounded-full bg-gray-100'
      style={{ height: height, width: width || height }}
    >
      <svg
        className='h-full w-full text-gray-300'
        fill='currentColor'
        viewBox='0 0 24 24'
      >
        <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
      </svg>
    </span>
  );
}
