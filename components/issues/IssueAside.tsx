import { CalendarIcon, ChatAltIcon } from '@heroicons/react/solid';
import { Issue } from '../../api/issues';
import { IssuePriority } from './issuePriority';
import { IssueStatus } from './IssueStatus';

type IssueAsideProps = {
  className: string;
  status: Issue['status'];
  priority: Issue['priority'];
};

export function IssueAside({ className, status, priority }: IssueAsideProps) {
  return (
    <aside className={className}>
      <h2 className='sr-only'>Details</h2>
      <div className='space-y-5'>
        <IssueStatus status={status} />
        <IssuePriority priority={priority} />
        <div className='flex items-center space-x-2'>
          <ChatAltIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          <span className='text-sm font-medium text-gray-900'>4 comments</span>
        </div>
        <div className='flex items-center space-x-2'>
          <CalendarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          <span className='text-sm font-medium text-gray-900'>
            Created on <time dateTime='2020-12-02'>Dec 2, 2020</time>
          </span>
        </div>
      </div>
      <div className='mt-6 space-y-8 border-t border-gray-200 py-6'>
        <div>
          <h2 className='text-sm font-medium text-gray-500'>Assignees</h2>
          <ul role='list' className='mt-3 space-y-3'>
            <li className='flex justify-start'>
              <a href='#' className='flex items-center space-x-3'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-5 w-5 rounded-full'
                    src='https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                    alt=''
                  />
                </div>
                <div className='text-sm font-medium text-gray-900'>
                  Eduardo Benz
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className='text-sm font-medium text-gray-500'>Tags</h2>
          <ul role='list' className='mt-2 leading-8'>
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
        </div>
      </div>
    </aside>
  );
}
