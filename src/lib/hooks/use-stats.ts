'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export function useStats(days: number = 30) {
  return useQuery({
    queryKey: ['stats', days],
    queryFn: () => api.getStats(days),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}