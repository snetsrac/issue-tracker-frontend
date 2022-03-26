import { ReactElement } from 'react';
import Layout from '../../components/layout';
import Table from '../../components/table';

const columns = [
  {
    accessor: 'title',
    title: 'Title',
    bold: true,
  },
  {
    accessor: 'description',
    title: 'Description',
  },
];

const issues = [
  {
    id: 1,
    title: 'First Issue',
    description: 'This is the first issue.',
  },
  {
    id: 2,
    title: 'Second Issue',
    description: 'This is the second issue.',
  },
  {
    id: 3,
    title: 'Third Issue',
    description: 'This is the third issue.',
  },
  {
    id: 4,
    title: 'Fourth Issue',
    description: 'This is the fourth issue.',
  },
  {
    id: 5,
    title: 'Fifth Issue',
    description:
      'This is the fifth issue. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description. It has a very long description.',
  },
];

export default function Issues() {
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
