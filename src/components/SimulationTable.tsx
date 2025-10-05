import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export interface SimulationData {
  id: string;
  dateTime: string;
  expectedPension: number;
  age: number;
  sex: string;
  salary: number;
  sickLeave: boolean;
  accumulatedFunds: number;
  actualPension: number;
  realPension: number;
  postalCode?: string;
}

interface SimulationTableProps {
  data: SimulationData[];
  onExport: () => void;
}

export const SimulationTable = ({ data, onExport }: SimulationTableProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Historia symulacji</h2>
        <Button variant="outline" onClick={onExport} className="gap-2">
          <Download className="h-4 w-4" />
          Eksportuj Excel
        </Button>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[100px]">ID</TableHead>
              <TableHead className="min-w-[150px]">Data symulacji</TableHead>
              <TableHead className="min-w-[80px]">Wiek</TableHead>
              <TableHead className="min-w-[80px]">Płeć</TableHead>
              <TableHead className="min-w-[120px]">Wynagrodzenie</TableHead>
              <TableHead className="min-w-[120px]">Kod pocztowy</TableHead>
              <TableHead className="min-w-[150px]">Pożądana emerytura</TableHead>
              <TableHead className="min-w-[150px]">Zgromadzone środki</TableHead>
              <TableHead className="min-w-[120px]">L4 wliczone</TableHead>
              <TableHead className="min-w-[150px]">Prognozowana emerytura</TableHead>
              <TableHead className="min-w-[150px]">Realna emerytura</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                  Brak danych do wyświetlenia
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{formatDate(row.dateTime)}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.sex}</TableCell>
                  <TableCell>{formatCurrency(row.salary)}</TableCell>
                  <TableCell>{row.postalCode || '—'}</TableCell>
                  <TableCell>{formatCurrency(row.expectedPension)}</TableCell>
                  <TableCell>{formatCurrency(row.accumulatedFunds)}</TableCell>
                  <TableCell>{row.sickLeave ? 'Tak' : 'Nie'}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(row.actualPension)}</TableCell>
                  <TableCell className="font-semibold text-accent">{formatCurrency(row.realPension)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
