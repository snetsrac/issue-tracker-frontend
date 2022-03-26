import { ReactElement } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getIssues } from '../../api';
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
];

export default function Issues() {
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

  const issues = result.data._embedded.issueList.map((issue) => {
    return {
      id: issue.id,
      title: (
        <a href={`/issues/${issue.id}`} className='font-medium text-gray-900'>
          {issue.title}
        </a>
      ),
      description: issue.description,
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

Issues.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
