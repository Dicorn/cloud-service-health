export interface Issue {
  id: string;
  title: string;
  service: string;
  classification: 'incident' | 'advisory';
  isResolved: boolean;
  startDateTime: string;
  lastModifiedDateTime: string;
  impactDescription?: string;
  status: string;
  posts: Post[];
}

export interface Post {
  createdDateTime: string;
  postType: string;
  description: {
    content: string;
  };
}

export interface IssuesResponse {
  issues: Issue[];
  total: number;
  days: number;
  timestamp: string;
}

export interface StatsResponse {
  total: number;
  incidents: number;
  incidentsActive: number;
  advisories: number;
  advisoriesActive: number;
  resolved: number;
  active: number;
  services: number;
  days: number;
  timestamp: string;
}