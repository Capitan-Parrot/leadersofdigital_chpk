import { makeAutoObservable } from "mobx";
import { MessageItem } from "../models";

// export type PredictionResponse = {
//   target_building_id: number;
//   target_address: string;
//   score: number;
// }[];

// export type TextResult = PredictionResponse[];
// export type FileResult = PredictionResponse[][];

// export type MessageItem = {
//   id: number;
//   status: "loading" | "error" | "success";
//   input: string;
// } & (
//   | {
//       kind: "text";
//       output: TextResult | null;
//     }
//   | {
//       kind: "file";
//       output: FileResult | null;
//     }
// );

class MessagesStore {
  public items: MessageItem[] = [
    {
      id: 1,
      status: "success",
      kind: "text",
      input: "Hello",
      avgScore: 0.5,
      output: [
        [
          {
            target_building_id: 1,
            target_address: "123",
            score: 0.5,
          },
          {
            target_building_id: 2,
            target_address: "456",
            score: 0.5,
          },
        ],
      ],
    },
    {
      id: 2,
      status: "success",
      kind: "file",
      input: "Hello",
      avgScore: 0.5,
      output: [
        [
          [
            {
              target_building_id: 1,
              target_address: "123",
              score: 0.5,
            },
            {
              target_building_id: 2,
              target_address: "456",
              score: 0.5,
            },
          ],
        ],
      ],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

export default new MessagesStore();
