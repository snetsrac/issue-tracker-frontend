import axios from 'axios';

type PageMetadata = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

export type Issue = {
  id: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'MORE_INFO_NEEDED' | 'RESOLVED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
};

type Issues = {
  content: Issue[];
} & PageMetadata;

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
  headers: {
    Accept: 'application/hal+json',
  },
});

export async function getIssues(page?: string): Promise<Issues> {
  const path = page === undefined ? '/issues' : `/issues?page=${page}`;
  return (await instance.get<Issues>(path)).data;
}

export async function getIssue(id: string): Promise<Issue> {
  const path = `/issues/${id}`;
  return (await instance.get<Issue>(path)).data;
}
