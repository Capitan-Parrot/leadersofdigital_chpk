export type TextPredictionResponse = {
  target_building_id: number;
  target_address: string;
  score: number;
};

export type TextResult = TextPredictionResponse[];

export type MessageOutput =
  | {
      kind: "text";
      output: TextResult | null;
    }
  | {
      kind: "file";
    };

export type MessageItem = {
  id: number;
  status: "pending" | "error" | "success";
  bestScore: number;
  input: string;
} & MessageOutput;
