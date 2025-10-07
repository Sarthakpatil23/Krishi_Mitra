'use client';

import {
  Bell,
  Languages,
  LogOut,
  Search,
  Settings,
  Sidebar,
  User,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { users } from '@/lib/data';

const breadcrumbTitles: { [key: string]: string } = {
  '/forum': 'Community Forum',
  '/chatbot': 'AI Assistant',
  '/resources': 'Learning Resources',
};

export function AppHeader() {
  const pathname = usePathname();
  const currentUser = users[1]; // Mock current user

  const getBreadcrumbTitle = () => {
    const matchedPath = Object.keys(breadcrumbTitles).find(path => pathname.startsWith(path));
    return matchedPath ? breadcrumbTitles[matchedPath] : 'Dashboard';
  };
  
  const isThreadPage = /^\/forum\/post-\d+$/.test(pathname);
  
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="flex items-center gap-2">
         <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/forum">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
              {isThreadPage && (
                <>
                 <BreadcrumbSeparator />
                 <BreadcrumbItem>
                    <BreadcrumbPage>Post Details</BreadcrumbPage>
                 </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="md:hidden text-lg font-semibold font-headline">{getBreadcrumbTitle()}</h1>
      </div>
      
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Languages className="h-4 w-4" />
            <span className="sr-only">Change language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>Español</DropdownMenuItem>
          <DropdownMenuItem>Français</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

       <Button variant="outline" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
       </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full h-8 w-8">
            <Avatar className='h-8 w-8'>
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
    </header>
  );
}
