import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api, assemblePageParams, Page, PageMetadata } from '.';

export type Issue = {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
};

export type IssueNew = {
  title: string;
  description: string;
  priority: IssuePriority;
};

export enum IssueStatus {
  NULL = '',
  OPEN = 'open',
  IN_PROGRESS = 'in progress',
  MORE_INFO_NEEDED = 'more info needed',
  RESOLVED = 'resolved',
}

export enum IssuePriority {
  NULL = '',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export type Issues = {
  content: Issue[];
} & PageMetadata;

export function useGetIssuesQuery(page: Page) {
  const params = assemblePageParams(page);

  const getIssues = async (page: Page) => {
    const response = await api.get<Issues>('/issues', {
      params: params,
    });
    return response.data;
  };

  return useQuery(['issues', page], () => getIssues(page), {
    keepPreviousData: true,
  });
}

export function useGetIssueQuery(id: string, runOnce?: boolean) {
  const getIssue = async (id: string) => {
    const response = await api.get<Issue>(`issues/${id}`);
    return response.data;
  };

  return useQuery(['issue', id], () => getIssue(id), {
    staleTime: runOnce ? Infinity : undefined,
  });
}
