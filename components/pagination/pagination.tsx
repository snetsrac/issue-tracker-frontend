import { useRouter } from 'next/router';
import { PageMetadata } from '../../api';
import PaginationButtonDesktop from './paginationButtonDesktop';
import PaginationButtonDesktopEnd from './paginationButtonDesktopEnd';
import PaginationButtonMobile from './paginationButtonMobile';
import PaginationMetadata from './paginationMetadata';

export type PageQuery = {
  page: number;
  size?: number;
  sort?: string | string[];
};

type PaginationProps = {
  pageQuery: PageQuery;
  pageMetadata: PageMetadata;
};

export default function Pagination({
  pageQuery,
  pageMetadata,
}: PaginationProps) {
  const { previous, next, first, last, nearby } = getPageRefs(
    pageQuery,
    pageMetadata
  );

  return (
    <div className='sticky bottom-0 -mx-4 -mb-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:-mb-10'>
      {/* Previous and next buttons for mobile */}
      <div className='flex flex-1 justify-between sm:hidden'>
        <PaginationButtonMobile href={previous}>
          Previous
        </PaginationButtonMobile>
        <PaginationButtonMobile href={next}>Next</PaginationButtonMobile>
      </div>

      {/* Pagination navbar for tablet and desktop */}
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <PaginationMetadata pageMetadata={pageMetadata} />
        {/* Pagination navbar */}
        <div>
          <nav
            className='relative z-0 inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <PaginationButtonDesktopEnd href={previous} position='left' />
            <PaginationButtonDesktop
              href={first}
              current={pageQuery.page === first.query.page}
            />
            {pageQuery.page > 4 && <PaginationButtonDesktop />}
            {nearby.map((href) => (
              <PaginationButtonDesktop
                href={href}
                current={pageQuery.page === href.query.page}
              />
            ))}
            {pageQuery.page < pageMetadata.totalPages - 3 && (
              <PaginationButtonDesktop />
            )}
            <PaginationButtonDesktop
              href={last}
              current={pageQuery.page === last.query.page}
            />
            <PaginationButtonDesktopEnd href={next} position='right' />
          </nav>
        </div>
      </div>
    </div>
  );
}

export function usePagination() {
  const { query } = useRouter();
  const pageQuery: PageQuery = { page: 0 };

  if (!isNaN(Number(query.page))) {
    pageQuery.page = Number(query.page);
  }

  if (!isNaN(Number(query.size))) {
    pageQuery.size = Number(query.size);
  }

  if (typeof query.sort === 'string') {
    if (query.sort.length > 0) {
      pageQuery.sort = query.sort;
    }
  } else if (query.sort !== undefined) {
    pageQuery.sort = query.sort.filter((s) => s.length > 0);
  }

  return {
    pageQuery,
  };
}

function getPageRefs(pageQuery: PageQuery, pageMetadata: PageMetadata) {
  const { pathname } = useRouter();

  const newPageHref = (page: number) => {
    return {
      pathname,
      query: { ...pageQuery, page },
    };
  };

  // Note: server pages are 0-indexed and client pages are 1-indexed

  const previous =
    pageMetadata.number > 0 ? newPageHref(pageMetadata.number) : undefined;

  const next =
    pageMetadata.number < pageMetadata.totalPages - 1
      ? newPageHref(pageMetadata.number + 2)
      : undefined;

  const first = newPageHref(1);

  const last = newPageHref(pageMetadata.totalPages);

  let start: number;

  if (pageQuery.page <= 4) {
    start = 2;
  } else if (
    pageQuery.page > 4 &&
    pageQuery.page < pageMetadata.totalPages - 3
  ) {
    start = pageQuery.page - 1;
  } else {
    start = pageMetadata.totalPages - 3;
  }

  const nearby = Array.from({ length: 3 }, (_, i: number) => i + start).map(
    (i) => newPageHref(i)
  );

  return {
    previous,
    next,
    first,
    last,
    nearby,
  };
}
