//src/components/dashboard/

'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DaysFilterProps {
  value: number;
  onChange: (value: number) => void;
}

export function DaysFilter({ value, onChange }: DaysFilterProps) {
  return (
    <Select
      value={value.toString()}
      onValueChange={(v) => onChange(Number(v))}
    >
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Seleccionar período" />
      </SelectTrigger>
      <SelectContent position='popper'>
        <SelectItem value="7">Últimos 7 días</SelectItem>
        <SelectItem value="15">Últimos 15 días</SelectItem>
        <SelectItem value="30">Últimos 30 días</SelectItem>
        <SelectItem value="60">Últimos 60 días</SelectItem>
        <SelectItem value="90">Últimos 90 días</SelectItem>
      </SelectContent>
    </Select>
  );
}