import { useApiQuery } from './useApi';

export type User = {
  id: string;
  email: string;
  name: string;
  username: string;
  picture: string;
};

export function useGetUserByIdQuery(id: string, enabled: boolean = true) {
  return useApiQuery<User>({
    path: `/users/byId/${id}`,
    queryKey: ['users', 'byId', id],
    queryOptions: { enabled },
  });
}

export function useGetUserByUsernameQuery(username: string) {
  return useApiQuery<User>({
    path: `/users/byUsername/${username}`,
    queryKey: ['users', 'byUsername', username],
  });
}