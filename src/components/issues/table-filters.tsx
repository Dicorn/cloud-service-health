//src/app/components/issues/table-filters.tsx

'use client';

import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Issue } from '@/lib/types';
import { useMemo } from 'react';

interface TableFiltersProps {
  table: Table<Issue>;
  data: Issue[];
}

export function TableFilters({ table, data }: TableFiltersProps) {
  // ✨ Extraer servicios únicos de los datos (SIN API)
  const services = useMemo(() => {
    if (!data || data.length === 0) return [];
    return [...new Set(data.map((issue) => issue.service))].sort();
  }, [data]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Búsqueda Global - Instantánea */}
      <Input
        placeholder="Buscar en todos los campos..."
        value={(table.getState().globalFilter as string) ?? ''}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      <div className="flex gap-2">
        {/* Filtro por Servicio - Instantáneo */}
        <Select
          value={(table.getColumn('service')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) =>
            table.getColumn('service')?.setFilterValue(value === 'all' ? undefined : value)
          }
        >
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Servicio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los servicios</SelectItem>
            {services.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtro por Clasificación - Instantáneo */}
        <Select
          value={(table.getColumn('classification')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) =>
            table.getColumn('classification')?.setFilterValue(value === 'all' ? undefined : value)
          }
        >
          <SelectTrigger className="w-37.5">
            <SelectValue placeholder="Clasificación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="incident">🔴 Incidentes</SelectItem>
            <SelectItem value="advisory">📢 Avisos</SelectItem>
          </SelectContent>
        </Select>

        {/* Filtro por Estado - Instantáneo */}
        <Select
          value={(table.getColumn('isResolved')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) =>
            table.getColumn('isResolved')?.setFilterValue(value === 'all' ? undefined : value)
          }
        >
          <SelectTrigger className="w-37.5">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">⚠️ Activos</SelectItem>
            <SelectItem value="resolved">✅ Resueltos</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}