import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    router.push('/issues');
  }

  return (
    <div className='flex min-h-screen flex-col justify-around bg-white'>
      <div className='mx-auto max-w-7xl px-4 pb-2 text-center sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-6xl font-bold'>
            Welcome to <span className='text-indigo-600'>Issue Tracker!</span>
          </h1>

          <p className='mt-3 text-2xl'>Log in to get started</p>
        </div>
        <div className='mt-8 flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3'>
          <button
            className='w-56 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700'
            onClick={() => loginWithRedirect()}
          >
            Log in
          </button>
          <a
            href='https://github.com/snetsrac/issue-tracker-frontend'
            className='w-56 items-center justify-center rounded-md border border-transparent bg-indigo-100 px-5 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200'
          >
            View the source code
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
