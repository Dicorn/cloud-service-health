//src/app/cloudflare/page.tsx

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCloudflareIssues } from '@/lib/hooks/use-cloudflare-issues';
import { DaysFilter } from '@/components/dashboard/days-filter';
import { CloudflareIssuesTable } from '@/components/issues/cloudflare-issues-table';
import { CloudflareStatsCards } from '@/components/dashboard/cloudflare-stats-cards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CloudflarePage() {
  const [days, setDays] = useState(30);

  const { data, isLoading, error } = useCloudflareIssues(days);

  // Parsear los datos antes de pasarlos a la tabla
  const parsedIncidents = useMemo(() => {
    if (!data?.incidents) return [];

    return data.incidents.map((incident: any) => {
      // Parsear updatesJson si es string
      let updates = incident.updates || [];
      if (incident.updatesJson && typeof incident.updatesJson === 'string') {
        try {
          updates = JSON.parse(incident.updatesJson);
        } catch (e) {
          console.error('Error parsing updatesJson:', e);
        }
      }

      // Parsear componentsJson si es string
      let components = incident.components || [];
      if (incident.componentsJson && typeof incident.componentsJson === 'string') {
        try {
          components = JSON.parse(incident.componentsJson);
        } catch (e) {
          console.error('Error parsing componentsJson:', e);
        }
      }

      return {
        ...incident,
        updates,
        components,
      };
    });
  }, [data]);

  if (error) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              No se pudieron cargar los datos de Cloudflare. Verifica que el backend esté corriendo.
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
                🟠 Cloudflare Status
              </h1>
              <p className="text-muted-foreground">
                Monitor de estado de servicios de Cloudflare
              </p>
            </div>
          </div>

          <DaysFilter value={days} onChange={setDays} />
        </div>

        {/* Stats Cards */}
        <CloudflareStatsCards days={days} />

        {/* Tabla de Incidentes */}
        <Card>
          <CardHeader>
            <CardTitle>Todos los Incidentes</CardTitle>
            <CardDescription>
              {data && `${data.total} incidentes en los últimos ${data.days} días`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Cargando...</div>
              </div>
            ) : parsedIncidents.length > 0 ? (
              <CloudflareIssuesTable data={parsedIncidents} />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}