'use client';

import {
  Bot,
  Library,
  LogOut,
  MessagesSquare,
  Settings,
  User,
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
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { AgriConnectLogo } from './icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { users } from '@/lib/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function AppSidebar() {
  const pathname = usePathname();
  const currentUser = users[1]; // Mock current user

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <AgriConnectLogo className="size-8 text-primary" />
          <span className="text-xl font-semibold font-headline text-primary-foreground">
            AgriConnect
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/forum')}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-left h-auto px-2 py-1.5">
              <div className="flex items-center gap-3 w-full">
                <Avatar className="size-8">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm overflow-hidden">
                  <span className="font-semibold truncate">{currentUser.name}</span>
                  <span className="text-muted-foreground -mt-0.5 text-xs">{currentUser.role}</span>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-56 mb-2">
            <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
