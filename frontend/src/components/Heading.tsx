import LogoSvg from "../assets/logo.svg";

export const Heading = () => {
  return (
    <nav className="px-2 md:px-6 max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center h-fit">
      <LogoSvg height="36" width="318" />
      <p className="text-lg">Корректировка адресов Санкт-Петербурга</p>
    </nav>
  );
};
