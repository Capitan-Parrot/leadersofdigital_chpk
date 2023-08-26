import { makeAutoObservable } from "mobx";
import { MessageItem, TextResult } from "../models";

const url = import.meta.env.VITE_API_URL;

class MessagesStore {
  public isLoading: boolean = false;
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
      kind: "file",
      input: "big_data.csv",
      avgScore: 0.5,
    },
  ];

  constructor() {
    makeAutoObservable(this);
    const localStorageItems = localStorage.getItem("messages");

    if (localStorageItems) {
      this.items = JSON.parse(localStorageItems);
    }
  }

  public async sendMessage(message: string) {
    const item: MessageItem = {
      id: this.items.length + 1,
      status: "pending",
      kind: "text",
      input: message,
      avgScore: 0.5,
      output: null,
    };
    this.items.push(item);

    try {
      const response = await fetch(url + `oneAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: message }),
      });

      const data = (await response.json()) as TextResult;

      item.status = "success";
      item.output = data;

      localStorage.setItem("messages", JSON.stringify(this.items));
    } catch (error) {
      item.status = "error";
    }
  }

  public async sendAttachment(file: File) {
    this.items.push({
      id: this.items.length + 1,
      status: "pending",
      kind: "file",
      input: file.name,
      avgScore: 0.5,
    });
  }
}

export default new MessagesStore();
