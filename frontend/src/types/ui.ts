// UI State Types
interface FeedbackState {
  type: "success" | "error" | null;
  message: string;
}

export type { FeedbackState };
