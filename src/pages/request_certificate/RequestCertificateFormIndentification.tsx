import { Input } from "@/components/ui/input";
import { RequestCertificateFormType } from "./RequestCertificateForm";
import { useGetResidentByIdQuery } from "@/redux/slices/resident.slice";
import { useEffect } from "react";

type InfoPropTypes = RequestCertificateFormType;

const RequestCertificateFormIndentification = ({
  handleImageChange,
  info,
  setRequireImage,
}: InfoPropTypes) => {
  const { data: resident } = useGetResidentByIdQuery(
    info.profile_id ? info.profile_id : undefined
  );
  const residentInfo = resident ? resident[0] : null;

  useEffect(() => {
    if (residentInfo && residentInfo.voter === 1) {
      setRequireImage && setRequireImage(false);
    } else {
      setRequireImage && setRequireImage(true);
    }
  }, [residentInfo, setRequireImage]);

  return (
    <>
      {residentInfo?.voter === 1 ? (
        <div>
          <p className="font-bold italic text-gray-700">
            Your are a registered voter, please continue.
          </p>
        </div>
      ) : (
        <>
          <h1>
            <p className="my-4 font-bold italic">
              To confirm your identity, please provide the following:
            </p>
          </h1>
          <div className="grid w-full items-center gap-1.5 mb-2">
            <label>
              1. A picture of your NBI Clearance or Police clearance
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(event) =>
                handleImageChange && handleImageChange(0, event)
              }
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mb-2">
            <label>
              2. A picture of your Authorization letter or Certificate of
              Residency
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(event) =>
                handleImageChange && handleImageChange(1, event)
              }
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mb-2">
            <label>
              3. A picture of you holding your NBI Clearance or Police Clearance
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(event) =>
                handleImageChange && handleImageChange(2, event)
              }
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mb-2">
            <label>
              4. A picture of you holding your Authorization Letter or
              Certificate of Residency
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(event) =>
                handleImageChange && handleImageChange(3, event)
              }
            />
          </div>
        </>
      )}
    </>
  );
};
export default RequestCertificateFormIndentification;
