import { Square } from "lucide-react";
import { Input } from "./ui/input";
import { forwardRef } from "react";
import { TypeRequestCertificate } from "@/redux/slices/certificate.slice";
import { TypeResident } from "@/redux/slices/resident.slice";
import { calculateAge, formatDate } from "@/utils/format.date";

interface ProfileFormProps {
  residentData: TypeResident | undefined;
  requestData: TypeRequestCertificate;
}

// eslint-disable-next-line no-empty-pattern
const ProfileForm = forwardRef<HTMLDivElement, ProfileFormProps>(
  ({ residentData, requestData }, ref) => {
    const resident = residentData && residentData[0];
    const request = requestData && requestData[0];

    return (
      <div ref={ref} className="p-16">
        <div className="absolute top-[2%]">
          <p className="text-[12px]">
            Transaction ID - {request.transaction_id}
          </p>
          <p className="text-[12px]">Profile ID - {request.profile_id}</p>
        </div>
        <header>
          <h1 className="uppercase font-bold text-3xl text-center">
            Barangay Malamig
          </h1>
          <p className="uppercase font-bold text-center">profile form</p>
        </header>
        <div className="mb-1 text-[12px]">
          <p className="uppercase font-bold">name</p>
          <div className="grid grid-cols-3 w-full gap-2">
            <div className="grid w-full items-center">
              <Input
                className="capitalize border-gray-800 h-[20px] rounded-none uppercase"
                type="text"
                value={resident?.lastname || ""}
                readOnly
              />
              <label className="uppercase text-center font-bold">
                last name
              </label>
            </div>
            <div className="grid w-full items-center">
              <Input
                className="capitalize border-gray-800 h-[20px] rounded-none uppercase"
                type="text"
                value={resident?.firstname || ""}
                readOnly
              />
              <label className="uppercase text-center font-bold">
                first name
              </label>
            </div>
            <div className="grid w-full items-center">
              <Input
                className="capitalize border-gray-800 h-[20px] rounded-none uppercase"
                type="text"
                value={resident?.middlename}
                readOnly
              />
              <label className="uppercase text-center font-bold">
                middle name
              </label>
            </div>
          </div>
        </div>
        <div className="mb-1 text-[12px]">
          <p className="uppercase font-bold">mailing address</p>
          <div className="grid grid-cols-3 w-full gap-2">
            <div className="grid w-full items-center">
              <Input
                className="capitalize border-gray-800 h-[20px] rounded-none uppercase"
                type="text"
                value={resident?.number_street || ""}
                readOnly
              />
              <label className="uppercase text-center font-bold">
                number/street
              </label>
            </div>
            <div className="grid w-full items-center">
              <Input
                className="capitalize border-gray-800 h-[20px] rounded-none uppercase"
                type="text"
                value={resident?.barangay || ""}
                readOnly
              />
              <label className="uppercase text-center font-bold">
                barangay
              </label>
            </div>
            <div className="grid w-full items-center">
              <Input
                className="uppercase border-gray-800 h-[20px] rounded-none"
                type="text"
                value={"mandaluyong city"}
                readOnly
              />
              <label className="uppercase text-center font-bold">city</label>
            </div>
          </div>
        </div>
        <div className="mb-1 text-[12px]">
          <div className="flex justify-center space-x-5">
            <div className="flex gap-1 items-center">
              <p className="uppercase font-bold">religion</p>
              <Input
                className="capitalize border-gray-800 h-[20px] rounded-none uppercase"
                type="text"
                value={resident?.religion || ""}
                readOnly
              />
            </div>
            <div className="flex gap-1 items-center">
              <p className="uppercase w-[110px] font-bold">zip code</p>
              <Input
                className="capitalize border-gray-800 h-[20px] rounded-none"
                type="text"
                value={"1550"}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* box container */}
        <div className="grid grid-cols-5 border border-gray-800 mt-5 text-[12px]">
          {/* box */}
          <div className="flex flex-col">
            <header className="border-b border-gray-800 p-1">
              <p className="uppercase text-center font-bold">sex</p>
            </header>
            <div className="p-2 space-y-1">
              <div className="flex items-center space-x-2">
                <Square
                  size={15}
                  className={`${resident?.sex === "male" ? "bg-black" : ""}`}
                />
                <p className="uppercase">male</p>
              </div>
              <div className="flex items-center space-x-2">
                <Square
                  size={15}
                  className={`${resident?.sex === "female" ? "bg-black" : ""}`}
                />
                <p className="uppercase">female</p>
              </div>
            </div>
          </div>

          {/* box */}
          <div className="flex flex-col border-l border-gray-800 text-[12px]">
            <header className="border-b border-gray-800 p-1">
              <p className="uppercase text-center font-bold">civil status</p>
            </header>
            <div className="p-2 space-y-1">
              <div className="flex items-center space-x-2">
                <Square
                  size={15}
                  className={`${
                    resident?.civil_status === "single" ? "bg-black" : ""
                  }`}
                />
                <p className="uppercase">single</p>
              </div>
              <div className="flex items-center space-x-2">
                <Square
                  size={15}
                  className={`${
                    resident?.civil_status === "married" ? "bg-black" : ""
                  }`}
                />
                <p className="uppercase">married</p>
              </div>
              <div className="flex items-center space-x-2">
                <Square
                  size={15}
                  className={`${
                    resident?.civil_status === "widow/er" ? "bg-black" : ""
                  }`}
                />
                <p className="uppercase">widow/er</p>
              </div>
              <div className="flex items-center space-x-2">
                <Square
                  size={15}
                  className={`${
                    resident?.civil_status === "separated" ? "bg-black" : ""
                  }`}
                />
                <p className="uppercase">separated</p>
              </div>
              <div className="flex items-center space-x-2">
                <Square
                  size={15}
                  className={`${
                    resident?.civil_status === "single parent" ? "bg-black" : ""
                  }`}
                />
                <p className="uppercase">single parent</p>
              </div>
            </div>
          </div>

          {/* box */}
          <div className="flex flex-col border-l border-gray-800 text-[12px]">
            <header className="border-b text-center border-gray-800 p-1 space-y-2">
              <p className="uppercase text-center font-bold">contact number</p>
            </header>
            <div className="p-2 space-y-2">
              <div className="flex flex-col">
                <label className="uppercase">mobile</label>
                <input
                  type="text"
                  className="border-b border-gray-800 h-[15px] uppercase"
                  value={resident?.contact_no || ""}
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="uppercase">email</label>
                <input
                  type="text"
                  className="border-b border-gray-800 h-[15px] text-[9px]"
                  value={resident?.email || ""}
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="uppercase">others</label>
                <input
                  type="text"
                  className="uppercase border-b border-gray-800 h-[15px]"
                />
              </div>
            </div>
          </div>

          {/* box */}
          <div className="flex flex-col border-l border-gray-800 text-[12px] col-span-2">
            <header className="border-b text-center border-gray-800 p-1 space-y-2">
              <p className="uppercase text-center font-bold">company</p>
            </header>
            <div className="p-2 space-y-2">
              <div className="flex space-x-2">
                <div className="flex space-x-1">
                  <Square size={15} />
                  <label className="uppercase">employed</label>
                </div>
                <input
                  type="text"
                  className="uppercase border-b border-gray-800 h-[15px]"
                />
              </div>
              <div className="flex space-x-2">
                <div className="flex space-x-1">
                  <Square size={15} />
                  <label className="uppercase w-[88px]">self employed</label>
                </div>
                <input
                  type="text"
                  className="uppercase border-b border-gray-800 h-[15px]"
                />
              </div>
              <div className="flex space-x-2">
                <div className="flex space-x-1">
                  <Square size={15} />
                  <label className="uppercase">unemployed</label>
                </div>
                <input
                  type="text"
                  className="uppercase border-b border-gray-800 h-[15px]"
                />
              </div>
              <div className="flex space-x-2">
                <div className="flex space-x-1">
                  <Square size={15} />
                  <label className="uppercase">pls. specify</label>
                </div>
                <input
                  type="text"
                  className="uppercase border-b border-gray-800 h-[15px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* section */}
        <div className="mt-3 grid grid-cols-2 px-[15px] space-x-10 mb-5 text-[12px]">
          {/* block */}
          <div>
            <div className="mb-2">
              <div className="grid grid-cols-2">
                <label className="uppercase font-bold">occupation:</label>
                <input
                  type="text"
                  className="border-b border-gray-800 uppercase"
                  value={resident?.occupation || ""}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2">
                <label className="uppercase font-bold">profession:</label>
                <input type="text" className="border-b border-gray-800" />
              </div>
            </div>

            {/* block */}
            <div>
              <div className="grid grid-cols-2">
                <label className="uppercase font-bold">age:</label>
                <input
                  type="text"
                  className="border-b border-gray-800"
                  value={calculateAge(resident?.date_of_birth || "") || ""}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2">
                <label className="uppercase font-bold">birthdate:</label>
                <input
                  type="text"
                  className="border-b border-gray-800"
                  value={formatDate(resident?.date_of_birth || "") || ""}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2">
                <label className="uppercase font-bold">birthplace:</label>
                <input
                  type="text"
                  className="border-b border-gray-800 uppercase"
                  value={resident?.place_of_birth || ""}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2">
                <label className="uppercase font-bold">citizenship:</label>
                <input
                  type="text"
                  className="border-b border-gray-800 uppercase"
                  value={resident?.citizenship || ""}
                  readOnly
                />
              </div>

              <div className="mt-2 flex space-x-5">
                <label className="font-bold uppercase">registered voter:</label>
                <div className="flex items-center space-x-2">
                  <p className="uppercase font-bold">yes</p>
                  <Square
                    className={`${resident?.voter === 1 ? "bg-black" : ""}`}
                    size={15}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <p className="uppercase font-bold">no</p>
                  <Square
                    className={`${resident?.voter === 0 ? "bg-black" : ""}`}
                    size={15}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* block */}
          <div>
            <p className="uppercase font-bold">purpose:</p>
            <div className="flex space-x-2">
              <div className="flex space-x-2">
                <Square
                  className={`${
                    request.certificate_type === "barangay clearance"
                      ? "bg-black"
                      : ""
                  }`}
                  size={15}
                />
                <label className="uppercase font-bold">clearance:</label>
              </div>
              <input
                type="text"
                className="border-b border-gray-800 uppercase w-full text-[9px]"
                value={
                  request.certificate_type === "barangay clearance"
                    ? request.purpose
                    : ""
                }
                readOnly
              />
            </div>
            <div className="flex space-x-2">
              <div className="flex space-x-2">
                <Square
                  className={`${
                    request.certificate_type === "indigency" ? "bg-black" : ""
                  }`}
                  size={15}
                />
                <label className="uppercase font-bold">indigent:</label>
              </div>
              <input
                type="text"
                className="border-b border-gray-800 uppercase w-full"
                value={
                  request.certificate_type === "indigency"
                    ? request.purpose
                    : ""
                }
                readOnly
              />
            </div>
          </div>
        </div>

        {/* section */}
        <div className="mb-5 text-[12px]">
          <div>
            <label className="uppercase font-bold">
              name of spouse/partner
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="grid w-full items-center gap-1.5 mb-2">
                <Input
                  className="border-gray-800 uppercase h-[20px] rounded-none"
                  type="text"
                />
                <label className="font-bold uppercase text-center">
                  last name
                </label>
              </div>
              <div className="grid w-full items-center gap-1.5 mb-2">
                <Input
                  className="border-gray-800 uppercase h-[20px] rounded-none"
                  type="text"
                />
                <label className="font-bold uppercase text-center">
                  first name
                </label>
              </div>
              <div className="grid w-full items-center gap-1.5 mb-2">
                <Input
                  className="border-gray-800 uppercase h-[20px] rounded-none"
                  type="text"
                />
                <label className="font-bold uppercase text-center">
                  middlename name
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <label className="uppercase font-bold w-[400px]">
              date of birth spouse/partner:
            </label>
            <input type="text" className="border-b border-gray-800 w-full" />
          </div>
        </div>

        {/* section */}
        <div className="mt-5 text-[12px]">
          <div>
            <label className="uppercase font-bold">no. of children/s:</label>
            <input type="text" className="border-b border-gray-800" />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div>
              <p className="uppercase font-bold text-center">
                name of children's
              </p>
              <div>
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
              </div>
            </div>
            <div>
              <p className="uppercase font-bold text-center">age</p>
              <div>
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
              </div>
            </div>
            <div>
              <p className="uppercase font-bold text-center">birthday</p>
              <div>
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
                <input
                  type="text"
                  className="border-b border-gray-800 w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 text-[12px]">
          <p className="italic font-bold text-center">
            This is to certify that the information stated above is true and
            correct.
          </p>
        </div>

        <div className="mt-8 flex justify-center items-center flex-col text-[12px]">
          <input
            type="text"
            className="border-b-[2.5px] border-gray-800 w-[400px]"
          />
          <label className="font-bold uppercase">
            printed name and signature
          </label>
        </div>
      </div>
    );
  }
);

export default ProfileForm;
