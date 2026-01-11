//src/lib/api.ts

import { 
  IssuesResponse, 
  StatsResponse,
  CloudflareIssuesResponse,
  CloudflareStatsResponse 
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = {
  // ==========
  // MICROSOFT
  // ==========
  getIssues: async (days: number = 30): Promise<IssuesResponse> => {
    const res = await fetch(`${API_BASE_URL}/ms/issues?days=${days}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch issues');
    }
    
    return res.json();
  },

  getStats: async (days: number = 30): Promise<StatsResponse> => {
    const res = await fetch(`${API_BASE_URL}/ms/stats?days=${days}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch stats');
    }
    
    return res.json();
  },

  // ===========
  // CLOUDFLARE 
  // ===========
  cloudflare: {
    getIssues: async (days: number = 30): Promise<CloudflareIssuesResponse> => {
      const res = await fetch(`${API_BASE_URL}/cf/issues?days=${days}`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch Cloudflare issues');
      }

      return res.json();
    },

    getStats: async (days: number = 30): Promise<CloudflareStatsResponse> => {
      const res = await fetch(`${API_BASE_URL}/cf/stats?days=${days}`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch Cloudflare stats');
      }

      return res.json();
    },
  },
};