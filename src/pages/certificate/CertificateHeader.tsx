import barangayLogo from "../../assets/logo.png";
import cityLogo from "../../assets/mandaluyong.png";

const CertificateHeader = () => {
  return (
    <div>
      <div className="absolute w-full flex justify-center items-center mt-32">
        <img
          className="h-[900px] w-[900px] opacity-[0.05]"
          src={barangayLogo}
          alt="logo"
        />
      </div>
      <div className="w-full text-gray-800 z-10">
        <div className="flex justify-center">
          <header className="flex items-center gap-10">
            <img className="w-[100px] h-[100px]" src={cityLogo} alt="logo" />
            <div className="flex flex-col items-center">
              <p className="text-[12px]">Republic of the Philippines</p>
              <h1 className="font-semibold text-[24px]">BARANGAY MALAMIG</h1>
              <p className="text-[10px]">Tel. No. 477-79-55</p>
            </div>
            <img
              className="w-[110px] h-[110px]"
              src={barangayLogo}
              alt="logo"
            />
          </header>
        </div>
        <h1 className="text-center font-bold text-[28px] my-4">
          OFFICE OF THE BARANGAY CAPTAIN
        </h1>
      </div>
    </div>
  );
};
export default CertificateHeader;
