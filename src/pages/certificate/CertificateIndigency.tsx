import { forwardRef } from "react";
import HeaderCertificate from "./CertificateHeader";
import { Officials } from "./CertificateOfficials";
import { TRequestCertificate } from "@/types";
import { useGetResidentByIdQuery } from "@/redux/slices/resident.slice";
import { calculateAge, getCurrentDateFormatted } from "@/utils/format.date";

type CertificateIndigencyProps = {
  data: TRequestCertificate;
};

const CertificateIndigency = forwardRef<
  HTMLDivElement,
  CertificateIndigencyProps
>(({ data: request }, ref) => {
  const { data = [] } = useGetResidentByIdQuery(request.profile_id);
  const resident = data ? data[0] : null;

  return (
    <div className="w-screen py-20 px-10" ref={ref}>
      <HeaderCertificate />
      <div className="flex">
        <Officials />
        <div className="w-full p-2.5">
          <h1 className="font-semibold underline text-center mb-5">
            CERTIFICATE OF INDIGENCY
          </h1>
          <p className="text-[14px] mb-5">To Whom It May Concern:</p>
          <div className="mb-10">
            <p className="text-[14px] mb-5">
              This is to testify that{" "}
              <span className="font-bold uppercase">
                {resident?.firstname} {resident?.lastname},{" "}
              </span>
              <span className="font-bold">
                {calculateAge(resident?.date_of_birth || "")} years old,{" "}
              </span>{" "}
              {resident?.civil_status}, is a bonafide resident of{" "}
              {resident?.number_street}, Barangay Malamig, City of Mandaluyong
              {request.purpose === "Financial" ? (
                <>
                  {", "}
                  is known to belong to an{" "}
                  <span className="font-bold italic">
                    indigent family.
                  </span>{" "}
                </>
              ) : (
                <>{"."}</>
              )}
            </p>
            <p className="text-[14px] mb-5">
              This certification is being issued upon the request of above-named
              person for{" "}
              <span className="uppercase font-bold">{request.purpose}</span> and
              can be used for whatever legal intent and purpose it may serve him
              best.
            </p>
            <p className="text-[14px]">
              Issued this of <span>{getCurrentDateFormatted()}</span>, at the
              office of the Punong Barangay, Barangay Malamig, Mandaluyong City,
              Philippines.
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="mb-10 text-[14px]">Respectfully Yours,</p>
            <h1 className="text-[14px] font-medium">
              PRINTED NAME & SIGNATURE
            </h1>
            <p className="text-[14px] font-medium">Barangay Chairman</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CertificateIndigency;
