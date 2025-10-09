'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering farming-related questions.
 *
 * - answerFarmingQuestion - A function that takes a question and an optional image as input and returns an answer from the AI chatbot.
 * - AnswerFarmingQuestionInput - The input type for the answerFarmingQuestion function.
 * - AnswerFarmingQuestionOutput - The return type for the answerFarmingQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFarmingQuestionInputSchema = z.object({
  question: z.string().describe('The question about farming, crops, weather, or fertilizers.'),
  imageDataUri: z
    .string()
    .optional()
    .describe(
      "An optional image of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
    language: z.string().optional().describe('The language for the AI to respond in (e.g., "en", "hi", "bn").'),
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

  Your response must be in the language specified: {{{language}}}.

  Answer the following question to the best of your ability.
  {{#if imageDataUri}}
  Use the provided image as the primary context for your answer.
  Image: {{media url=imageDataUri}}
  {{/if}}

  Question: {{{question}}}
  `,
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
