import { useRouter } from 'next/router';
import { FormEvent, ReactNode } from 'react';

type FormProps = {
  title: string;
  description: ReactNode;
  onSubmit: () => void;
  disabled?: boolean;
  children: ReactNode;
  columns?: number;
};

export default function Form({
  title,
  description,
  onSubmit,
  disabled,
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
          <div className='flex justify-end'>
            <button
              type='button'
              className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 '
              onClick={router.back}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-500 '
            >
              Save
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
