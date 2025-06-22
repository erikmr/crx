import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const clients = [
  { id: 1, name: 'Juan Pérez', company: 'Tech Solutions', status: 'Activo', createdAt: '2024-06-20' },
  { id: 2, name: 'Ana Gómez', company: 'Innovate Corp', status: 'Nuevo', createdAt: '2024-06-19' },
  { id: 3, name: 'Carlos Sánchez', company: 'Marketing Digital', status: 'Contactado', createdAt: '2024-06-19' },
  { id: 4, name: 'Laura Fernández', company: 'Diseño Creativo', status: 'Perdido', createdAt: '2024-06-18' },
  { id: 5, name: 'Miguel Rodríguez', company: 'Consultoría Global', status: 'Activo', createdAt: '2024-06-17' },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  'Activo': 'default',
  'Nuevo': 'secondary',
  'Contactado': 'outline',
  'Perdido': 'destructive',
}

export function RecentClientsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de Creación</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.company}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[client.status] || 'default'}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>{client.createdAt}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Ver</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
