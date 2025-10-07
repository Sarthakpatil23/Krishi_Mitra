import {
  File,
  ListFilter,
  MessageSquare,
  PlusCircle,
  Search,
  Tag,
  User,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { posts } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function ForumPage() {
  return (
    <div className="grid flex-1 items-start gap-4">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pests">Pest Control</TabsTrigger>
            <TabsTrigger value="soil">Soil Health</TabsTrigger>
            <TabsTrigger value="irrigation" className="hidden sm:flex">
              Irrigation
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Newest
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Most Replies</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Unanswered</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                New Post
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <div className="grid gap-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint={post.author.imageHint} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="font-headline text-lg mb-1">
                        <Link href={`/forum/${post.id}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{post.author.name}</span>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.content}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.replies.length} Replies</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
