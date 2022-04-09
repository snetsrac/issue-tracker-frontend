import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';

type PaginationButtonDesktopEndProps = {
  href: { pathname: string; query: any } | undefined;
  position: 'left' | 'right';
};

export default function PaginationButtonDesktop({
  href,
  position,
}: PaginationButtonDesktopEndProps) {
  let content;

  if (position === 'left') {
    content = (
      <>
        <span className='sr-only'>Previous</span>
        <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
      </>
    );
  } else if (position === 'right') {
    content = (
      <>
        <span className='sr-only'>Next</span>
        <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
      </>
    );
  }

  const rounded = position === 'left' ? 'rounded-l-md' : 'rounded-r-md';

  return href ? (
    <Link href={href}>
      <a
        className={`relative inline-flex items-center ${rounded} border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50`}
      >
        {content}
      </a>
    </Link>
  ) : (
    <div
      className={`relative inline-flex cursor-not-allowed items-center ${rounded} border border-gray-300 bg-gray-200 px-2 py-2 text-sm font-medium text-gray-400`}
    >
      {content}
    </div>
  );
}
