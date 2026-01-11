//src/components/issues/issue-detail-dialog.tsx

'use client';

import { Issue } from '@/lib/types';
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
import { CalendarIcon, AlertCircle } from 'lucide-react';

interface IssueDetailDialogProps {
  issue: Issue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IssueDetailDialog({ issue, open, onOpenChange }: IssueDetailDialogProps) {
  if (!issue) return null;

  // Parsear postsJson si viene como string
  const posts = (() => {
    const issueAny = issue as any;
    if (issueAny.postsJson && typeof issueAny.postsJson === 'string') {
      try {
        return JSON.parse(issueAny.postsJson);
      } catch (e) {
        console.error('Error parsing postsJson:', e);
        return [];
      }
    }
    return issue.posts || [];
  })();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none! w-[50vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl">{issue.title}</DialogTitle>
              <DialogDescription className="mt-2">
                {issue.service} • ID: {issue.id}
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
            <CardContent className="space-y-5">
                <div className="flex gap-2">
                <Badge variant={issue.classification === 'incident' ? 'destructive' : 'secondary'}>
                    {issue.classification === 'incident' ? '🔴 Incidente' : '📢 Aviso'}
                </Badge>
                <Badge variant={issue.isResolved ? 'outline' : 'default'}>
                    {issue.isResolved ? '✅ Resuelto' : '⚠️ Activo'}
                </Badge>
                </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <p className="text-sm">{issue.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Servicio</p>
                  <p className="text-sm">{issue.service}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  <AlertCircle className="inline h-4 w-4 mr-1" />
                  Descripción del Impacto
                </p>
                <p className="text-sm bg-muted p-3 rounded-md">
                  {issue.impactDescription || 'No disponible'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    <CalendarIcon className="inline h-4 w-4 mr-1" />
                    Inicio
                  </p>
                  <p className="text-sm">
                    {format(new Date(issue.startDateTime), 'PPpp', { locale: es })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(issue.startDateTime), { addSuffix: true, locale: es })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    <CalendarIcon className="inline h-4 w-4 mr-1" />
                    Última Actualización
                  </p>
                  <p className="text-sm">
                    {format(new Date(issue.lastModifiedDateTime), 'PPpp', { locale: es })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(issue.lastModifiedDateTime), { addSuffix: true, locale: es })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Últimas actualizaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                📝 Últimas 5 Actualizaciones ({posts.length} totales)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post: any, index: number) => (
                    <div
                      key={index}
                      className="border-l-2 border-primary pl-4 py-2 hover:bg-muted/50 transition-colors rounded"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {post.postType}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(post.createdDateTime), 'PPp', { locale: es })}
                        </span>
                      </div>
                      <div
                        className="text-sm prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: post.description?.content || post.description || '' 
                        }}
                      />
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