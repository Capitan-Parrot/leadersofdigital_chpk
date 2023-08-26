export type PredictionResponse = {
  target_building_id: number;
  target_address: string;
  score: number;
}[];

export type TextResult = PredictionResponse[];
export type FileResult = PredictionResponse[][];

export type MessageOutput =
  | {
      kind: "text";
      output: TextResult | null;
    }
  | {
      kind: "file";
      output: FileResult | null;
    };

export type MessageItem = {
  id: number;
  status: "pending" | "error" | "success";
  avgScore: number;
  input: string;
} & MessageOutput;
