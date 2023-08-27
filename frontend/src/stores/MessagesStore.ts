import { makeAutoObservable } from "mobx";
import { MessageItem, TextResult } from "../models";

const API_URL = import.meta.env.VITE_API_URL;

class MessagesStore {
  public isLoading: boolean = false;
  public items: MessageItem[] = [];

  constructor() {
    makeAutoObservable(this);
    const localStorageItems = localStorage.getItem("messages");

    if (localStorageItems) {
      this.items = JSON.parse(localStorageItems);
    }
  }

  public async sendMessage(message: string) {
    this.isLoading = true;

    const itemId = Date.now();
    this.items.push({
      id: itemId,
      status: "pending",
      kind: "text",
      input: message,
      bestScore: 0,
      output: null,
    });

    try {
      const response = await fetch(API_URL + `oneAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        mode: "cors",
        body: JSON.stringify({ address: message }),
      });

      const data = (await response.json()) as TextResult;

      const item = this.items.find((item) => item.id === itemId);
      if (item && item.kind === "text") {
        item.status = "success";
        item.output = data;
        item.bestScore = data[0].score;
      }

      localStorage.setItem("messages", JSON.stringify(this.items));
    } catch (error) {
      const item = this.items.find((item) => item.id === itemId);
      if (item && item.kind === "text") {
        item.status = "error";
      }
    }

    this.isLoading = false;
  }

  public async sendAttachment(file: File) {
    this.isLoading = true;
    const itemId = Date.now();

    this.items.push({
      id: itemId,
      status: "pending",
      kind: "file",
      input: file.name,
      bestScore: 0,
    } as MessageItem);

    const item = this.items.find((item) => item.id === itemId);
    if (!item || item.kind !== "file") return;

    const formData = new FormData();
    formData.append("address_file", file);

    try {
      const response = await fetch(API_URL + `file`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        item.status = "error";
        return;
      }

      const blob = await response.blob();

      // Assuming the response is a CSV file
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `result_${file.name}`;
      link.click();

      URL.revokeObjectURL(downloadUrl);

      item.status = "success";

      localStorage.setItem("messages", JSON.stringify(this.items));
    } catch {
      const item = this.items.find((item) => item.id === itemId);
      if (item && item.kind === "file") {
        item.status = "error";
      }
    }

    this.isLoading = false;
  }
}

export default new MessagesStore();
