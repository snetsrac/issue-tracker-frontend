import { Issue } from '../../api/issues';
import { IssuePriority } from './issuePriority';
import { IssueStatus } from './IssueStatus';
import IssueDate from './IssueDate';
import IssueAssignees from './IssueAssignees';

type IssueAsideProps = {
  className: string;
  issue: Issue | undefined;
};

export function IssueAside({ className, issue }: IssueAsideProps) {
  return (
    <aside className={className}>
      <h2 className='sr-only'>Details</h2>
      <div className='space-y-5'>
        <IssueStatus status={issue?.status} />
        <IssuePriority priority={issue?.priority} />
        {/* <div className='flex items-center space-x-2'>
          <ChatAltIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          <span className='text-sm font-medium text-gray-900'>4 comments</span>
        </div> */}
        <IssueDate date={issue?.createdAt} />
      </div>
      <div className='mt-6 space-y-8 border-t border-gray-200 py-6'>
        <IssueAssignees assignees={issue?.assignees} />
        {/* <div>
          <h2 className='text-sm font-medium text-gray-500'>Tags</h2>
          <ul role='list' className='mt-3 leading-8'>
            <li className='inline'>
              <div className='relative ml-6 inline-flex items-center'>
                <div className='text-sm italic text-gray-400'>No tags</div>
              </div>{' '}
            </li>
            <li className='inline'>
              <a
                href='#'
                className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'
              >
                <div className='absolute flex flex-shrink-0 items-center justify-center'>
                  <span
                    className='h-1.5 w-1.5 rounded-full bg-rose-500'
                    aria-hidden='true'
                  />
                </div>
                <div className='ml-3.5 text-sm font-medium text-gray-900'>
                  Bug
                </div>
              </a>{' '}
            </li>
            <li className='inline'>
              <a
                href='#'
                className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'
              >
                <div className='absolute flex flex-shrink-0 items-center justify-center'>
                  <span
                    className='h-1.5 w-1.5 rounded-full bg-indigo-500'
                    aria-hidden='true'
                  />
                </div>
                <div className='ml-3.5 text-sm font-medium text-gray-900'>
                  Accessibility
                </div>
              </a>{' '}
            </li>
          </ul>
        </div> */}
      </div>
    </aside>
  );
}
