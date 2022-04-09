import Link from 'next/link';
import { ReactNode } from 'react';

type PaginationButtonMobileProps = {
  href: { pathname: string; query: any } | undefined;
  children: ReactNode;
};

export default function PaginationButtonMobile({
  href,
  children,
}: PaginationButtonMobileProps) {
  return href ? (
    <Link href={href}>
      <a className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
        {children}
      </a>
    </Link>
  ) : (
    <div
      className='relative inline-flex cursor-not-allowed items-center rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-400'
      aria-hidden='true'
    >
      {children}
    </div>
  );
}
