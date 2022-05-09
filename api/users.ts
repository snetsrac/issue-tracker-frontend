import { PageMetadata, PageQuery } from '../components/pagination/pagination';
import { useApiQuery } from './useApi';

export type User = {
  id: string;
  email: string;
  name: string;
  username: string;
  picture: string;
};

export type Users = {
  content: User[];
  page: PageMetadata;
};

export function useGetAuthUserQuery(enabled: boolean) {
  return useApiQuery<User>({
    path: '/user',
    queryKey: ['user'],
    queryOptions: { enabled },
  });
}

export function useGetAllUserSummariesQuery() {
  return useApiQuery<Users>({
    path: '/users?summary=true',
    queryKey: ['users', 'summary'],
  });
}

export function useGetUsersQuery(pageQuery: PageQuery) {
  return useApiQuery<Users>({
    path: '/users',
    queryKey: ['users', pageQuery.toString()],
    pageQuery,
    queryOptions: { keepPreviousData: true },
  });
}

export function useGetUserByUsernameQuery(username: string) {
  return useApiQuery<User>({
    path: `/users/${username}`,
    queryKey: ['users', username],
  });
}
