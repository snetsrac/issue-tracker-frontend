import { Issue } from '../../api/issues';
import Shimmer from '../shimmer';

type IssueMetaProps = {
  issue: Issue | undefined;
};

export default function IssueMeta({ issue }: IssueMetaProps) {
  if (issue === undefined) {
    return <Shimmer className='mt-2 w-48 text-sm' />;
  }

  const submitter = issue.submitter ? (
    <a
      href={`/users/${issue.submitter.username}`}
      className='font-medium text-gray-900 hover:text-gray-500'
    >
      {issue.submitter.name}
    </a>
  ) : (
    <div className='font-medium text-gray-900'>Unknown User</div>
  );

  return (
    <p className='mt-2 text-sm text-gray-500'>
      #{issue.id} opened by {submitter}
      {/* in{' '}
      <span className='font-medium text-gray-900 hover:cursor-pointer hover:text-gray-500'>
        Project Name
      </span> */}
    </p>
  );
}
