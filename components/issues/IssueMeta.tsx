import { Issue } from '../../api';

type IssueMetaProps = {
  issue: Issue;
};

export default function IssueMeta({ issue }: IssueMetaProps) {
  return (
    <p className='mt-2 text-sm text-gray-500'>
      #{issue.id} opened by{' '}
      <a href='/users/:id' className='font-medium text-gray-900'>
        Submitter Name
      </a>{' '}
      in{' '}
      <a href='/projects/:id' className='font-medium text-gray-900'>
        Project Name
      </a>
    </p>
  );
}
