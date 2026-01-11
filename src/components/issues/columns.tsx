//src/app/columns.tsx

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Issue } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.id}</span>
    ),
  },
  {
    accessorKey: 'service',
    header: 'Servicio',
    // ⚡ Este campo se puede filtrar
    filterFn: 'includesString',
  },
  {
    accessorKey: 'title',
    header: 'Título',
    cell: ({ row }) => (
      <div className="max-w-100">
        <p className="truncate font-medium">{row.original.title}</p>
      </div>
    ),
  },
  {
    accessorKey: 'classification',
    header: 'Clasificación',
    cell: ({ row }) => {
      const classification = row.original.classification;
      return (
        <Badge 
          variant={classification === 'incident' ? 'destructive' : 'secondary'} className='w-full'
        >
          {classification === 'incident' ? '🔴 Incidente' : '📢 Aviso'}
        </Badge>
      );
    },
    // ⚡ Filtro exacto
    filterFn: 'equals',
  },
  {
    accessorKey: 'isResolved',
    header: 'Estado',
    cell: ({ row }) => {
      const isResolved = row.original.isResolved;
      return (
        <Badge variant={isResolved ? 'outline' : 'default'} className='w-full'>
          {isResolved ? '✅ Resuelto' : '⚠️ Activo'}
        </Badge>
      );
    },
    // ⚡ Filtro personalizado
    filterFn: (row, columnId, filterValue) => {
      if (filterValue === 'all') return true;
      if (filterValue === 'active') return !row.original.isResolved;
      if (filterValue === 'resolved') return row.original.isResolved;
      return true;
    },
  },
  {
    accessorKey: 'lastModifiedDateTime',
    header: 'Última Actualización',
    cell: ({ row }) => {
      const date = new Date(row.original.lastModifiedDateTime);
      return (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(date, { addSuffix: true, locale: es })}
        </span>
      );
    },
    // ⚡ Sorting por fecha
    sortingFn: 'datetime',
  },
];