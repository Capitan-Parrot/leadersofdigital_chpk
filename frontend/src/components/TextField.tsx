import React, { useState } from "react";
import SendSvg from "../assets/send.svg";
import UploadSvg from "../assets/upload.svg";

interface TextFieldProps {
  onSubmit: (text: string | File) => void;
  disabled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = (p) => {
  const [value, setValue] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // check if csv
    if (file?.type !== "text/csv") {
      alert("Неверный формат файла");
      return;
    }

    p.onSubmit(file);
  };

  return (
    <form
      className={`flex w-full relative ${p.disabled ? "opacity-50" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (p.disabled || !value) return;
        p.onSubmit(value);
        setValue("");
      }}
    >
      <button
        type="button"
        className="h-full p-2 bg-white rounded-2xl mr-2 border-border-main border-[1px]"
        onClick={() => fileInputRef.current?.click()}
        disabled={p.disabled}
      >
        <UploadSvg className="w-10 h-10" />
      </button>
      {/* file upload */}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept=".csv"
        onChange={onFileChange}
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        placeholder="невский п. 21, 2 подъезд 3"
        className="flex-1 px-4 py-4 outline-none rounded-2xl bg-white border-border-main border-[1px] focus:border-primary/50 transition-all"
        disabled={p.disabled}
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-3"
        disabled={p.disabled}
      >
        <SendSvg className="w-8 h-8" />
      </button>
    </form>
  );
};
