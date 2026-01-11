//src/components/dashboard/cloudflare-stats-cards.tsx

'use client';

import { useCloudflareStats } from '@/lib/hooks/use-cloudflare-stats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CloudflareStatsCardsProps {
  days: number;
}

export function CloudflareStatsCards({ days }: CloudflareStatsCardsProps) {
  const { data: cfData, isLoading } = useCloudflareStats(days);
  
  const stats = cfData?.stats;

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <>
      {/* Primera fila: 3 cards principales */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Incidentes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidentes</CardTitle>
            <span className="text-2xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Últimos {stats.days} días
            </p>
          </CardContent>
        </Card>

        {/* Activos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <span className="text-2xl">⚠️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              En progreso
            </p>
          </CardContent>
        </Card>

        {/* Resueltos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resueltos</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground">
              Completados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Segunda fila: Por impacto */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🔴 Crítico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.byImpact.critical}</div>
            <p className="text-xs text-muted-foreground">
              Impacto severo
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🟠 Mayor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.byImpact.major}</div>
            <p className="text-xs text-muted-foreground">
              Impacto significativo
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🟡 Menor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.byImpact.minor}</div>
            <p className="text-xs text-muted-foreground">
              Impacto limitado
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">⚪ Ninguno</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.byImpact.none}</div>
            <p className="text-xs text-muted-foreground">
              Sin impacto
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tercera fila: Por estado */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">🔍 Investigando</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stats.byStatus.investigating}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">✅ Identificado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stats.byStatus.identified}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">👁️ Monitoreando</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stats.byStatus.monitoring}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">✅ Resuelto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stats.byStatus.resolved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">📝 Post-mortem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stats.byStatus.postmortem}</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}