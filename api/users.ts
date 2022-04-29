import { PageQuery } from '../components/pagination/pagination';
import { useApiQuery } from './useApi';

export type User = {
  id: string;
  email: string;
  name: string;
  username: string;
  picture: string;
};

export function useGetAuthUserQuery() {
  return useApiQuery<User>({
    path: '/user',
    queryKey: ['user'],
  });
}
export function useGetUserQuery(pageQuery: PageQuery) {
  return useApiQuery<User>({
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
