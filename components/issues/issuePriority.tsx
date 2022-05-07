import { ExclamationCircleIcon, ExclamationIcon } from '@heroicons/react/solid';
import { Issue } from '../../api/issues';
import Shimmer from '../ui/shimmer';

type IssuePriorityProps = {
  priority: Issue['priority'] | undefined;
};

export function IssuePriority({ priority }: IssuePriorityProps) {
  let content;

  switch (priority) {
    case undefined:
      content = <Shimmer className='w-40 text-sm' />;
      break;
    case 'high':
      content = (
        <>
          <ExclamationCircleIcon
            className='h-5 w-5 text-red-500'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-red-700'>
            {priority} Priority
          </span>
        </>
      );
      break;
    case 'medium':
      content = (
        <>
          <ExclamationCircleIcon
            className='h-5 w-5 text-green-500'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-green-700'>
            {priority} Priority
          </span>
        </>
      );
      break;
    case 'low':
      content = (
        <>
          <ExclamationCircleIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
          <span className='text-sm font-medium capitalize text-gray-900'>
            {priority} Priority
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

  return (
    <div className='flex items-center space-x-2 md:whitespace-nowrap'>
      {content}
    </div>
  );
}
