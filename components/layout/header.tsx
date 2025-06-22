"use client";

import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Bell, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Helper function to get the page title from the pathname
function getTitleFromPathname(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard';
  const parts = pathname.split('/').filter(Boolean);
  const lastPart = parts[parts.length - 1];
  return lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, ' ');
}

export function Header() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="w-full rounded-lg bg-background pl-8"
            aria-label="Buscar"
          />
        </div>
        <Button variant="ghost" size="icon" aria-label="Notificaciones">
          <Bell className="size-5" />
          <Badge className="absolute right-1 top-1 size-2 justify-center p-0" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="size-9 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Ajustes</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
