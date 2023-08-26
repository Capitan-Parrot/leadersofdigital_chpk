import LogoSvg from "../assets/logo.svg";

export const Heading = () => {
  return (
    <nav className="px-6 max-w-6xl mx-auto w-full flex justify-between items-center h-fit">
      <LogoSvg height="36" width="auto" />
      <p className="text-lg">Корректировка адресов Санкт-Петербурга</p>
    </nav>
  );
};
