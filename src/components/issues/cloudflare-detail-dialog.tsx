//src/components/issues/cloudflare-detail-dialog.tsx

'use client';

import { CloudflareIncident } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CloudflareDetailDialogProps {
  incident: CloudflareIncident | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CloudflareDetailDialog({ incident, open, onOpenChange }: CloudflareDetailDialogProps) {
  if (!incident) return null;

  const updates = (() => {
    const incidentAny = incident as any;
    if (incidentAny.updatesJson && typeof incidentAny.updatesJson === 'string') {
      try {
        return JSON.parse(incidentAny.updatesJson);
      } catch (e) {
        console.error('Error parsing updatesJson:', e);
        return [];
      }
    }
    return incident.updates || [];
  })();

  const components = (() => {
    const incidentAny = incident as any;
    if (incidentAny.componentsJson && typeof incidentAny.componentsJson === 'string') {
      try {
        return JSON.parse(incidentAny.componentsJson);
      } catch (e) {
        console.error('Error parsing componentsJson:', e);
        return [];
      }
    }
    return incident.components || [];
  })();

  const impactColors = {
    critical: 'destructive',
    major: 'destructive',
    minor: 'secondary',
    none: 'outline',
  } as const;

  const impactLabels = {
    critical: '🔴 Crítico',
    major: '🟠 Mayor',
    minor: '🟡 Menor',
    none: '⚪ Ninguno',
  };

  const statusLabels = {
    investigating: '🔍 Investigando',
    identified: '✅ Identificado',
    monitoring: '👁️ Monitoreando',
    resolved: '✅ Resuelto',
    postmortem: '📝 Post-mortem',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none! w-[50vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl">{incident.name}</DialogTitle>
              <DialogDescription className="mt-2">
                ID: {incident.id}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Información general */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <p className="text-sm">{statusLabels[incident.status]}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Impacto</p>
                  <p className="text-sm">{impactLabels[incident.impact]}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    <CalendarIcon className="inline h-4 w-4 mr-1" />
                    Inicio
                  </p>
                  <p className="text-sm">
                    {format(new Date(incident.createdAt), 'PPpp', { locale: es })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true, locale: es })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    <CalendarIcon className="inline h-4 w-4 mr-1" />
                    Última Actualización
                  </p>
                  <p className="text-sm">
                    {format(new Date(incident.updatedAt), 'PPpp', { locale: es })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(incident.updatedAt), { addSuffix: true, locale: es })}
                  </p>
                </div>
              </div>

              {incident.resolvedAt && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    <CalendarIcon className="inline h-4 w-4 mr-1" />
                    Resuelto
                  </p>
                  <p className="text-sm">
                    {format(new Date(incident.resolvedAt), 'PPpp', { locale: es })}
                  </p>
                </div>
              )}

              <div>
                <a href={incident.shortlink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver en Cloudflare Status
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Componentes afectados */}
          {components.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  🔧 Componentes Afectados ({components.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {components.map((component: any) => (
                    <Badge key={component.id} variant="outline">
                      {component.name}
                      {component.status !== 'operational' && (
                        <span className="ml-1 text-xs">({component.status})</span>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Últimas actualizaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                📝 Últimas 5 Actualizaciones ({updates.length} totales)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {updates.length > 0 ? (
                <div className="space-y-4">
                  {updates.slice(0, 5).map((update: any) => (
                    <div
                      key={update.id}
                      className="border-l-2 border-primary pl-4 py-2 hover:bg-muted/50 transition-colors rounded"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {update.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(update.created_at), 'PPp', { locale: es })}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{update.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No hay actualizaciones disponibles</p>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}