import Link from 'next/link';

type PaginationButtonDesktopProps = {
  href?: { pathname: string; query: any };
  current?: boolean;
  collapse?: boolean;
};

const currentClasses =
  'relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600';
const collapseClasses =
  'relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex';
const otherClasses =
  'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50';

export default function PaginationButtonDesktop({
  href,
  current,
  collapse,
}: PaginationButtonDesktopProps) {
  const classes = current
    ? currentClasses
    : collapse
    ? collapseClasses
    : otherClasses;

  return href ? (
    <Link href={href}>
      <a className={classes}>{href.query.page}</a>
    </Link>
  ) : (
    <span className='relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700'>
      ...
    </span>
  );
}
