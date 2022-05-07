import Shimmer from '../ui/shimmer';
import { classNames, columnPadding, TableColumn, TableData } from './table';

type TableRowProps = {
  row: TableData;
  columns: TableColumn[];
};

export default function TableRow({ row, columns }: TableRowProps) {
  return (
    <tr className='hover:bg-gray-200'>
      {columns.map((column, i) => (
        <td
          key={column.accessor}
          className={classNames(
            column.limitWidth ? 'w-0' : 'max-w-0 truncate',
            'py-4 text-sm',
            column.bold ? 'font-medium text-gray-900' : 'text-gray-500',
            columnPadding(columns.length, i)
          )}
        >
          {row[column.accessor]}
        </td>
      ))}
    </tr>
  );
}

export function TableRowShimmer({ columns }: Omit<TableRowProps, 'row'>) {
  return (
    <tr className='hover:bg-gray-200'>
      {columns.map((column, i) => (
        <td
          key={column.accessor}
          className={classNames(
            column.limitWidth ? 'w-0' : 'max-w-0 truncate',
            'py-4',
            columnPadding(columns.length, i)
          )}
        >
          <Shimmer className='w-full' />
        </td>
      ))}
    </tr>
  );
}
