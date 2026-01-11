//src/lib/hooks/use-cloudflare-stats.ts

'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export function useCloudflareStats(days: number = 30) {
  return useQuery({
    queryKey: ['cloudflare-stats', days],
    queryFn: () => api.cloudflare.getStats(days),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}