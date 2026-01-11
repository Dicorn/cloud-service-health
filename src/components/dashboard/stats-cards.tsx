//src/components/dashboard/stats-cards.tsx

'use client';

import { useStats } from '@/lib/hooks/use-stats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
  days: number;
}

export function StatsCards({ days }: StatsCardsProps) {
  const { data, isLoading } = useStats(days);

  const stats = data?.stats;

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
        {/* Total Issues */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <span className="text-2xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xm text-muted-foreground">
              Últimos {stats.days} días
            </p>
          </CardContent>
        </Card>

        {/* Issues Activos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <span className="text-2xl">⚠️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
            <p className="text-xm text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>

        {/* Issues Resueltos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resueltos</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            <p className="text-xm text-muted-foreground">
              Ya solucionados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Segunda fila: Desglose por tipo */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Incidencias Activas */}
        <Card className="border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🔴 Incidencias Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.incidentsActive}</div>
            <p className="text-xm text-muted-foreground">
              {stats.incidents} totales · {stats.incidents - stats.incidentsActive} resueltos
            </p>
          </CardContent>
        </Card>

        {/* Advertencias Activas */}
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">📢 Advertencias Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.advisoriesActive}</div>
            <p className="text-xm text-muted-foreground">
              {stats.advisories} totales · {stats.advisories - stats.advisoriesActive} resueltos
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}