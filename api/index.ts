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
  status: IssueStatus;
  priority: IssuePriority;
};

export enum IssueStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in progress',
  MORE_INFO_NEEDED = 'more info needed',
  RESOLVED = 'resolved',
}

export enum IssuePriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

type Issues = {
  content: Issue[];
} & PageMetadata;

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

export async function getIssues(page?: string) {
  const path = page === undefined ? '/issues' : `/issues?page=${page}`;
  return (await api.get<Issues>(path)).data;
}

export async function getIssue(id: string) {
  const path = `/issues/${id}`;
  return (await api.get<Issue>(path)).data;
}
