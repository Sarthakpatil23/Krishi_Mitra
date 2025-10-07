import Image from 'next/image';
import Link from 'next/link';
import { resources } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ResourcesPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Learning Resources</h1>
        <p className="text-muted-foreground">
          Curated articles, videos, and tutorials to help you grow.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={resource.imageUrl}
                  alt={resource.title}
                  data-ai-hint={resource.imageHint}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-1">
              <Badge variant="secondary" className="mb-2">{resource.type}</Badge>
              <h3 className="font-headline text-lg font-semibold mb-2">
                {resource.title}
              </h3>
              <CardDescription className="text-sm line-clamp-3">
                {resource.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href={resource.url}>
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
