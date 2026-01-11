//src/lib/types.ts

// ===========
// MICROSOFT
// ===========
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
  provider: 'microsoft';
  stats: {
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
  };
}

// ===========
// CLOUDFLARE
// ===========
export interface CloudflareIncident {
  id: string;
  name: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'postmortem';
  impact: 'none' | 'minor' | 'major' | 'critical';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  shortlink: string;
  isResolved: boolean;
  updates: CloudflareUpdate[];
  components: CloudflareComponent[];
}

export interface CloudflareUpdate {
  id: string;
  status: string;
  body: string;
  created_at: string;
  display_at: string;
}

export interface CloudflareComponent {
  id: string;
  name: string;
  status: string;
  description?: string;
}

export interface CloudflareIssuesResponse {
  provider: 'cloudflare';
  incidents: CloudflareIncident[];
  total: number;
  days: number;
  timestamp: string;
}

export interface CloudflareStatsResponse {
  provider: 'cloudflare';
  stats: {
    total: number;
    active: number;
    resolved: number;
    byImpact: {
      none: number;
      minor: number;
      major: number;
      critical: number;
    };
    byStatus: {
      investigating: number;
      identified: number;
      monitoring: number;
      resolved: number;
      postmortem: number;
    };
    days: number;
    timestamp: string;
  };
}