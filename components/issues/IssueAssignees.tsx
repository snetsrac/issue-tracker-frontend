import Link from 'next/link';
import { User } from '../../api/users';
import { Avatar } from '../avatars';
import Shimmer from '../shimmer';

type IssueAssigneesProps = {
  assignees: User[] | undefined;
};

export default function IssueAssignees({ assignees }: IssueAssigneesProps) {
  return (
    <div>
      <h2 className='text-sm font-medium text-gray-500'>Assignees</h2>
      {assignees === undefined ? (
        <>
          <Shimmer className='mt-3 h-9 w-40 text-sm' />
          <Shimmer className='mt-3 h-9 w-40 text-sm' />
          <Shimmer className='mt-3 h-9 w-40 text-sm' />
        </>
      ) : assignees.length === 0 ? (
        <div className='mt-3 ml-6 flex h-9 items-center text-sm italic text-gray-400'>
          No assignees
        </div>
      ) : (
        assignees.map((assignee) => (
          <Link key={assignee.username} href={`/users/${assignee.username}`}>
            <a className='group mt-3 flex items-center space-x-3'>
              <Avatar src={assignee.picture} height={36} alt={assignee.name} />
              <span className='text-sm font-medium text-gray-900 group-hover:text-gray-500'>
                {assignee.name}
              </span>
            </a>
          </Link>
        ))
      )}
    </div>
  );
}
