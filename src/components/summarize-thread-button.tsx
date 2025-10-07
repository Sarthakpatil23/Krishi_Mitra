'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { getSummary } from '@/app/(app)/forum/[threadId]/actions';
import { Skeleton } from './ui/skeleton';

type SummarizeThreadButtonProps = {
  threadContent: string;
};

export function SummarizeThreadButton({ threadContent }: SummarizeThreadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    setIsOpen(true);
    setIsLoading(true);
    setError(null);
    setSummary(null);

    const formData = new FormData();
    formData.append('threadContent', threadContent);

    const result = await getSummary(formData);
    
    if (result.error) {
        setError(result.error);
    } else if (result.summary) {
        setSummary(result.summary);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button size="sm" variant="outline" onClick={handleSummarize} disabled={isLoading}>
        <Sparkles className="mr-2 h-4 w-4" />
        {isLoading ? 'Summarizing...' : 'Summarize with AI'}
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>AI Thread Summary</AlertDialogTitle>
            <AlertDialogDescription>
              {isLoading && (
                 <div className="space-y-2 pt-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                 </div>
              )}
              {error && <p className="text-destructive">{error}</p>}
              {summary}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsOpen(false)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
