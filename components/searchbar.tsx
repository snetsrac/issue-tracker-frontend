import { MenuAlt2Icon, SearchIcon } from '@heroicons/react/outline';
import { Dispatch, SetStateAction } from 'react';

type SearchbarProps = {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Searchbar({ setIsSidebarOpen }: SearchbarProps) {
  return (
    <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white'>
      <button
        type='button'
        className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:hidden'
        onClick={() => setIsSidebarOpen(true)}
      >
        <span className='sr-only'>Open sidebar</span>
        <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
      </button>
      <div className='flex flex-1 justify-between px-4'>
        <div className='flex flex-1'>
          <form className='flex w-full lg:ml-0' action='#' method='GET'>
            <label htmlFor='search-field' className='sr-only'>
              Search
            </label>
            <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center'>
                <SearchIcon className='h-5 w-5' aria-hidden='true' />
              </div>
              <input
                className='block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm'
                placeholder='Search'
                type='search'
                name='search'
              />
            </div>
          </form>
        </div>
        <div className='ml-4 flex items-center lg:ml-6'>
          <button
            type='button'
            className='inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
