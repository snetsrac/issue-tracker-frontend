import { useApiQuery } from './useApi';

export type User = {
  id: string;
  email: string;
  name: string;
  username: string;
  picture: string;
};

export function useGetUserByIdQuery(
  id: string,
  enabled?: boolean,
  runOnce?: boolean
) {
  return useApiQuery<User>({
    path: `/users/byId/${id}`,
    queryKey: ['users', 'byId', id],
    queryOptions: { enabled, staleTime: runOnce ? Infinity : undefined },
  });
}

export function useGetUserByUsernameQuery(username: string, runOnce?: boolean) {
  return useApiQuery<User>({
    path: `/users/byUsername/${username}`,
    queryKey: ['users', 'byUsername', username],
    queryOptions: { staleTime: runOnce ? Infinity : undefined },
  });
}
