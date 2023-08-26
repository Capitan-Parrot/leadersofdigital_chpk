import { makeAutoObservable } from "mobx";
import { MessageItem } from "../models";

class MessagesStore {
  public items: MessageItem[] = [
    {
      id: 1,
      status: "success",
      kind: "text",
      input: "Hello",
      avgScore: 0.5,
      output: [
        {
          target_building_id: 1,
          target_address: "Невский проспект дом 21",
          score: 0.5,
        },
        {
          target_building_id: 2,
          target_address: "Невский проспект дом 21",
          score: 0.5,
        },
      ],
    },
    {
      id: 2,
      status: "pending",
      kind: "text",
      input: "Hello",
      avgScore: 0.5,
      output: [
        {
          target_building_id: 1,
          target_address: "Невский проспект дом 21",
          score: 0.5,
        },
        {
          target_building_id: 2,
          target_address: "Невский проспект дом 21",
          score: 0.5,
        },
      ],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

export default new MessagesStore();
