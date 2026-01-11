//src/app/microsoft/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useIssues } from '@/lib/hooks/use-issues';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { DaysFilter } from '@/components/dashboard/days-filter';
import { IssuesTable } from '@/components/issues/issues-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function MicrosoftPage() {
  const [days, setDays] = useState(30);

  const { data, isLoading, error } = useIssues(days);

  if (error) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              No se pudieron cargar los datos de Microsoft. Verifica que el backend esté corriendo.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex justify-center'>
      <div className="container py-8 space-y-8">
        {/* Header con botón de regreso */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                🔵 Microsoft 365 Service Health
              </h1>
              <p className="text-muted-foreground">
                Monitor de salud de servicios de Microsoft 365
              </p>
            </div>
          </div>

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
              <IssuesTable data={data.issues} />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}