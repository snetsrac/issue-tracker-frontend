import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { PageQuery } from './pagination/pagination';

type TableColumn = {
  accessor: string;
  title: string;
  hideTitle?: boolean;
  bold?: boolean;
  sortable?: boolean;
};

type TableData = {
  id: number | string;
  [accessor: string]: number | string | JSX.Element | null;
};

type TableProps = {
  columns: TableColumn[];
  data: TableData[];
  pageQuery: PageQuery;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function columnPadding(length: number, i: number) {
  let padding;

  if (i === 0) {
    padding = 'pl-4 pr-3 sm:pl-6 lg:pl-8';
  } else if (i === length - 1) {
    padding = 'pl-3 pr-4 sm:pr-6 lg:pr-8';
  } else {
    padding = 'px-3';
  }

  return padding;
}

export default function Table({ columns, data, pageQuery }: TableProps) {
  return (
    <div className='mt-8 flex flex-col'>
      <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle'>
          <div className='overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5'>
            <table className='min-w-full divide-y divide-gray-300'>
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
                                <ChevronDownIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : pageQuery.sort?.property === column.accessor &&
                              pageQuery.sort.direction === 'desc' ? (
                              <span className='ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300'>
                                <ChevronUpIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : (
                              <span className='invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible'>
                                <ChevronDownIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
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
              <tbody className='divide-y divide-gray-200 bg-white'>
                {data.map((row) => (
                  <tr key={row.id} className='hover:bg-gray-200'>
                    {columns.map((column, i) => (
                      <td
                        key={column.accessor}
                        className={classNames(
                          'max-w-0 truncate py-4 text-sm text-gray-500',
                          columnPadding(columns.length, i)
                        )}
                      >
                        {row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
