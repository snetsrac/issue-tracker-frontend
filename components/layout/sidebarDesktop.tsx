import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import usePermissions from '../../api/usePermissions';
import { Navigation, Projects } from './layout';

type SidebarDesktopProps = {
  navigation: Navigation;
  projects: Projects;
  userPanel: ReactNode;
};

export default function SidebarDesktop({
  navigation,
  projects,
  userPanel,
}: SidebarDesktopProps) {
  const router = useRouter();
  const permissions = usePermissions();

  return (
    <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64'>
      <div className='flex min-h-0 flex-1 flex-col'>
        <div className='flex h-16 flex-shrink-0 items-center bg-gray-900 px-4'>
          <Image width={32} height={32} src='/logo.svg' alt='Logo' />
          <p className='ml-3 text-xl font-bold tracking-wider text-white'>
            Issue Tracker
          </p>
        </div>
        <div className='flex flex-1 flex-col overflow-y-auto bg-gray-800'>
          <nav className='flex-1 px-2 py-4'>
            <div className='space-y-1'>
              {navigation
                .filter(
                  (item) =>
                    item.authorization === undefined ||
                    permissions?.includes(item.authorization)
                )
                .map((item) => (
                  <Link href={item.href} key={item.href}>
                    <a
                      className={
                        (router.pathname === item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white') +
                        ' ' +
                        'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                      }
                      aria-current={
                        router.pathname === item.href ? 'page' : undefined
                      }
                    >
                      <item.icon
                        className={
                          (router.pathname === item.href
                            ? 'text-gray-300'
                            : 'text-gray-400 group-hover:text-gray-300') +
                          ' ' +
                          'mr-3 h-6 w-6 flex-shrink-0'
                        }
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
            </div>
            {projects && projects.length > 0 && (
              <div className='mt-10'>
                <p className='px-3 text-xs font-semibold uppercase tracking-wider text-gray-400'>
                  Projects
                </p>
                <div className='mt-2 space-y-1'>
                  {projects.map((project) => (
                    <Link href={project.href} key={project.id}>
                      <a className='group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>
                        <span className='truncate'>{project.name}</span>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </div>
        {userPanel}
      </div>
    </div>
  );
}
