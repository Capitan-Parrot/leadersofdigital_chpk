import cl from "./styles.module.css";

export const Checkmark = ({
  size = 32,
  color = "#7ac142",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <svg
      style={
        {
          minWidth: size,
          minHeight: size,
          maxWidth: size,
          maxHeight: size,
          "--color": color,
        } as React.CSSProperties
      }
      className={cl.checkmark}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle
        className={cl.checkmarkCircle}
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className={cl.checkmarkCheck}
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  );
};
