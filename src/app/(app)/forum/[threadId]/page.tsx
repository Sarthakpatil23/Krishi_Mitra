import { notFound } from 'next/navigation';
import { Clock, ThumbsUp, User } from 'lucide-react';
import Link from 'next/link';
import { posts, users } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SummarizeThreadButton } from '@/components/summarize-thread-button';

type ThreadPageProps = {
  params: {
    threadId: string;
  };
};

export default function ThreadPage({ params }: ThreadPageProps) {
  const post = posts.find((p) => p.id === params.threadId);
  const currentUser = users[1]; // Mock user

  if (!post) {
    notFound();
  }
  
  const fullThreadContent = [post.content, ...post.replies.map(r => r.content)].join('\n\n');

  return (
    <div className="mx-auto grid max-w-4xl gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-2xl">{post.title}</CardTitle>
            <SummarizeThreadButton threadContent={fullThreadContent} />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="font-medium">{post.author.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.createdAt}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{post.content}</p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>

      <h2 className="text-xl font-bold font-headline">
        {post.replies.length} Replies
      </h2>

      <div className="grid gap-6">
        {post.replies.map((reply) => (
          <Card key={reply.id}>
            <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
               <Avatar className="h-10 w-10">
                <AvatarImage src={reply.author.avatarUrl} alt={reply.author.name} />
                <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                 <div className="flex items-center justify-between">
                    <div>
                        <span className="font-semibold">{reply.author.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">({reply.author.role})</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{reply.createdAt}</span>
                </div>
                <p className="text-sm mt-1">{reply.content}</p>
              </div>
            </CardHeader>
             <CardFooter className="flex justify-end">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{reply.upvotes}</span>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Your Reply</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
             <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Textarea
                    placeholder="Write your answer here..."
                    className="min-h-24"
                />
             </div>
             <div className="flex justify-end">
                 <Button>Post Reply</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
