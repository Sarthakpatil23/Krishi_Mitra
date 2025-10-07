'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering farming-related questions.
 *
 * - answerFarmingQuestion - A function that takes a question as input and returns an answer from the AI chatbot.
 * - AnswerFarmingQuestionInput - The input type for the answerFarmingQuestion function.
 * - AnswerFarmingQuestionOutput - The return type for the answerFarmingQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFarmingQuestionInputSchema = z.object({
  question: z.string().describe('The question about farming, crops, weather, or fertilizers.'),
});
export type AnswerFarmingQuestionInput = z.infer<typeof AnswerFarmingQuestionInputSchema>;

const AnswerFarmingQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question provided by the AI chatbot.'),
});
export type AnswerFarmingQuestionOutput = z.infer<typeof AnswerFarmingQuestionOutputSchema>;

export async function answerFarmingQuestion(input: AnswerFarmingQuestionInput): Promise<AnswerFarmingQuestionOutput> {
  return answerFarmingQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerFarmingQuestionPrompt',
  input: {schema: AnswerFarmingQuestionInputSchema},
  output: {schema: AnswerFarmingQuestionOutputSchema},
  prompt: `You are a helpful AI chatbot expert in farming, crops, weather conditions, fertilizers, and best practices.

  Answer the following question to the best of your ability:

  Question: {{{question}}}`,
});

const answerFarmingQuestionFlow = ai.defineFlow(
  {
    name: 'answerFarmingQuestionFlow',
    inputSchema: AnswerFarmingQuestionInputSchema,
    outputSchema: AnswerFarmingQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
