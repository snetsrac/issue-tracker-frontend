import { useAuth0 } from '@auth0/auth0-react';
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import { PageQuery } from '../components/pagination/pagination';

type UseApiQueryParams<T> = {
  path: string;
  queryKey: string[];
  pageQuery?: PageQuery;
  audience?: string;
  scope?: string;
  fetchOptions?: RequestInit;
  queryOptions?: Omit<UseQueryOptions<T, Error, T>, 'queryKey' | 'queryFn'>;
};

type UseApiMutationParams<T, V> = {
  path: string;
  queryKey: string[];
  body?: any;
  pageQuery?: PageQuery;
  audience?: string;
  scope?: string;
  fetchOptions?: RequestInit;
  mutationOptions?: Omit<UseMutationOptions<T, Error, V>, 'mutationFn'>;
};

export function useApiQuery<T>({
  path,
  queryKey,
  pageQuery,
  audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
  scope,
  fetchOptions = {},
  queryOptions = {},
}: UseApiQueryParams<T>) {
  const { getAccessTokenSilently } = useAuth0();

  const params = pageQuery ? `?${pageQuery.toString()}` : '';

  const queryFn = async () => {
    const accessToken = await getAccessTokenSilently({ audience, scope });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}${params}`,
      {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return Promise.reject(new Error(String(response.status)));
    }

    return response.json() as Promise<T>;
  };

  return useQuery<T, Error, T, QueryKey>(queryKey, queryFn, queryOptions);
}

export function useApiMutation<T, V>({
  path,
  queryKey,
  body,
  pageQuery,
  audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
  scope,
  fetchOptions = {},
  mutationOptions = {},
}: UseApiMutationParams<T, V>) {
  const { getAccessTokenSilently } = useAuth0();

  const params = pageQuery ? `?${pageQuery.toString()}` : '';

  const queryFn = async () => {
    try {
      const accessToken = await getAccessTokenSilently({ audience, scope });

      const fetchInit = {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };

      if (body !== undefined) {
        fetchInit.body = body;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}${params}`,
        fetchInit
      );

      if (!response.ok) {
        return Promise.reject(new Error(String(response.status)));
      }

      return response
        .json()
        .then((data) => data)
        .catch(() => {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useMutation<T, Error, V>(queryKey, queryFn, mutationOptions);
}
