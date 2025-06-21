'use client';

import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { usePersonas } from '@/hooks/use-personas';
import { getColumns } from './columns';
import type { Persona } from '@/lib/db/schema';
import { PersonaForm } from './persona-form';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export function PersonasDataTable() {
  const { personas, isLoading, error, mutate } = usePersonas();
  const { toast } = useToast();
  const [sorting, setSorting] = useState<SortingState>([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<Persona | undefined>(
    undefined,
  );

  const handleOpenForm = (persona?: Persona) => {
    setSelectedPersona(persona);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedPersona(undefined);
    mutate(); // Re-valida los datos de SWR
  };

  const handleOpenConfirmDelete = (persona: Persona) => {
    setSelectedPersona(persona);
    setIsConfirmDeleteOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
    setSelectedPersona(undefined);
  };

  const handleDelete = async () => {
    if (!selectedPersona) return;

    try {
      const response = await fetch(`/api/personas/${selectedPersona.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar.');
      }

      toast({
        title: 'Éxito',
        description: 'Persona eliminada correctamente.',
      });
      mutate(); // Re-valida para actualizar la tabla
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
    } finally {
      handleCloseConfirmDelete();
    }
  };

  const columns = getColumns(handleOpenForm, handleOpenConfirmDelete);

  const table = useReactTable({
    data: personas || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos.</div>;

  return (
    <div>
      <div className="flex items-center justify-end py-4">
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenForm()}>Crear Persona</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {selectedPersona ? 'Editar' : 'Crear'} Persona
              </DialogTitle>
            </DialogHeader>
            <PersonaForm persona={selectedPersona} onSuccess={handleCloseForm} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Diálogo de Confirmación para Eliminar */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Se marcará a la persona como
              eliminada (soft delete).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={handleCloseConfirmDelete}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
