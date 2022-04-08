import axios from 'axios';

export * from './issues';

export type Page = {
  page?: number;
  size?: number;
  sort?: string[];
};

export type PageMetadata = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

export function assemblePageParams({ page, size, sort }: Page) {
  const params = new URLSearchParams();

  if (page !== undefined) {
    params.append('page', page.toString());
  }

  if (size !== undefined) {
    params.append('size', size.toString());
  }

  sort?.forEach((s) => {
    params.append('sort', s);
  });

  return params;
}
