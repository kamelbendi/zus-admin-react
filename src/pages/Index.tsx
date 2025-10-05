import { StatCard } from "@/components/StatCard";
import { SimulationTable, SimulationData } from "@/components/SimulationTable";
import ZusLogo from "@/components/ZusLogo";
import { TrendingUp, Banknote, Users } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from 'xlsx';

// Mock data for demonstration
const mockData: SimulationData[] = [
  {
    id: "SIM-001",
    dateTime: "2025-04-10T14:30:00",
    expectedPension: 4500,
    age: 65,
    sex: "M",
    salary: 8000,
    sickLeave: true,
    accumulatedFunds: 350000,
    actualPension: 3800,
    realPension: 3420,
    postalCode: "00-001",
  },
  {
    id: "SIM-002",
    dateTime: "2025-04-10T13:15:00",
    expectedPension: 3800,
    age: 62,
    sex: "K",
    salary: 6500,
    sickLeave: false,
    accumulatedFunds: 280000,
    actualPension: 3200,
    realPension: 2880,
    postalCode: "00-950",
  },
  {
    id: "SIM-003",
    dateTime: "2025-04-10T11:45:00",
    expectedPension: 5200,
    age: 67,
    sex: "M",
    salary: 9500,
    sickLeave: true,
    accumulatedFunds: 420000,
    actualPension: 4500,
    realPension: 4050,
  },
  {
    id: "SIM-004",
    dateTime: "2025-04-09T16:20:00",
    expectedPension: 3500,
    age: 60,
    sex: "K",
    salary: 5800,
    sickLeave: false,
    accumulatedFunds: 240000,
    actualPension: 2900,
    realPension: 2610,
    postalCode: "02-495",
  },
  {
    id: "SIM-005",
    dateTime: "2025-04-09T10:10:00",
    expectedPension: 4000,
    age: 64,
    sex: "M",
    salary: 7200,
    sickLeave: true,
    accumulatedFunds: 310000,
    actualPension: 3400,
    realPension: 3060,
    postalCode: "00-001",
  },
];

const Index = () => {
  const handleExport = () => {
    // Prepare data for Excel export
    const exportData = mockData.map(item => ({
      'ID': item.id,
      'Data symulacji': new Date(item.dateTime).toLocaleString('pl-PL'),
      'Wiek': item.age,
      'Płeć': item.sex,
      'Wynagrodzenie': item.salary,
      'Kod pocztowy': item.postalCode || '—',
      'Pożądana emerytura': item.expectedPension,
      'Zgromadzone środki': item.accumulatedFunds,
      'L4 wliczone': item.sickLeave ? 'Tak' : 'Nie',
      'Prognozowana emerytura': item.actualPension,
      'Realna emerytura': item.realPension,
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Symulacje');
    
    // Generate file
    const fileName = `symulacje_emerytalne_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
    
    toast.success("Raport został wyeksportowany do pliku Excel");
  };

  const totalSimulations = mockData.length;
  const averagePension = mockData.reduce((sum, item) => sum + item.realPension, 0) / mockData.length;
  const thisMonthSimulations = mockData.filter(item => {
    const itemDate = new Date(item.dateTime);
    const now = new Date();
    return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <ZusLogo width={120} height={27} className="flex-shrink-0" />
            <div className="h-8 w-px bg-border"></div>
            <h1 className="text-3xl font-bold">Panel Administracyjny</h1>
          </div>
          <p className="text-muted-foreground">
            Zarządzaj i analizuj statystyki symulacji emerytalnych użytkowników. Przeglądaj wszystkie symulacje,
            filtruj według daty i regionu, oraz eksportuj szczegółowe raporty.
          </p>
        </header>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Wszystkie symulacje"
              value={totalSimulations.toLocaleString('pl-PL')}
              icon={TrendingUp}
            />
            <StatCard
              title="Średnia prognozowana emerytura"
              value={new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
                minimumFractionDigits: 0,
              }).format(averagePension)}
              icon={Banknote}
              accentColor
            />
            <StatCard
              title="Symulacje w tym miesiącu"
              value={thisMonthSimulations.toLocaleString('pl-PL')}
              icon={Users}
            />
          </div>

          <SimulationTable data={mockData} onExport={handleExport} />
        </div>
      </div>
    </div>
  );
};

export default Index;
