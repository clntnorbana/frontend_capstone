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
              This is to certify that{" "}
              <span className="uppercase font-meium">{`${data[0]?.firstname} ${data[0]?.middlename} ${data[0]?.lastname}`}</span>
              ,{" "}
              <span className="font-medium">
                {calculateAge(data[0]?.date_of_birth || "")},
              </span>
              is temporarily residing at{" "}
              <span className="uppercase font-medium">{`${data[0]?.number_street}, ${data[0]?.barangay}, ${data[0]?.city}`}</span>{" "}
              is known to me belong to an{" "}
              <span className="italic font-medium">indigent family.</span>
            </p>
            <p className="text-[14px] mb-5">
              This certification is being issued upon the request of{" "}
              <span className="uppercase font-medium">{`${data[0]?.firstname} ${data[0]?.middlename} ${data[0]?.lastname}`}</span>{" "}
              for{" "}
              <span className="uppercase font-semibold">
                {request?.purpose}
              </span>{" "}
              and can be used for whatever legal intent and purpose it may
              serve.
            </p>
            <p className="text-[14px]">
              Issued this on{" "}
              <span className="font-medium uppercase">
                {getCurrentDateFormatted()}
              </span>
              , Barangay Malamig City of Mandaluyong.
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
