import axios from 'axios';

type PageMetadata = {
  page: number;
  totalElements: number;
  totalPages: number;
  number: number;
};

type HalLink = {
  href: string;
  templated?: boolean;
  type?: string;
  deprecation?: string;
  name?: string;
  profile?: string;
  title?: string;
  hreflang?: string;
};

type Issue = {
  id: number;
  title: string;
  description: string;
  _links?: {
    [rel: string]: HalLink;
  };
};

type Issues = {
  _embedded: {
    issueList: Issue[];
  };
  _links?: {
    [rel: string]: HalLink;
  };
  page: PageMetadata;
};

const instance = axios.create({
  baseURL: 'http://localhost/api',
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
