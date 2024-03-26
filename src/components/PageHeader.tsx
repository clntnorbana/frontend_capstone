import logo from "../assets/logo.png";

type PageHeaderProps = {
  title: string;
};

export const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row items-center py-3 border-b md:pt-40 pt-20 justify-center">
      <img
        className="h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] md:h-[130px] md:w-[130px]"
        src={logo}
        alt="logo"
      />
      <div className="leading-10">
        <h1 className="font-bold text-[2rem] lg:text-[3rem] text-gray-700 text-center md:text-left">
          {title}
        </h1>
        <p className="md:text-[12px] text-[10px] font-medium opacity-[0.7] pl-1 text-center md:text-left">
          Barangay Malamig, Mandaluyong City
        </p>
      </div>
    </header>
  );
};
