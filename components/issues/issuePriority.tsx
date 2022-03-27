import { ExclamationCircleIcon, ExclamationIcon } from '@heroicons/react/solid';
import { Issue } from '../../api';

export function IssuePriority({ priority }: { priority: Issue['priority'] }) {
  const text = priority.toLowerCase();
  let content;

  switch (priority) {
    case 'HIGH':
      content = (
        <>
          <ExclamationCircleIcon
            className='h-5 w-5 text-red-500'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-red-700'>
            {text} Priority
          </span>
        </>
      );
      break;
    case 'MEDIUM':
      content = (
        <>
          <ExclamationCircleIcon
            className='h-5 w-5 text-green-500'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-green-700'>
            {text} Priority
          </span>
        </>
      );
      break;
    case 'LOW':
      content = (
        <>
          <ExclamationCircleIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-gray-900'>
            {text} Priority
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
            Unknown Priority
          </span>
        </>
      );
      break;
  }

  return <div className='flex items-center space-x-2'>{content}</div>;
}
