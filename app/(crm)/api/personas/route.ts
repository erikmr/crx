import { NextResponse } from 'next/server';
// eslint-disable-next-line import/no-unresolved
import { Persona } from '@/lib/domains/personas/Persona';

// GET /api/personas - Obtener todas las personas
export async function GET() {
  try {
    const result = await Persona.getList();
    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }
    return NextResponse.json(result.data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: `Error al obtener la lista de personas: ${errorMessage}` },
      { status: 500 },
    );
  }
}

// POST /api/personas - Crear una nueva persona
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nuevaPersona = new Persona(body);
    const result = await nuevaPersona.insert();

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }

    return NextResponse.json(result.data[0], { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: `Error al crear la persona: ${errorMessage}` },
      { status: 500 },
    );
  }
}
