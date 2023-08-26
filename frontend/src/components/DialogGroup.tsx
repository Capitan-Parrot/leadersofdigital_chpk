import React, { useState } from "react";
import { MessageItem } from "../models";
import { Checkmark } from "./Checkmark";
import LoadingSvg from "../assets/loading.svg";
import MapSvg from "../assets/map.svg";
import AttachmentSvg from "../assets/attachment.svg";
import { observer } from "mobx-react-lite";
import ChevronDownSvg from "../assets/chevron-down.svg";

interface MessageGroupProps {
  item: MessageItem;
}

export const DialogGroup: React.FC<MessageGroupProps> = observer(({ item }) => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const openOnMap = (address: string) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${address}`,
      "_blank"
    );
  };

  const content = {
    pending: (
      <div className="flex items-center justify-center gap-3 py-4 mt-1">
        <LoadingSvg className="animate-spin" />
        Анализирую, подождите
      </div>
    ),
    success:
      item.kind === "text" ? (
        <div className="flex mt-6 flex-col">
          <div className="flex flex-col text-center">
            <p className="text-text-primary/60">корректный адрес</p>
            <h2 className="text-2xl font-medium">
              {item.output?.[0]?.target_address}
            </h2>
            <button
              disabled={!item.output?.[0]?.target_address}
              className="hover:brightness-125 flex items-center bg-primary rounded-xl px-4 py-2 w-fit text-white mx-auto mt-4 gap-2 font-bold"
              onClick={() => openOnMap(item.output![0]!.target_address)}
            >
              <MapSvg />
              Показать на карте
            </button>
          </div>
          <div className="flex flex-col mt-6">
            <div
              className="flex items-center text-text-primary/60 hover:text-text-primary/80 justify-between cursor-pointer gap-1"
              onClick={() => setDetailsExpanded(!detailsExpanded)}
            >
              <p>Показать возможные адреса</p>
              <ChevronDownSvg
                className="transition-transform duration-300"
                style={{
                  transform: detailsExpanded
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
                width="28"
                height="28"
              />
            </div>
            {detailsExpanded && (
              <div className="flex flex-col mt-1">
                <div className="flex justify-between font-medium">
                  <p className="text-text-primary/60">Адрес</p>
                  <p className="text-text-primary/60">Score</p>
                </div>
                {item.output?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-text-primary"
                  >
                    <p>{item.target_address}</p>
                    <span className="bg-text-primary/20 h-[1px] min-w-[60px] flex-1" />
                    <p className="text-primary font-medium">
                      {item.score.toFixed(3)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center my-4">Файл загружен!</p>
      ),
    error: <p>Произошла ошибка :(</p>,
  };

  const heading = (
    <div className="flex items-center text-text-primary text-base">
      <div className="flex items-center">
        <span className="text-xl">🤖</span>
        <span className="text-primary font-medium ml-2">ИИ</span>
        дентификатор
      </div>
      {item.status === "success" && item.kind === "text" && (
        <div className="flex items-center ml-auto gap-2 text-sm appear">
          <p className="text-text-primary/60">
            best_score: <b>{item.bestScore.toFixed(3)}</b>
          </p>
          <Checkmark size={24} />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col mt-12 gap-3 px-0.5">
      <div className="bg-primary flex gap-2 items-center text-white rounded-xl rounded-br-none py-3 px-4 text-lg w-fit ml-auto">
        {item.kind === "file" && <AttachmentSvg className="w-5 h-5" />}
        {item.input}
      </div>
      <div className="flex flex-col shadow-md min-w-[400px] max-w-[800px] bg-white rounded-xl rounded-tl-none p-4 w-fit">
        {heading}
        <span className="h-[1px] bg-text-primary/10 my-2" />
        {content[item.status]}
      </div>
    </div>
  );
});
