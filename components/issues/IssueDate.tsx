import { CalendarIcon } from '@heroicons/react/solid';
import { format, parseISO } from 'date-fns';
import Shimmer from '../shimmer';

type IssueDateProps = {
  date: string | undefined;
};

export default function IssueDate({ date }: IssueDateProps) {
  return date === undefined ? (
    <Shimmer className='w-40 text-sm' />
  ) : (
    <div className='flex items-center space-x-2'>
      <CalendarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
      <span className='text-sm font-medium text-gray-900'>
        Created on{' '}
        <time dateTime={date}>{format(parseISO(date), 'MMM d, yyyy')}</time>
      </span>
    </div>
  );
}
