import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SimulationFiltersProps {
  startDate: string;
  endDate: string;
  postalCode: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onPostalCodeChange: (code: string) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

export const SimulationFilters = ({
  startDate,
  endDate,
  postalCode,
  onStartDateChange,
  onEndDateChange,
  onPostalCodeChange,
  onApplyFilters,
  onResetFilters,
}: SimulationFiltersProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Filtruj symulacje</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Data początkowa
          </label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Data końcowa
          </label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Kod pocztowy (opcjonalnie)
          </label>
          <Input
            type="text"
            placeholder="Np. 00-001"
            value={postalCode}
            onChange={(e) => onPostalCodeChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onResetFilters}>
          Zastosuj filtry
        </Button>
        <Button variant="outline" onClick={onApplyFilters}>
          Resetuj filtry
        </Button>
      </div>
    </Card>
  );
};
