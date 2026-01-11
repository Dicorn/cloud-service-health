//src/lib/hooks/use-cloudflare-issues.ts

'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export function useCloudflareIssues(days: number = 30) {
  return useQuery({
    queryKey: ['cloudflare-issues', days],
    queryFn: () => api.cloudflare.getIssues(days),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}