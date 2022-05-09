import { withAuthenticationRequired } from '@auth0/auth0-react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useGetIssuesQuery } from '../../api/issues';
import usePermissions, { Permissions } from '../../api/usePermissions';
import { IssuePriority } from '../../components/issues/IssuePriority';
import { IssueStatus } from '../../components/issues/IssueStatus';
import { withLayout } from '../../components/layout/layout';
import Pagination, {
  usePagination,
} from '../../components/pagination/pagination';
import Table from '../../components/table/table';
import { LinkButton } from '../../components/ui/button';
import Spinner from '../../components/ui/spinner';

const columns = [
  {
    accessor: 'id',
    title: '#',
    bold: true,
    limitWidth: true,
    sortable: true,
  },
  {
    accessor: 'title',
    title: 'Title',
    bold: true,
    sortable: true,
  },
  {
    accessor: 'description',
    title: 'Description',
    sortable: true,
  },
  {
    accessor: 'status',
    title: 'Status',
    limitWidth: true,
    sortable: true,
  },
  {
    accessor: 'priority',
    title: 'Priority',
    limitWidth: true,
    sortable: true,
  },
];

function IssuesPage() {
  const permissions = usePermissions();
  const { pageQuery } = usePagination();
  const { isLoading, data, error } = useGetIssuesQuery(pageQuery);

  const issues = data?.content.map((issue) => {
    return {
      id: issue.id,
      title: (
        <Link href={`/issues/${issue.id}`}>
          <a>{issue.title}</a>
        </Link>
      ),
      description: issue.description,
      status: <IssueStatus status={issue.status} />,
      priority: <IssuePriority priority={issue.priority} />,
    };
  });

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>Issues</h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the issues in the database.
          </p>
        </div>
        <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
          {permissions?.includes(Permissions.SUBMIT_ISSUES) && (
            <LinkButton href='/issues/new'>Create Issue</LinkButton>
          )}
        </div>
      </div>
      <Table
        columns={columns}
        data={issues}
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

export default withAuthenticationRequired(withLayout(IssuesPage));
