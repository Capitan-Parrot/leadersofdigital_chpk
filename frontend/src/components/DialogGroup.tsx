import React from "react";
import { MessageItem } from "../models";
import { Checkmark } from "./Checkmark";
import LoadingSvg from "../assets/loading.svg";
import MapSvg from "../assets/map.svg";

interface MessageGroupProps {
  item: MessageItem;
}

export const DialogGroup: React.FC<MessageGroupProps> = ({ item }) => {
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
        <div className="flex py-6 mt-1 flex-col">
          <div className="flex flex-col text-center">
            <p className="text-text-primary/60">корректный адрес</p>
            <h2 className="text-2xl font-medium">
              {item.output?.[0]?.target_address}
            </h2>
            <button
              disabled={!item.output?.[0]?.target_address}
              className="flex items-center bg-primary rounded-xl px-4 py-2 w-fit text-white mx-auto mt-4 gap-2 font-bold"
              onClick={() => openOnMap(item.output![0]!.target_address)}
            >
              <MapSvg />
              Показать на карте
            </button>
          </div>
        </div>
      ) : (
        <p>Файл загружен</p>
      ),
    error: <p>Произошла ошибка :(</p>,
  };

  return (
    <div className="flex flex-col mt-12 gap-3">
      <div className="bg-primary text-white  rounded-xl rounded-br-none py-3 px-4 text-lg w-fit ml-auto">
        {item.input}
      </div>
      <div className="flex flex-col shadow-md min-w-[400px] max-w-[800px] bg-white rounded-xl rounded-tl-none p-4 w-fit">
        <div className="flex items-center text-text-primary text-base">
          <div className="flex items-center">
            <span className="text-xl">🤖</span>
            <span className="text-primary font-medium ml-2">ИИ</span>
            дентификатор
          </div>
          {item.status === "success" && (
            <div className="flex items-center ml-auto gap-2 text-sm">
              <p className="text-text-primary/60">avg_score: {item.avgScore}</p>
              <Checkmark size={24} />
            </div>
          )}
        </div>
        <span className="h-[1px] bg-text-primary/10 my-2" />
        {content[item.status]}
      </div>
    </div>
  );
};
