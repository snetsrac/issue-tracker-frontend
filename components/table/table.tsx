import { PageQuery } from '../pagination/pagination';
import TableHeader from './tableHeader';
import TableRow, { TableRowShimmer } from './tableRow';

export type TableColumn = {
  accessor: string;
  title: string;
  hideTitle?: boolean;
  bold?: boolean;
  limitWidth?: boolean;
  sortable?: boolean;
};

export type TableData = {
  id: number | string;
  [accessor: string]: number | string | JSX.Element | null;
};

type TableProps = {
  columns: TableColumn[];
  data: TableData[] | undefined;
  pageQuery: PageQuery;
  isLoading?: boolean;
};

export function classNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function columnPadding(length: number, i: number) {
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

export default function Table({
  columns,
  data,
  pageQuery,
  isLoading,
}: TableProps) {
  return (
    <div className='mt-8 flex flex-col'>
      <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle'>
          <div className='overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5'>
            <table className='min-w-full divide-y divide-gray-300'>
              <TableHeader columns={columns} pageQuery={pageQuery} />
              <tbody className='divide-y divide-gray-200 bg-white'>
                {isLoading || data === undefined
                  ? Array.from(Array(20).keys()).map((i) => (
                      <TableRowShimmer key={i} columns={columns} />
                    ))
                  : data.map((row) => (
                      <TableRow key={row.id} row={row} columns={columns} />
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
