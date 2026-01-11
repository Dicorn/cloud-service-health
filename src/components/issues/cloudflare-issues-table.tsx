//src/components/issues/cloudflare-issues-table.tsx

'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnFiltersState,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table';
import { CloudflareIncident } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { CloudflareDetailDialog } from './cloudflare-detail-dialog';

interface CloudflareIssuesTableProps {
  data: CloudflareIncident[];
}

export function CloudflareIssuesTable({ data }: CloudflareIssuesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<CloudflareIncident | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Definir columnas específicas para Cloudflare
  const columns: ColumnDef<CloudflareIncident>[] = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.id}</span>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: ({ row }) => (
        <div className="max-w-100">
          <p className="truncate font-medium">{row.original.name}</p>
        </div>
      ),
    },
    {
      accessorKey: 'impact',
      header: 'Impacto',
      cell: ({ row }) => {
        const impact = row.original.impact;
        const variants: Record<string, 'destructive' | 'secondary' | 'outline'> = {
          critical: 'destructive' as const,
          major: 'destructive' as const,
          minor: 'secondary' as const,
          none: 'outline' as const,
        };
        const labels: Record<string, string> = {
          critical: '🔴 Crítico',
          major: '🟠 Mayor',
          minor: '🟡 Menor',
          none: '⚪ Ninguno',
        };
        return (
          <Badge variant={variants[impact]} className='w-full'>
            {labels[impact]}
          </Badge>
        );
      },
      filterFn: 'equals',
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => {
        const status = row.original.status;
        const labels: any = {
          investigating: '🔍 Investigando',
          identified: '✅ Identificado',
          monitoring: '👁️ Monitoreando',
          resolved: '✅ Resuelto',
          postmortem: '📝 Post-mortem',
        };
        return (
          <Badge variant={status === 'resolved' ? 'outline' : 'default'} className='w-full'>
            {labels[status]}
          </Badge>
        );
      },
      filterFn: 'equals',
    },
    {
      accessorKey: 'components',
      header: 'Componentes Afectados',
      cell: ({ row }) => {
        const components = row.original.components || [];
        if (components.length === 0) return <span className="text-muted-foreground">Ninguno</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {components.slice(0, 2).map((c: any) => (
              <Badge key={c.id} variant="outline" className="text-xs">
                {c.name}
              </Badge>
            ))}
            {components.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{components.length - 2}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'updatedAt',
      header: 'Última Actualización',
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt);
        return (
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(date, { addSuffix: true, locale: es })}
          </span>
        );
      },
      sortingFn: 'datetime',
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleRowClick = (incident: CloudflareIncident) => {
    setSelectedIncident(incident);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Buscar..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

        <div className="flex gap-2">
          {/* Filtro por Impacto */}
          <Select
            value={(table.getColumn('impact')?.getFilterValue() as string) ?? 'all'}
            onValueChange={(value) =>
              table.getColumn('impact')?.setFilterValue(value === 'all' ? undefined : value)
            }
          >
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder="Impacto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="critical">🔴 Crítico</SelectItem>
              <SelectItem value="major">🟠 Mayor</SelectItem>
              <SelectItem value="minor">🟡 Menor</SelectItem>
              <SelectItem value="none">⚪ Ninguno</SelectItem>
            </SelectContent>
          </Select>

          {/* Filtro por Estado */}
          <Select
            value={(table.getColumn('status')?.getFilterValue() as string) ?? 'all'}
            onValueChange={(value) =>
              table.getColumn('status')?.setFilterValue(value === 'all' ? undefined : value)
            }
          >
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="investigating">🔍 Investigando</SelectItem>
              <SelectItem value="identified">✅ Identificado</SelectItem>
              <SelectItem value="monitoring">👁️ Monitoreando</SelectItem>
              <SelectItem value="resolved">✅ Resuelto</SelectItem>
              <SelectItem value="postmortem">📝 Post-mortem</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-muted-foreground">
        Mostrando {table.getFilteredRowModel().rows.length} de {data.length} incidentes
      </div>

      {/* Tabla */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CloudflareDetailDialog
        incident={selectedIncident}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}