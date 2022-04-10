import axios from 'axios';
import { PageQuery } from '../components/pagination/pagination';

export * from './issues';

export type PageMetadata = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
  sort: string[];
};

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

export function assemblePageParams({ page, size, sort }: PageQuery) {
  const params = new URLSearchParams();

  if (page !== undefined) {
    // Subtract 1 from the page query because server pages are 0-indexed and
    // client pages are 1 - indexed
    params.set('page', (page - 1).toString());
  }

  if (size !== undefined) {
    params.set('size', size.toString());
  }

  if (sort !== undefined) {
    params.set('sort', sort.toString());
  }

  return params;
}
