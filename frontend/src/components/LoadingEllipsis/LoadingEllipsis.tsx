import { CSSProperties } from "react";
import cl from "./LoadingEllipsis.module.css";

const LoadingEllipsis = () => {
  const color = "rgb(5 65 240)";
  return (
    <div
      className={cl.ldsEllipsis}
      style={
        {
          "--color": color,
        } as CSSProperties
      }
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default LoadingEllipsis;
