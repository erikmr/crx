'use client';

// import cx from 'classnames';
// import { format, isWithinInterval } from 'date-fns';
import { useEffect, useState } from 'react';
import type { Persona } from '@/lib/db/schema';
import { PersonaForm } from '@/components/personas/persona-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { Persona as PersonaDomain } from '@/lib/domains/personas/Persona';

// function n(num: number): number {
//   return Math.ceil(num);
// }

export function PersonaCard({
  data,
}: {
  data?: any;
}) {
  console.log(data);

  const [isMobile, setIsMobile] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<Persona | undefined>(
    undefined,
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // const personaDomain = new PersonaDomain(data);
    // console.log(personaDomain);
    setSelectedPersona(data?.[0]);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSuccess = () => {
    setSuccessMessage('¡Los datos se guardaron correctamente!');
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Persona</CardTitle>
        <CardDescription>
          Aquí puedes ver y editar los detalles de la persona.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PersonaForm persona={selectedPersona} onSuccess={handleSuccess} />
      </CardContent>
      {successMessage && (
        <CardFooter>
          <p className="text-sm text-green-600">{successMessage}</p>
        </CardFooter>
      )}
    </Card>
  );
}
