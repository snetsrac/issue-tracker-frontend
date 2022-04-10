import {
  ArrowCircleRightIcon,
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  LockOpenIcon,
} from '@heroicons/react/solid';
import { Issue } from '../../api';

export function IssueStatus({ status }: { status: Issue['status'] }) {
  let content;

  switch (status) {
    case 'open':
      content = (
        <>
          <LockOpenIcon className='h-5 w-5 text-green-500' aria-hidden='true' />
          <span className='text-sm font-medium capitalize text-green-700'>
            {status}
          </span>
        </>
      );
      break;
    case 'in progress':
      content = (
        <>
          <ArrowCircleRightIcon
            className='h-5 w-5 text-orange-500'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-orange-700'>
            {status}
          </span>
        </>
      );
      break;
    case 'more info needed':
      content = (
        <>
          <InformationCircleIcon
            className='h-5 w-5 text-blue-500'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-blue-700'>
            {status}
          </span>
        </>
      );
      break;
    case 'resolved':
      content = (
        <>
          <CheckCircleIcon
            className='h-5 w-5 text-purple-500'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-purple-700'>
            {status}
          </span>
        </>
      );
      break;
    default:
      content = (
        <>
          <ExclamationIcon
            className='h-5 w-5 text-red-500'
            aria-hidden='true'
          />
          <span className='text-sm font-medium text-red-700'>
            Unknown Status
          </span>
        </>
      );
      break;
  }

  return (
    <div className='flex items-center space-x-2 md:whitespace-nowrap'>
      {content}
    </div>
  );
}
