import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';

import { Persona } from '@/lib/domains/personas/Persona';
// eslint-disable-next-line import/no-unresolved


export default async function Page() {
  const session = await auth();


   // --- Ejemplos de uso de la clase Persona refactorizada ---
      // La creación, actualización y eliminación de una persona ya no requieren
      // pasar manualmente los campos de auditoría (createdBy, createdAt, etc.),
      // ya que son gestionados automáticamente por los servicios del backend.

      // --- Ejemplo de Inserción ---
      const nuevaPersona = new Persona({
        nombreRazonSocial: 'Nueva Persona de Prueba',
        rfc: 'TEST010101XX1',
        tipoPersona: 'fisica',
      });
      const resultadoInsert = await nuevaPersona.insert();
      console.log(resultadoInsert);
      if (!resultadoInsert.success) {
        console.log(resultadoInsert.message);
      }

      // --- Ejemplo de Actualización (depende de una inserción exitosa) ---
      if (resultadoInsert && resultadoInsert.success && resultadoInsert.data.length > 0) {
        const personaAActualizar = new Persona(resultadoInsert.data[0]);
        personaAActualizar.nombreRazonSocial = 'Nombre Actualizado Correctamente';
        const resultadoUpdate = await personaAActualizar.update();
        console.log('Resultado de la actualización:', resultadoUpdate);
      }

      // --- Ejemplo de Eliminación (depende de una inserción exitosa) ---
    
        const personaAEliminar = new Persona(resultadoInsert.data[0]);
        const resultadoDelete = await personaAEliminar.delete();
        console.log('Resultado de la eliminación:', resultadoDelete);

  if (!session || session.user.type === 'guest') {
    redirect('/login');
  }


  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          key={id}
          id={id}
          initialMessages={[]}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialVisibilityType="private"
          isReadonly={false}
          session={session}
          autoResume={false}
        />
        <DataStreamHandler id={id} />
      </>
    );
  }

  return (
    <>
     
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={modelIdFromCookie.value}
        initialVisibilityType="private"
        isReadonly={false}
        session={session}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
