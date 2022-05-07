import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { PageQuery } from '../pagination/pagination';
import { classNames, columnPadding, TableColumn } from './table';

type TableHeaderProps = {
  columns: TableColumn[];
  pageQuery: PageQuery;
};

export default function TableHeader({ columns, pageQuery }: TableHeaderProps) {
  return (
    <thead className='bg-gray-50'>
      <tr>
        {columns.map((column, i) => (
          <th
            key={column.accessor}
            scope='col'
            className={classNames(
              'py-3.5 text-left text-sm font-semibold text-gray-900',
              columnPadding(columns.length, i)
            )}
          >
            {column.sortable ? (
              <Link href={pageQuery.toggleSort(column.accessor)}>
                <a className='group inline-flex'>
                  {column.title}
                  {pageQuery.sort?.property === column.accessor &&
                  pageQuery.sort.direction === 'asc' ? (
                    <span className='ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300'>
                      <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
                    </span>
                  ) : pageQuery.sort?.property === column.accessor &&
                    pageQuery.sort.direction === 'desc' ? (
                    <span className='ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300'>
                      <ChevronUpIcon className='h-5 w-5' aria-hidden='true' />
                    </span>
                  ) : (
                    <span className='invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible'>
                      <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
                    </span>
                  )}
                </a>
              </Link>
            ) : (
              column.title
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}
