// 'use server'; // Server actions are not supported in static export
// import { predictWaitTime as predictWaitTimeFlow } from '@/ai/flows/intelligent-wait-time-prediction';
import type { PredictWaitTimeInput, PredictWaitTimeOutput } from '@/ai/flows/intelligent-wait-time-prediction';

export async function predictWaitTime(input: PredictWaitTimeInput): Promise<{ success: true; data: PredictWaitTimeOutput } | { success: false; error: string }> {
  // Static export mock
  console.log("Mocking AI prediction for static export:", input);
  return {
    success: true,
    data: {
      estimatedWaitTime: 15,
      reasoning: "Estimated based on historical data (Mock for Static Export)"
    }
  }; // Default 15 min wait

  /* 
  // Original Server Action Code
  try {
    const result = await predictWaitTimeFlow(input);
    return { success: true, data: result };
  } catch(error) {
    console.error("AI prediction failed:", error);
    return { success: false, error: "Failed to get an AI prediction."};
  }
  */
}
