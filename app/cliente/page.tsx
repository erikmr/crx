// import { ClienteDrizzleRepository } from '@/modules/clientes/infrastructure/repositories/ClienteDrizzleRepository';
// import { RegistrarCliente } from '@/modules/clientes/use-cases/RegistrarCliente';
// export default async function Page() {
//   console.log('🚀 ~ Page ~ cliente:');

//   const clienteRepository = new ClienteDrizzleRepository();
//   const registrarCliente = new RegistrarCliente(clienteRepository);

//   clienteRepository.guardar({
//     id: '1',
//     nombre: 'Cliente 1',
//     email: 'cliente1@example.com',
//     telefono: '123456789',
//     activo: true,
//   });

//   registrarCliente.ejecutar({
//     id: '1',
//     nombre: 'Cliente 1',
//     email: 'cliente1@example.com',
//     telefono: '123456789',
//     activo: true,
//   });

//   return (
//     <>
//       <div className="flex flex-col gap-4 w-full justify-center items-center h-[calc(100dvh-60px)]">
//         Cliente
//       </div>
//     </>
//   );
// }
