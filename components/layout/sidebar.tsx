"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  ClipboardCheck, 
  BarChart, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clientes', href: '/personas', icon: Users },
  { name: 'Oportunidades', href: '/dashboard/oportunidades', icon: Briefcase },
  { name: 'Tareas', href: '/dashboard/tareas', icon: ClipboardCheck },
  { name: 'Informes', href: '/dashboard/informes', icon: BarChart },
  { name: 'Configuración', href: '/dashboard/configuracion', icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside 
      className={cn(
        'relative flex h-full flex-col border-r bg-background transition-all',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center justify-between p-4">
        <Link href="/dashboard" className={cn('font-bold', isCollapsed && 'hidden')}>
          CRX 
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <nav className="flex-1 space-y-2 p-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} passHref>
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              aria-label={item.name}
            >
              <item.icon className="mr-2 size-4" />
              {!isCollapsed && <span>{item.name}</span>}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
