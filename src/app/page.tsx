'use client';

import { useState } from 'react';
import { useIssues } from '@/lib/hooks/use-issues';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { DaysFilter } from '@/components/dashboard/days-filter';
import { IssuesTable } from '@/components/issues/issues-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  // ⚡ State de días - ÚNICO filtro que hace HTTP request
  const [days, setDays] = useState(30);

  // 🎯 TanStack Query - Fetch automático cuando days cambia
  const { data, isLoading, error } = useIssues(days);

  if (error) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              No se pudieron cargar los datos. Verifica que el backend esté corriendo.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex justify-center'>
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Microsoft 365 Service Health
            </h1>
            <p className="text-muted-foreground">
              Monitor de salud de servicios de Microsoft 365
            </p>
          </div>

          {/* ⚡ Filtro de días - ÚNICO que hace HTTP request */}
          <DaysFilter value={days} onChange={setDays} />
        </div>

        {/* Stats Cards */}
        <StatsCards days={days} />

        {/* Tabla de Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Todos los Issues</CardTitle>
            <CardDescription>
              {data && `${data.total} issues en los últimos ${data.days} días`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Cargando...</div>
              </div>
            ) : data ? (
              // ⚡ TanStack Table - TODO instantáneo aquí
              <IssuesTable data={data.issues} />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}