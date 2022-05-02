import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { FormEvent, ReactNode } from 'react';
import { Button, SubmitButton } from '../button';
import Spinner from '../spinner';

type FormProps = {
  title: string;
  description: ReactNode;
  onSubmit: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  error?: Error | null;
  children: ReactNode;
  columns?: number;
};

export default function Form({
  title,
  description,
  onSubmit,
  disabled,
  isLoading,
  error,
  children,
  columns = 6,
}: FormProps) {
  const router = useRouter();

  return (
    <form
      className='space-y-8 divide-y divide-gray-200'
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <fieldset disabled={disabled}>
        <div className='pt-8'>
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              {title}
            </h3>
            {typeof description === 'string' ? (
              <p className='mt-1 text-sm text-gray-500'>{description}</p>
            ) : (
              description
            )}
          </div>
          <div
            className={`mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-${columns}`}
          >
            {children}
          </div>
        </div>
        <div className='pt-5'>
          <div className='flex justify-end space-x-3'>
            {isLoading ? (
              <div className='mr-auto flex items-center space-x-2'>
                <Spinner />
                <div className='text-sm'>Submitting...</div>
              </div>
            ) : (
              error && (
                <div className='mr-auto flex items-center space-x-2 text-red-700'>
                  <ExclamationCircleIcon className='h-6 w-6' />
                  <span className='text-sm'>Error: {error.message}</span>
                </div>
              )
            )}
            <Button type='white' onClick={router.back}>
              Cancel
            </Button>
            <SubmitButton>Save</SubmitButton>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
