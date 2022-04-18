import { useRouter } from 'next/router';
import PaginationButtonDesktop from './paginationButtonDesktop';
import PaginationButtonDesktopEnd from './paginationButtonDesktopEnd';
import PaginationButtonMobile from './paginationButtonMobile';
import PaginationMetadata from './paginationMetadata';

export type PageQuery = {
  page: number;
  size?: number;
  sort?: {
    property: string;
    direction: 'asc' | 'desc';
    toString: () => string;
  };
  toggleSort: (accessor: string) => string | object;
  toURLSearchParams: () => URLSearchParams;
  toString: () => string;
};

export type PageMetadata = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
  sort: string[];
};

type PaginationProps = {
  pageQuery: PageQuery;
  pageMetadata: PageMetadata;
};

export default function Pagination({
  pageQuery,
  pageMetadata,
}: PaginationProps) {
  const { previous, next, first, last, nearby } = usePageLinks(
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
                key={href.query.page}
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
  const { pathname, query } = useRouter();
  const pageQuery: PageQuery = {
    page: 1,
    toggleSort: function (this, accessor: string) {
      // Start on page 1 after sorting
      const newQuery: any = { page: 1 };

      if (this.size !== undefined) {
        newQuery.size = this.size;
      }

      if (
        this.sort !== undefined &&
        this.sort.property === accessor &&
        this.sort.direction === 'asc'
      ) {
        newQuery.sort = accessor + ',desc';
      } else {
        newQuery.sort = accessor + ',asc';
      }

      return { pathname, query: newQuery };
    },
    toURLSearchParams: function (this) {
      const params = new URLSearchParams();

      if (this.page !== undefined) {
        // Subtract 1 from the page query because server pages are 0-indexed and
        // client pages are 1 - indexed
        params.set('page', (this.page - 1).toString());
      }

      if (this.size !== undefined) {
        params.set('size', this.size.toString());
      }

      if (this.sort !== undefined) {
        params.set('sort', this.sort.toString());
      }

      return params;
    },
    toString: function (this) {
      return this.toURLSearchParams().toString();
    },
  };

  if (!isNaN(Number(query.page))) {
    pageQuery.page = Number(query.page);
  }

  if (!isNaN(Number(query.size))) {
    pageQuery.size = Number(query.size);
  }

  if (query.sort !== undefined) {
    const sort = typeof query.sort === 'string' ? query.sort : query.sort[0];
    pageQuery.sort = {
      property: sort.split(',')[0],
      direction: sort.split(',')[1] as 'asc' | 'desc',
      toString: function (this) {
        return this.property + ',' + this.direction;
      },
    };
  }

  return {
    pageQuery,
  };
}

function usePageLinks(pageQuery: PageQuery, pageMetadata: PageMetadata) {
  const { pathname } = useRouter();

  const newPageHref = (page: number) => {
    const query: any = { page };

    if (pageQuery.size !== undefined) {
      query.size = pageQuery.size;
    }

    if (pageQuery.sort !== undefined) {
      query.sort = pageQuery.sort.toString();
    }

    return {
      pathname,
      query,
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
