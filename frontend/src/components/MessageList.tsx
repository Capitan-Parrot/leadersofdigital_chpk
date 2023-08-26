import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import MessagesStore from "../stores/MessagesStore";
import { DialogGroup } from "./DialogGroup";

export const MessageList = observer(() => {
  const vm = MessagesStore;
  const bottomEl = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (bottomEl.current) {
      bottomEl.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [vm.items.length]);

  return (
    <div className="overflow-scroll mt-auto pb-8">
      {vm.items.map((item) => (
        <DialogGroup key={item.id} item={item} />
      ))}
      <div ref={bottomEl} />
    </div>
  );
});
