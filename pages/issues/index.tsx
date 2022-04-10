import Link from 'next/link';
import { ReactElement } from 'react';
import { useGetIssuesQuery } from '../../api';
import { IssuePriority } from '../../components/issues/issuePriority';
import { IssueStatus } from '../../components/issues/IssueStatus';
import Layout from '../../components/layout';
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

export default function IssuesPage() {
  const { pageQuery } = usePagination();

  const result = useGetIssuesQuery(pageQuery);

  if (result.isLoading) {
    return <span>Loading...</span>;
  }

  if (result.isError || result.data === undefined) {
    return (
      <span>
        Error:{' '}
        {result.error instanceof Error
          ? result.error.message
          : 'Unknown error.'}
      </span>
    );
  }

  const issues = result.data.content.map((issue) => {
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
          <Link href='/issues/new'>
            <a className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'>
              Create Issue
            </a>
          </Link>
        </div>
      </div>
      <Table columns={columns} data={issues} pageQuery={pageQuery} />
      <Pagination pageQuery={pageQuery} pageMetadata={result.data.page} />
    </div>
  );
}

IssuesPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
