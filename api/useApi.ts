import { useAuth0 } from '@auth0/auth0-react';
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import { PageQuery } from '../components/pagination/pagination';

type UseApiQueryParams<TResponse> = {
  path: string;
  queryKey: string[];
  pageQuery?: PageQuery;
  audience?: string;
  scope?: string;
  fetchOptions?: RequestInit;
  queryOptions?: Omit<
    UseQueryOptions<TResponse, Error, TResponse>,
    'queryKey' | 'queryFn'
  >;
};

type UseApiMutationParams<TVariables, TResponse> = {
  path: string;
  queryKey: string[];
  pageQuery?: PageQuery;
  audience?: string;
  scope?: string;
  fetchOptions?: RequestInit;
  mutationOptions?: Omit<
    UseMutationOptions<TResponse, Error, TVariables>,
    'mutationFn'
  >;
};

export function useApiQuery<TResponse>({
  path,
  queryKey,
  pageQuery,
  audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
  scope,
  fetchOptions = {},
  queryOptions = {},
}: UseApiQueryParams<TResponse>) {
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

    return response.json() as Promise<TResponse>;
  };

  return useQuery<TResponse, Error, TResponse, QueryKey>(
    queryKey,
    queryFn,
    queryOptions
  );
}

export function useApiMutation<TVariables, TResponse>({
  path,
  queryKey: mutationKey,
  pageQuery,
  audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
  scope,
  fetchOptions = {},
  mutationOptions = {},
}: UseApiMutationParams<TVariables, TResponse>) {
  const { getAccessTokenSilently } = useAuth0();

  const params = pageQuery ? `?${pageQuery.toString()}` : '';

  const mutationFn = async (variables: TVariables) => {
    try {
      const accessToken = await getAccessTokenSilently({ audience, scope });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}${params}`,
        {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(variables),
        }
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

  return useMutation<TResponse, Error, TVariables>(
    mutationKey,
    mutationFn,
    mutationOptions
  );
}
