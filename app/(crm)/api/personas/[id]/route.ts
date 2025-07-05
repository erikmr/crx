import { NextResponse } from 'next/server';
// eslint-disable-next-line import/no-unresolved
import { Persona } from '@/lib/domains/personas/Persona';

interface Params {
  params: { id: string };
}

// GET /api/personas/[id] - Obtener una persona por ID
export async function GET(request: Request, { params }: Params) {
  try {
    const result = await Persona.getById(params.id);
    if (!result.success || result.data.length === 0) {
      return NextResponse.json({ message: 'Persona no encontrada' }, { status: 404 });
    }
    return NextResponse.json(result.data[0]);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: `Error al obtener la persona: ${errorMessage}` },
      { status: 500 },
    );
  }
}

// PUT /api/personas/[id] - Actualizar una persona
export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const personaAActualizar = new Persona({ ...body, id: params.id });
    const result = await personaAActualizar.update();

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }
    if (result.data.length === 0) {
      return NextResponse.json({ message: 'Persona no encontrada para actualizar' }, { status: 404 });
    }

    return NextResponse.json(result.data[0]);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: `Error al actualizar la persona: ${errorMessage}` },
      { status: 500 },
    );
  }
}

// DELETE /api/personas/[id] - Eliminar una persona
export async function DELETE(request: Request, { params }: Params) {
  try {
    const personaAEliminar = new Persona({ id: params.id });
    const result = await personaAEliminar.delete();

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }
    if (result.data.length === 0) {
      return NextResponse.json({ message: 'Persona no encontrada para eliminar' }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: `Error al eliminar la persona: ${errorMessage}` },
      { status: 500 },
    );
  }
}
