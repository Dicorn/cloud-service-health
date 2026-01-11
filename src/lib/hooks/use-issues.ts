//src/lib/hooks/use-issues.ts

'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export function useIssues(days: number = 30) {
  return useQuery({
    queryKey: ['issues', days],
    queryFn: () => api.getIssues(days),
    staleTime: 5 * 60 * 1000,       // Cache 5 min
    refetchInterval: 5 * 60 * 1000,  // Auto-refresh cada 5 min
  });
}