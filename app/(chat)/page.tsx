import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';

// eslint-disable-next-line import/no-unresolved
// import { Insert } from '@/domain/personas/services/Insert';
import { Persona } from '@/domain/personas/Persona';

export default async function Page() {
  const session = await auth();
  console.log('🚀 ~ Page ~ session:', session);

  if (!session || session.user.type === 'guest') {
    // redirect('/api/auth/guest');
    redirect('/login');
  }

  const persona = new Persona({
    nombreRazonSocial: 'Persona 1',
    rfc: 'MARE691225MM5',
    tipoPersona: 'fisica',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    createdBy: 'f89216e4-b52c-40cb-be11-7e8c2c9d9352',
    updatedBy: null,
    deletedBy: null,
  });

  const hresult = await persona.insert();
  console.log('🚀 ~ Page ~ hresult:', hresult);

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
