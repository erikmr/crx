import { PersonasDataTable } from '@/components/personas/data-table';
import { Toaster } from '@/components/ui/toaster';

export default function PersonasPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Gestión de Personas</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Aquí puedes crear, ver, editar y eliminar los registros de las personas.
      </p>
      <PersonasDataTable />
      <Toaster />
    </div>
  );
}
