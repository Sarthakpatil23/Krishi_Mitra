'use server';

/**
 * @fileOverview Summarizes community forum threads using AI.
 *
 * - summarizeCommunityThreads - A function that summarizes community forum threads.
 * - SummarizeCommunityThreadsInput - The input type for the summarizeCommunityThreads function.
 * - SummarizeCommunityThreadsOutput - The return type for the summarizeCommunityThreads function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCommunityThreadsInputSchema = z.object({
  threadContent: z
    .string()
    .describe('The complete content of the community forum thread.'),
});
export type SummarizeCommunityThreadsInput = z.infer<
  typeof SummarizeCommunityThreadsInputSchema
>;

const SummarizeCommunityThreadsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the community forum thread.'),
});
export type SummarizeCommunityThreadsOutput = z.infer<
  typeof SummarizeCommunityThreadsOutputSchema
>;

export async function summarizeCommunityThreads(
  input: SummarizeCommunityThreadsInput
): Promise<SummarizeCommunityThreadsOutput> {
  return summarizeCommunityThreadsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCommunityThreadsPrompt',
  input: {schema: SummarizeCommunityThreadsInputSchema},
  output: {schema: SummarizeCommunityThreadsOutputSchema},
  prompt: `You are an AI assistant helping farmers quickly understand community forum threads.

  Summarize the following thread content into a concise and informative summary:

  Thread Content:
  {{threadContent}}
  `,
});

const summarizeCommunityThreadsFlow = ai.defineFlow(
  {
    name: 'summarizeCommunityThreadsFlow',
    inputSchema: SummarizeCommunityThreadsInputSchema,
    outputSchema: SummarizeCommunityThreadsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
