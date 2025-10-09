import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {AgriConnectLogo} from '@/components/icons';
import {ArrowRight, Bot, Library, MessagesSquare} from 'lucide-react';
import Image from 'next/image';
import {getLoginBackgroundImage} from '@/lib/data';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function LandingPage() {
  const heroImage = getLoginBackgroundImage();

  const features = [
    {
      icon: <MessagesSquare className="size-8 text-primary" />,
      title: 'Community Forum',
      description:
        'Connect with fellow farmers and experts. Ask questions, share knowledge, and grow together.',
    },
    {
      icon: <Bot className="size-8 text-primary" />,
      title: 'AI Assistant',
      description:
        'Get instant answers to your farming questions about crops, weather, and best practices from our AI chatbot.',
    },
    {
      icon: <Library className="size-8 text-primary" />,
      title: 'Learning Resources',
      description:
        'Access a curated library of articles, videos, and tutorials to expand your agricultural knowledge.',
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-transparent absolute top-0 left-0 right-0 z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <AgriConnectLogo className="size-8 text-white" />
           <span className="ml-2 text-xl font-bold font-headline text-white">AgriConnect</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white" asChild>
            <Link href="/login" prefetch={false}>
              Login
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/login" prefetch={false}>
              Sign Up
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0 -z-10">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.imageHint}
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>
          <div className="container px-4 md:px-6 text-center text-white">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none font-headline shadow-lg">
                Cultivating Knowledge, Growing Community
              </h1>
              <p className="mx-auto max-w-[600px] text-white/90 md:text-xl shadow-sm">
                AgriConnect is your digital field assistant, connecting you with expert advice, a vibrant community, and essential resources.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row justify-center">
              <Button size="lg" asChild>
                <Link href="/login" prefetch={false}>
                  Get Started for Free
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Everything a Modern Farmer Needs
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From intelligent chatbots to community forums, we provide the tools to help you succeed in today's agricultural landscape.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300 border-border/80">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        {feature.icon}
                    </div>
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card text-card-foreground">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AgriConnect. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6 text-xs">
          <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
