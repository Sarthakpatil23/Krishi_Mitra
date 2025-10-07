'use server';

import { summarizeCommunityThreads } from "@/ai/flows/summarize-community-threads";
import { z } from "zod";

const schema = z.object({
    threadContent: z.string(),
});

export async function getSummary(formData: FormData) {
    const validatedFields = schema.safeParse({
        threadContent: formData.get('threadContent'),
    });

    if (!validatedFields.success) {
        return {
            error: "Invalid input.",
        };
    }

    try {
        const result = await summarizeCommunityThreads({ threadContent: validatedFields.data.threadContent });
        return { summary: result.summary };
    } catch (error) {
        return {
            error: "Failed to generate summary. Please try again.",
        };
    }
}
