import { IssuesResponse, StatsResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:7071/api';

export const api = {
  // Obtener issues filtrados por días
  getIssues: async (days: number = 30): Promise<IssuesResponse> => {
    const res = await fetch(`${API_BASE_URL}/issues?days=${days}`, {
      cache: 'no-store', // Siempre fresh data
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch issues');
    }
    
    return res.json();
  },

  // Obtener estadísticas
  getStats: async (days: number = 30): Promise<StatsResponse> => {
    const res = await fetch(`${API_BASE_URL}/stats?days=${days}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch stats');
    }
    
    return res.json();
  },
};