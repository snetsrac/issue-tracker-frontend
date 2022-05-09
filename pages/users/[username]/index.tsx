import { withAuthenticationRequired } from '@auth0/auth0-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetUserByUsernameQuery } from '../../../api/users';
import { withLayout } from '../../../components/layout/layout';
import Shimmer from '../../../components/ui/shimmer';

function UserPage() {
  const router = useRouter();
  const username = router.query.username as string;

  const result = useGetUserByUsernameQuery(username);

  if (result.isError) {
    return (
      <span>
        Error:{' '}
        {result.error instanceof Error
          ? result.error.message
          : 'Unknown error.'}
      </span>
    );
  }

  const user = result.data;

  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
      {/* Profile header */}
      <div>
        <div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <div className='mt-16 sm:flex sm:items-end sm:space-x-5'>
            <div className='flex'>
              {user === undefined ? (
                <Shimmer className='h-24 w-24 rounded-full' />
              ) : (
                <Image
                  className='rounded-full ring-4 ring-white sm:h-32 sm:w-32'
                  src={user.picture}
                  width={96}
                  height={96}
                  alt={user.name}
                />
              )}
            </div>
            <div className='mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
              <div className='mt-6 min-w-0 flex-1 sm:hidden lg:block'>
                {user === undefined ? (
                  <Shimmer className='w-48 text-2xl' />
                ) : (
                  <h1 className='truncate text-2xl font-bold text-gray-900'>
                    {user.name}
                  </h1>
                )}
              </div>
            </div>
          </div>
          <div className='mt-6 hidden min-w-0 flex-1 sm:block lg:hidden'>
            {user === undefined ? (
              <Shimmer className='w-48 text-2xl' />
            ) : (
              <h1 className='truncate text-2xl font-bold text-gray-900'>
                {user.name}
              </h1>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='mt-6'>
        <div className='border-b border-gray-200'></div>
      </div>

      {/* Description list */}
      <div className='mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
          <div className='sm:col-span-1'>
            <div className='text-sm font-medium text-gray-500'>Username</div>
            {user === undefined ? (
              <Shimmer className='w-36' />
            ) : (
              <div className='mt-1 text-sm text-gray-900'>{user.username}</div>
            )}
          </div>
          <div className='sm:col-span-1'>
            <div className='text-sm font-medium text-gray-500'>Email</div>
            {user === undefined ? (
              <Shimmer className='w-72' />
            ) : (
              <div className='mt-1 text-sm text-gray-900'>{user.email}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticationRequired(withLayout(UserPage));
