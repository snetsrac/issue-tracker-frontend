import Link from 'next/link';
import { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { getIssues } from '../../api';
import { IssuePriority } from '../../components/issues/issuePriority';
import { IssueStatus } from '../../components/issues/IssueStatus';
import Layout from '../../components/layout';
import Table from '../../components/table';

const columns = [
  {
    accessor: 'title',
    title: 'Title',
  },
  {
    accessor: 'description',
    title: 'Description',
  },
  {
    accessor: 'status',
    title: 'Status',
  },
  {
    accessor: 'priority',
    title: 'Priority',
  },
];

export default function IssuesPage() {
  const result = useQuery(['issues'], () => getIssues());

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
          <a className='font-medium text-gray-900'>{issue.title}</a>
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
            A list of all the issues in the database (for now) including their
            title and description.
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
      <Table columns={columns} data={issues} />
    </div>
  );
}

IssuesPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
