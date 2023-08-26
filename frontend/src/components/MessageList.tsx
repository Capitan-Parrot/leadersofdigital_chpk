import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import MessagesStore from "../stores/MessagesStore";
import { Checkmark } from "./Checkmark";
import LoadingEllipsis from "./LoadingEllipsis/LoadingEllipsis";

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
  }, []);

  return (
    <div className="overflow-scroll mt-auto mb-8">
      {vm.items.map((item) => (
        <div key={item.id} className="flex flex-col mt-6 gap-3 px-3">
          <div className="bg-primary text-white  rounded-xl rounded-br-none py-3 px-4 text-lg w-fit ml-auto">
            {item.input}
          </div>
          <div className="flex flex-col min-w-[400px] bg-white rounded-xl rounded-tl-none p-4 w-fit">
            <div className="flex items-center text-text-primary text-base">
              <div className="flex items-center">
                <span className="text-xl">🤖</span>
                <span className="text-primary font-medium ml-2">ИИ</span>
                дентификатор
              </div>
              {item.status === "success" && (
                <div className="flex items-center ml-auto gap-2 text-sm">
                  <p className="text-text-primary/60">
                    avg_score: {item.avgScore}
                  </p>
                  <Checkmark size={24} />
                </div>
              )}
            </div>
            <span className="h-[1px] bg-text-primary/10 my-2" />
            {item.status === "pending" ? (
              <p>pending</p>
            ) : (
              <div className="">
                <LoadingEllipsis />
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomEl} />
    </div>
  );
});
