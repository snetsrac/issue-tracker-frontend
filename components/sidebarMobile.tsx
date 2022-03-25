import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { Navigation, Projects } from './layout';

type SidebarMobileProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  navigation: Navigation;
  projects: Projects;
};

export default function SidebarMobile({
  isOpen,
  setIsOpen,
  navigation,
  projects,
}: SidebarMobileProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-40 flex lg:hidden'
        onClose={setIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='transition ease-in-out duration-300 transform'
          enterFrom='-translate-x-full'
          enterTo='translate-x-0'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='translate-x-0'
          leaveTo='-translate-x-full'
        >
          <div className='relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-in-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in-out duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='absolute top-0 right-0 -mr-12 pt-2'>
                <button
                  type='button'
                  className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                  onClick={() => setIsOpen(false)}
                >
                  <span className='sr-only'>Close sidebar</span>
                  <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                </button>
              </div>
            </Transition.Child>
            <div className='flex flex-shrink-0 items-center px-4'>
              <Image width={32} height={32} src='/logo.svg' alt='Logo' />
            </div>
            <div className='mt-5 h-0 flex-1 overflow-y-auto'>
              <nav className='px-2'>
                <div className='space-y-1'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={
                        (item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white') +
                        ' ' +
                        'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                      }
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className={
                          (item.current
                            ? 'text-gary-300'
                            : 'text-gray-400 group-hover:text-gray-300') +
                          ' ' +
                          'mr-4 h-6 w-6 flex-shrink-0'
                        }
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className='mt-10'>
                  <p className='px-2 text-xs font-semibold uppercase tracking-wider text-gray-400'>
                    Projects
                  </p>
                  <div className='mt-2 space-y-1'>
                    {projects.map((project) => (
                      <a
                        key={project.id}
                        href={project.href}
                        className='flex items-center rounded-md px-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                      >
                        <span className='truncate'>{project.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className='w-14 flex-shrink-0' aria-hidden='true'>
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition>
  );
}
