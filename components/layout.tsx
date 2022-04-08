import {
  FolderIcon,
  HomeIcon,
  UsersIcon,
  ViewListIcon,
} from '@heroicons/react/outline';
import Head from 'next/head';
import { ReactNode, useState } from 'react';
import Searchbar from './searchbar';
import SidebarDesktop from './sidebarDesktop';
import SidebarMobile from './sidebarMobile';

type LayoutProps = {
  children: ReactNode;
};

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/issues', current: true },
  // { name: 'Team', icon: UsersIcon, href: '/team', count: 3, current: false },
  // {
  //   name: 'Projects',
  //   icon: FolderIcon,
  //   href: '/projects',
  //   count: 4,
  //   current: false,
  // },
  // { name: 'My Issues', icon: ViewListIcon, href: '/issues', current: false },
];

export type Navigation = typeof navigation;

const projects: { id: number; name: string; href: string }[] = [
  // { id: 1, name: 'GraphQL API', href: '/projects/1' },
  // { id: 2, name: 'iOS App', href: '/projects/2' },
  // { id: 3, name: 'Marketing Site Redesign', href: '/projects/3' },
  // { id: 4, name: 'Customer Portal', href: '/projects/4' },
];

export type Projects = typeof projects;

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Issue Tracker</title>
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      </Head>
      <div className='flex min-h-full'>
        <SidebarMobile
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          navigation={navigation}
          projects={projects}
        />
        <SidebarDesktop navigation={navigation} projects={projects} />
        <div className='flex w-0 flex-1 flex-col lg:pl-64'>
          <Searchbar setIsSidebarOpen={setIsSidebarOpen} />
          <main className='flex-1'>
            <div className='py-8 xl:py-10'>{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
