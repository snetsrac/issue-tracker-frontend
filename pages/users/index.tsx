import { withAuthenticationRequired } from '@auth0/auth0-react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useGetUsersQuery } from '../../api/users';
import { withLayout } from '../../components/layout/layout';
import Pagination, {
  usePagination,
} from '../../components/pagination/pagination';
import Table from '../../components/table/table';
import Spinner from '../../components/ui/spinner';

const columns = [
  {
    accessor: 'name',
    title: 'Name',
    bold: true,
    sortable: true,
  },
  {
    accessor: 'username',
    title: 'Username',
  },
  {
    accessor: 'email',
    title: 'Email',
    sortable: true,
  },
];

function UsersPage() {
  const { pageQuery } = usePagination();
  const { isLoading, data, error } = useGetUsersQuery(pageQuery);

  const users = data?.content.map((user) => {
    return {
      id: user.id,
      name: (
        <Link href={`/users/${user.username}`}>
          <a>{user.name}</a>
        </Link>
      ),
      username: user.username,
      email: user.email,
    };
  });

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>Users</h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all registered users.
          </p>
        </div>
      </div>
      <Table
        columns={columns}
        data={users}
        pageQuery={pageQuery}
        isLoading={isLoading}
      />
      {isLoading ? (
        <div className='sticky bottom-0 -mx-4 -mb-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:-mb-10'>
          <div className='flex items-center space-x-2 px-4 py-2'>
            <Spinner />
            <div className='text-sm'>Loading...</div>
          </div>
        </div>
      ) : error || data === undefined ? (
        <div className='sticky bottom-0 -mx-4 -mb-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:-mb-10'>
          <div className='mr-auto flex items-center space-x-2 px-4 py-2 text-red-700'>
            <ExclamationCircleIcon className='h-6 w-6' />
            <span className='text-sm'>Error: {error?.message}</span>
          </div>
        </div>
      ) : (
        <Pagination pageQuery={pageQuery} pageMetadata={data.page} />
      )}
    </div>
  );
}

export default withAuthenticationRequired(withLayout(UsersPage));
