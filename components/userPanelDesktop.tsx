import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import Link from 'next/link';

export default function UserPanelDesktop() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return (
      <div className='flex flex-shrink-0 bg-gray-800 p-4'>
        <div className='group block w-full flex-shrink-0'>
          <div className='flex items-center'>
            <div className='inline-block h-9 w-9 rounded-full bg-gray-400'></div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-white'>Loading...</p>
              <p className='text-xs font-medium text-gray-300 group-hover:text-gray-200'></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-shrink-0 bg-gray-800 p-4'>
        <div className='group block w-full flex-shrink-0'>
          <div className='flex items-center'>
            <div className='inline-block h-9 w-9 rounded-full bg-gray-400'></div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-white'>Error!</p>
              <p className='truncate text-xs font-medium text-gray-300 group-hover:text-gray-200'>
                {error.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <>
        <div className='flex flex-shrink-0 bg-gray-700 p-4'>
          <Link href={`/users/${user?.profile}`}>
            <a className='group block w-full flex-shrink-0'>
              <div className='flex items-center'>
                {user.picture ? (
                  <div>
                    <Image
                      className='inline-block rounded-full'
                      width={36}
                      height={36}
                      src={user.picture}
                      alt={user.name}
                    />
                  </div>
                ) : (
                  <div className='inline-block h-9 w-9 rounded-full bg-gray-400'></div>
                )}
                <div className='ml-3'>
                  <p className='text-sm font-medium text-white'>{user.name}</p>
                  <p className='truncate text-xs font-medium text-gray-300 group-hover:text-gray-200'>
                    View Profile
                  </p>
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className='flex flex-shrink-0 bg-gray-700 px-4 pb-4'>
          <button
            className='flex h-9 w-full items-center justify-center rounded-md bg-gray-200 hover:bg-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700'
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            <div className='text-sm font-medium text-gray-900'>Log Out</div>
          </button>
        </div>
      </>
    );
  }

  return (
    <div className='flex flex-shrink-0 bg-gray-800 p-4'>
      <button
        className='flex h-9 w-full items-center justify-center rounded-md bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
        onClick={loginWithRedirect}
      >
        <div className='text-sm font-medium text-white'>Log In</div>
      </button>
    </div>
  );
}
