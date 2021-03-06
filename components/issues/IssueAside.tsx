import { Issue, useDeleteIssueMutation } from '../../api/issues';
import { IssuePriority } from './IssuePriority';
import { IssueStatus } from './IssueStatus';
import IssueDate from './IssueDate';
import IssueAssignees from './IssueAssignees';
import usePermissions, { Permissions } from '../../api/usePermissions';
import ModalAlert from '../ui/modalAlert';
import { useState } from 'react';
import { useRouter } from 'next/router';

type IssueAsideProps = {
  className: string;
  issue: Issue | undefined;
};

export function IssueAside({ className, issue }: IssueAsideProps) {
  const router = useRouter();
  const id = router.query.id as string;

  const permissions = usePermissions();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const deleteIssue = useDeleteIssueMutation(id);

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
        <IssueAssignees id={id} issue={issue} />
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
      {permissions?.includes(Permissions.DELETE_ISSUES) && (
        <div className='space-y-8 border-t border-gray-200 py-6'>
          <button
            className='w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
            onClick={() => setDeleteModalIsOpen(true)}
          >
            Delete issue
          </button>
          <ModalAlert
            isOpen={deleteModalIsOpen}
            setIsOpen={setDeleteModalIsOpen}
            title='Delete issue'
            text='Are you sure you want to delete this issue? This action cannot be undone.'
            primaryButtonText='Delete'
            primaryButtonAction={() => {
              deleteIssue.mutate();
              router.push('/issues');
            }}
          />
        </div>
      )}
    </aside>
  );
}
