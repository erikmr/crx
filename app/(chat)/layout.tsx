import { cookies } from 'next/headers';

// import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '../(auth)/auth';
import Script from 'next/script';
import { AppSidebar2 } from '@/components/layout/sidebar';
// import { Header } from '@/components/layout/header';
// import { ChatHeader } from '@/components/chat-header';
export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      {/* 
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar user={session?.user} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider> 
      */}
      <SidebarProvider className="flex flex-col">
        <div className="flex h-screen overflow-hidden bg-background">
          <AppSidebar2 />
          {/* <ChatHeader /> */}
          <main className="flex-1 overflow-y-auto overflow-hidden">
            {/* <AppSidebar user={session?.user} /> */}
            <SidebarInset>{children}</SidebarInset>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
