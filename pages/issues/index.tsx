import { withAuthenticationRequired } from '@auth0/auth0-react';
import Link from 'next/link';
import { useGetIssuesQuery } from '../../api/issues';
import { LinkButton } from '../../components/button';
import { IssuePriority } from '../../components/issues/issuePriority';
import { IssueStatus } from '../../components/issues/IssueStatus';
import { withLayout } from '../../components/layout';
import Pagination, {
  usePagination,
} from '../../components/pagination/pagination';
import Table from '../../components/table';

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
  const { pageQuery } = usePagination();
  const { isLoading, isError, data, error } = useGetIssuesQuery(pageQuery);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || data === undefined) {
    return <span>Error: {error ? error.message : 'Unknown error.'}</span>;
  }

  const issues = data.content.map((issue) => {
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
          <LinkButton href='/issues/new'>Create Issue</LinkButton>
        </div>
      </div>
      <Table columns={columns} data={issues} pageQuery={pageQuery} />
      <Pagination pageQuery={pageQuery} pageMetadata={data.page} />
    </div>
  );
}

export default withAuthenticationRequired(withLayout(IssuesPage));
