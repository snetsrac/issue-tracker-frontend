import { useAuth0, User } from '@auth0/auth0-react';
import Link from 'next/link';
import { useGetAuthUserQuery } from '../api/users';
import { Avatar } from './avatars';

export default function UserPanel() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user: userToken,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const result = useGetAuthUserQuery(isAuthenticated);

  const LoadingOrError = ({ state }: { state: 'loading' | 'error' }) => {
    return (
      <div className='flex flex-shrink-0 bg-gray-700 p-4'>
        <div className='block w-full flex-shrink-0'>
          <div className='flex items-center'>
            <div className='inline-block h-10 w-10 rounded-full bg-gray-400 lg:h-9 lg:w-9'></div>
            <div className='ml-3'>
              <p className='text-base font-medium text-white lg:text-sm'>
                {state === 'loading' ? 'Loading...' : 'Error!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoggedIn = ({ userToken }: { userToken: User }) => {
    const content = (
      <div className='flex items-center'>
        <Avatar
          src={userToken.picture}
          height={36}
          alt={userToken.name || ''}
        />
        <div className='ml-3'>
          <p className='text-base font-medium text-white lg:text-sm'>
            {userToken.name}
          </p>
          {result.isSuccess && (
            <p className='truncate text-sm font-medium text-gray-300 group-hover:text-white lg:text-xs'>
              View Profile
            </p>
          )}
        </div>
      </div>
    );

    return (
      <>
        <div className='flex flex-shrink-0 bg-gray-700 p-4'>
          {result.isSuccess ? (
            <Link href={`/users/${result.data.username}`}>
              <a className='group block w-full flex-shrink-0'>{content}</a>
            </Link>
          ) : (
            <div className='block w-full flex-shrink-0'>{content}</div>
          )}
        </div>
        <div className='flex flex-shrink-0 bg-gray-700 px-4 pb-4'>
          <button
            className='flex h-10 w-full items-center justify-center rounded-md bg-gray-200 hover:bg-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700 lg:h-9'
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            <div className='text-base font-medium text-gray-900 lg:text-sm'>
              Log Out
            </div>
          </button>
        </div>
      </>
    );
  };

  const LoggedOut = () => {
    return (
      <div className='flex flex-shrink-0 bg-gray-800 p-4'>
        <button
          className='flex h-9 w-full items-center justify-center rounded-md bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
          onClick={loginWithRedirect}
        >
          <div className='text-base font-medium text-white lg:text-sm'>
            Log In
          </div>
        </button>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingOrError state='loading' />;
  } else if (error) {
    return <LoadingOrError state='error' />;
  } else if (isAuthenticated && userToken) {
    return <LoggedIn userToken={userToken} />;
  } else {
    return <LoggedOut />;
  }
}
