type TableColumn = {
  accessor: string;
  title: string;
  hideTitle?: boolean;
  bold?: boolean;
};

type TableData = {
  id: number | string;
  [accessor: string]: number | string | JSX.Element | null;
};

type TableProps = {
  title: string;
  description: string;
  columns: TableColumn[];
  data: TableData[];
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

export default function Table({
  title,
  description,
  columns,
  data,
}: TableProps) {
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>{title}</h1>
          <p className='mt-2 text-sm text-gray-700'>{description}</p>
        </div>
        <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
          <button
            type='button'
            className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
          >
            Button text
          </button>
        </div>
      </div>
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
                        {column.title}
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
    </div>
  );
}
