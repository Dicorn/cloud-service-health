//src/app/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStats } from '@/lib/hooks/use-stats';
import { useCloudflareStats } from '@/lib/hooks/use-cloudflare-stats';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DaysFilter } from '@/components/dashboard/days-filter';

export default function Home() {
  const [days, setDays] = useState(30);

  const { data: msStats, isLoading: msLoading } = useStats(days);
  const { data: cfData, isLoading: cfLoading } = useCloudflareStats(days);
  
  const cfStats = cfData?.stats;

  return (
    <div className='flex justify-center'>
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              🌐 Multi-Cloud Health Monitor
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Monitoreo centralizado de salud de servicios en la nube
            </p>
          </div>

          <DaysFilter value={days} onChange={setDays} />
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Total combinado */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Total Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {msLoading || cfLoading ? (
                  <span className="text-muted-foreground">...</span>
                ) : (
                  (msStats?.stats.total || 0) + (cfStats?.total || 0)
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                En todos los proveedores
              </p>
            </CardContent>
          </Card>

          {/* Activos */}
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-orange-600">
                {msLoading || cfLoading ? (
                  <span className="text-muted-foreground">...</span>
                ) : (
                  (msStats?.stats.active || 0) + (cfStats?.active || 0)
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Requieren atención
              </p>
            </CardContent>
          </Card>

          {/* Resueltos */}
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Resueltos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">
                {msLoading || cfLoading ? (
                  <span className="text-muted-foreground">...</span>
                ) : (
                  (msStats?.stats.resolved || 0) + (cfStats?.resolved || 0)
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Ya solucionados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Provider Cards */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Proveedores</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Microsoft Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      🔵 Microsoft 365
                    </CardTitle>
                    <CardDescription>
                      Service Health Dashboard
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {msLoading ? (
                  <div className="text-muted-foreground">Cargando...</div>
                ) : msStats ? (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-2xl font-bold">{msStats.stats.total}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Activos</p>
                        <p className="text-2xl font-bold text-orange-600">{msStats.stats.active}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Resueltos</p>
                        <p className="text-2xl font-bold text-green-600">{msStats.stats.resolved}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>🔴 Incidencias activas</span>
                        <span className="font-bold text-red-600">{msStats.stats.incidentsActive}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span>📢 Advertencias activas</span>
                        <span className="font-bold text-orange-600">{msStats.stats.advisoriesActive}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-destructive">Error al cargar datos</div>
                )}
              </CardContent>
              <CardFooter>
                <Link href="/microsoft" className="w-full">
                  <Button className="w-full" size="lg">
                    Ver detalles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Cloudflare Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      🟠 Cloudflare
                    </CardTitle>
                    <CardDescription>
                      Status Dashboard
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cfLoading ? (
                  <div className="text-muted-foreground">Cargando...</div>
                ) : cfStats ? (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-2xl font-bold">{cfStats.total}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Activos</p>
                        <p className="text-2xl font-bold text-orange-600">{cfStats.active}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Resueltos</p>
                        <p className="text-2xl font-bold text-green-600">{cfStats.resolved}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>🔴 Crítico</span>
                        <span className="font-bold text-red-600">{cfStats.byImpact.critical}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span>🟠 Mayor</span>
                        <span className="font-bold text-orange-600">{cfStats.byImpact.major}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span>🟡 Menor</span>
                        <span className="font-bold text-yellow-600">{cfStats.byImpact.minor}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-destructive">Error al cargar datos</div>
                )}
              </CardContent>
              <CardFooter>
                <Link href="/cloudflare" className="w-full">
                  <Button className="w-full" size="lg" variant="secondary">
                    Ver detalles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Coming Soon */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Próximamente</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="text-2xl">🟢 AWS Health</CardTitle>
                <CardDescription>Amazon Web Services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Próximamente disponible</p>
              </CardContent>
            </Card>

            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="text-2xl">🔷 Azure Status</CardTitle>
                <CardDescription>Microsoft Azure</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Próximamente disponible</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}