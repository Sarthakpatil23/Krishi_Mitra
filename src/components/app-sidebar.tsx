'use client';

import {
  Bot,
  Home,
  Library,
  LogOut,
  MessagesSquare,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { AgriConnectLogo } from './icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { users } from '@/lib/data';

export function AppSidebar() {
  const pathname = usePathname();
  const currentUser = users[1]; // Mock current user

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <AgriConnectLogo className="size-8 text-primary" />
          <span className="text-xl font-semibold font-headline text-primary">
            AgriConnect
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/forum'}
              tooltip="Forum"
            >
              <Link href="/forum">
                <MessagesSquare />
                <span>Forum</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/chatbot'}
              tooltip="AI Assistant"
            >
              <Link href="/chatbot">
                <Bot />
                <span>AI Assistant</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/resources'}
              tooltip="Learning"
            >
              <Link href="/resources">
                <Library />
                <span>Learning Resources</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm overflow-hidden">
            <span className="font-semibold truncate">{currentUser.name}</span>
            <span className="text-muted-foreground -mt-0.5">{currentUser.role}</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto" asChild>
            <Link href="/login">
                <LogOut className="size-4" />
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
