import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AgriConnectLogo } from '@/components/icons';
import { getLoginBackgroundImage } from '@/lib/data';

export default function LoginPage() {
  const bgImage = getLoginBackgroundImage();
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4">
        <div className="mx-auto grid w-[380px] gap-8">
          <div className="grid gap-4 text-center">
             <Link href="/" className="mx-auto">
                <AgriConnectLogo className="size-12 text-primary" />
             </Link>
            <h1 className="text-3xl font-bold font-headline">Welcome Back</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>
          <Card>
            <CardContent className="p-6 grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                    >
                    Forgot your password?
                    </Link>
                </div>
                <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" asChild>
                    <Link href="/forum">Login</Link>
                </Button>
                <Button variant="outline" className="w-full">
                Login with Google
                </Button>
            </CardContent>
          </Card>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.imageHint}
          data-ai-hint={bgImage.imageHint}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/20" />
      </div>
    </div>
  );
}
