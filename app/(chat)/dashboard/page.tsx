import { StatCard } from "@/components/dashboard/stat-card";
import { RecentClientsTable } from "@/components/dashboard/recent-clients-table";
import { RecentSalesChart } from "@/components/dashboard/recent-sales-chart";
import { Users, Briefcase, ClipboardCheck, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total de Clientes" 
          value="1,254" 
          icon={Users} 
          description="+20.1% desde el mes pasado"
        />
        <StatCard 
          title="Nuevas Oportunidades" 
          value="82" 
          icon={Briefcase} 
          description="+15% esta semana"
        />
        <StatCard 
          title="Tareas Pendientes" 
          value="31" 
          icon={ClipboardCheck} 
          description="5 vencen hoy"
        />
        <StatCard 
          title="Ingresos del Mes" 
          value="$24,850" 
          icon={DollarSign} 
          description="+8.2% respecto al mes anterior"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentClientsTable />
        </div>
        <div>
          <RecentSalesChart />
        </div>
      </div>
    </div>
  );
}
