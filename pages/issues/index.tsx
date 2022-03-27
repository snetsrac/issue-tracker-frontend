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
    <Table
      title='Issues'
      description='A list of all the issues in the database (for now) including their title and description'
      columns={columns}
      data={issues}
    />
  );
}

IssuesPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
