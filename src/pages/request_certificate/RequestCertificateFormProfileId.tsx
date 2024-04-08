import { Input } from "@/components/ui/input";
import { RequestCertificateFormType } from "./RequestCertificateForm";
import { CheckCheck, X } from "lucide-react";
import { useEffect } from "react";
import { useGetResidentByIdQuery } from "@/redux/slices/resident.slice";

type InfoPropTypes = RequestCertificateFormType;

const RequestCertificateFormProfileId = ({
  info,
  handleInputChange,
  idExists,
  setIdExists,
}: InfoPropTypes) => {
  const { data: resident, isLoading } = useGetResidentByIdQuery(
    info.profile_id ? info.profile_id : undefined
  );
  const residentInfo = resident ? resident[0] : null;

  // id exists?
  useEffect(() => {
    if (!residentInfo?.profile_id) {
      setIdExists && setIdExists(false);
    } else {
      setIdExists && setIdExists(true);
    }
  }, [info.profile_id, resident, residentInfo?.profile_id, setIdExists]);

  return (
    <>
      <div className="grid w-full items-center gap-1.5">
        <label>Profile ID</label>
        {info.profile_id && info.profile_id.length === 12
          ? isLoading
            ? "loading..."
            : !idExists && (
                <p className="p-2 mb-2 bg-red-500 text-gray-50 rounded text-center">
                  Profile id do not exist
                </p>
              )
          : null}
        <div className="relative">
          <Input
            placeholder="Enter profile ID"
            type="text"
            maxLength={12}
            name="profile_id"
            value={info.profile_id}
            onChange={handleInputChange}
          />
          {info.profile_id && info.profile_id.length === 12 ? (
            isLoading ? (
              <p>loading...</p>
            ) : (
              <div className="absolute top-0 right-4 h-full">
                {idExists ? (
                  <CheckCheck size={20} color="blue" className="h-full" />
                ) : (
                  <X size={20} color="red" className="h-full" />
                )}
              </div>
            )
          ) : null}
        </div>
      </div>
    </>
  );
};
export default RequestCertificateFormProfileId;
