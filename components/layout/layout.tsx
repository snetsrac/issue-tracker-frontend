import { HomeIcon, UsersIcon, ViewListIcon } from '@heroicons/react/outline';
import { ComponentType, ReactNode, useState } from 'react';
import AppHead from './appHead';
import Searchbar from './searchbar';
import SidebarDesktop from './sidebarDesktop';
import SidebarMobile from './sidebarMobile';
import UserPanel from './userPanel';

type LayoutProps = {
  children: ReactNode;
};

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  // {
  //   name: 'Projects',
  //   icon: FolderIcon,
  //   href: '/projects',
  //   count: 4,
  // },
  {
    name: 'Issues',
    icon: ViewListIcon,
    href: '/issues',
    authorization: 'read:issues',
  },
  {
    name: 'Users',
    icon: UsersIcon,
    href: '/users',
    authorization: 'read:users',
  },
];

export type Navigation = typeof navigation;

const projects: { id: number; name: string; href: string }[] = [
  // { id: 1, name: 'GraphQL API', href: '/projects/1' },
  // { id: 2, name: 'iOS App', href: '/projects/2' },
  // { id: 3, name: 'Marketing Site Redesign', href: '/projects/3' },
  // { id: 4, name: 'Customer Portal', href: '/projects/4' },
];

export type Projects = typeof projects;

function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userPanel = <UserPanel />;

  return (
    <>
      <div className='flex min-h-full'>
        <SidebarMobile
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          navigation={navigation}
          projects={projects}
          userPanel={userPanel}
        />
        <SidebarDesktop
          navigation={navigation}
          projects={projects}
          userPanel={userPanel}
        />
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

export function withLayout(PageComponent: any): ComponentType<object> {
  const PageWithLayout = () => (
    <Layout>
      <AppHead />
      <PageComponent />
    </Layout>
  );

  return PageWithLayout;
}
