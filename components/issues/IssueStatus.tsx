import {
  ArrowCircleRightIcon,
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  LockOpenIcon,
} from '@heroicons/react/solid';
import { Issue } from '../../api';

export function IssueStatus({ status }: { status: Issue['status'] }) {
  const text = status.toLowerCase().replaceAll('_', ' ');
  let content;

  switch (status) {
    case 'OPEN':
      content = (
        <>
          <LockOpenIcon className='h-5 w-5 text-green-500' aria-hidden='true' />
          <span className='text-sm font-medium capitalize text-green-700'>
            {text}
          </span>
        </>
      );
      break;
    case 'IN_PROGRESS':
      content = (
        <>
          <ArrowCircleRightIcon
            className='h-5 w-5 text-orange-500'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-orange-700'>
            {text}
          </span>
        </>
      );
      break;
    case 'MORE_INFO_NEEDED':
      content = (
        <>
          <InformationCircleIcon
            className='h-5 w-5 text-blue-500'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-blue-700'>
            {text}
          </span>
        </>
      );
      break;
    case 'RESOLVED':
      content = (
        <>
          <CheckCircleIcon
            className='h-5 w-5 text-purple-500'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-purple-700'>
            {text}
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

  return <div className='flex items-center space-x-2'>{content}</div>;
}
