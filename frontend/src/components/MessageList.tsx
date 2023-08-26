import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import MessagesStore from "../stores/MessagesStore";
import { DialogGroup } from "./DialogGroup";
import ChevronSvg from "../assets/chevron.svg";

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
    <div className="overflow-y-auto mt-auto pb-8">
      {vm.items.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[500px]">
          <h1 className="text-2xl text-center font-medium text-text-primary/60">
            Введите адрес в поле ниже
            <br />
            для начала анализа
          </h1>
          <ChevronSvg />
        </div>
      )}
      {vm.items.map((item) => (
        <DialogGroup key={item.id} item={item} />
      ))}
      <div ref={bottomEl} />
    </div>
  );
});
