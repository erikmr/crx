'use client';

// import cx from 'classnames';
// import { format, isWithinInterval } from 'date-fns';
import { useEffect, useState } from 'react';
import type { Persona } from '@/lib/db/schema';
import { PersonaForm } from '@/components/personas/persona-form';
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

  useEffect(() => {
    // const personaDomain = new PersonaDomain(data);
    // console.log(personaDomain);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <PersonaForm persona={data} onSuccess={() => {}} />
    </div>
  );
}
