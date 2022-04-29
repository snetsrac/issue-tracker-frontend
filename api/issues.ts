import { useQueryClient } from 'react-query';
import { PageMetadata, PageQuery } from '../components/pagination/pagination';
import { useApiMutation, useApiQuery } from './useApi';
import { User } from './users';

export type Issue = {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  submitter: User | null;
  assignees: User[];
  createdAt: string;
};

export type IssueCreation = {
  title: string;
  description: string;
  priority: IssuePriority;
};

export type IssueUpdate = {
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignees: User[];
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
  page: PageMetadata;
};

export function useGetIssuesQuery(pageQuery: PageQuery) {
  return useApiQuery<Issues>({
    path: '/issues',
    queryKey: ['issues', pageQuery.toString()],
    pageQuery,
    queryOptions: { keepPreviousData: true },
  });
}

export function useGetIssueByIdQuery(id: string) {
  return useApiQuery<Issue>({
    path: `/issues/${id}`,
    queryKey: ['issues', id],
  });
}

export function useCreateIssueMutation(issue: IssueCreation) {
  const queryClient = useQueryClient();
  return useApiMutation<Issue, IssueCreation>({
    path: '/issues',
    queryKey: ['issues'],
    body: issue,
    fetchOptions: { method: 'POST' },
    mutationOptions: {
      onSuccess: (newIssue) => {
        queryClient.invalidateQueries(['issues']);
        queryClient.setQueryData(['issue', newIssue.id.toString()], newIssue);
      },
    },
  });
}

export function useUpdateIssueMutation(id: string, issue: IssueUpdate) {
  const queryClient = useQueryClient();
  return useApiMutation<Issue, IssueUpdate>({
    path: `/issues/${id}`,
    queryKey: ['issues', id],
    body: issue,
    fetchOptions: { method: 'PUT' },
    mutationOptions: {
      onSuccess: (updatedIssue) => {
        queryClient.invalidateQueries(['issues']);
        queryClient.setQueryData(['issue', id], updatedIssue);
      },
    },
  });
}
