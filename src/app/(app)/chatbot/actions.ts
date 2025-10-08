'use server';

import { answerFarmingQuestion } from "@/ai/flows/answer-farming-questions";
import { z } from 'zod';

const schema = z.object({
  question: z.string().min(1, { message: 'Question cannot be empty.' }),
  imageDataUri: z.string().optional(),
  language: z.string().optional(),
});

export async function askQuestion(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    question: formData.get('question'),
    imageDataUri: formData.get('imageDataUri'),
    language: formData.get('language'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.question?.[0],
    };
  }

  try {
    const result = await answerFarmingQuestion({
      question: validatedFields.data.question,
      imageDataUri: validatedFields.data.imageDataUri,
      language: validatedFields.data.language,
    });
    return { answer: result.answer };
  } catch (error) {
    return {
      error: 'Something went wrong. Please try again.',
    };
  }
}
