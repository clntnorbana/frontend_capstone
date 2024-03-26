import { useGetResidentByIdQuery } from "@/redux/slices/resident.slice";
import { Input } from "@/components/ui/input";
import { RequestCertificateFormType } from "./RequestCertificateForm";

type InfoPropTypes = RequestCertificateFormType;

const RequestCertificateFormPersonalInfo = ({ info }: InfoPropTypes) => {
  const { data: resident } = useGetResidentByIdQuery(
    info.profile_id ? info.profile_id : undefined
  );
  const residentInfo = resident ? resident[0] : null;

  return (
    <>
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Profile ID</label>
        <Input
          value={residentInfo?.profile_id}
          name="profile_id"
          className="capitalize"
          type="text"
          disabled
        />
      </div>

      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Name</label>
        <Input
          value={`${residentInfo?.firstname} ${
            residentInfo?.middlename && residentInfo.middlename
          } ${residentInfo?.lastname}`}
          name="firstname"
          className="capitalize"
          type="text"
          disabled
        />
      </div>

      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Voter</label>
        <Input
          value={`${residentInfo?.voter === 1 ? "YES" : "NO"}`}
          name="voter"
          className="capitalize"
          type="text"
          disabled
        />
      </div>

      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Contact No.</label>
        <Input
          value={residentInfo?.contact_no}
          name="contact_no"
          className="capitalize"
          type="text"
          disabled
        />
      </div>

      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Address</label>
        <Input
          value={`${residentInfo?.number_street || ""} ${
            residentInfo?.barangay || ""
          } ${residentInfo?.city || ""}`}
          name="address"
          className="capitalize"
          type="text"
          disabled
        />
      </div>
    </>
  );
};
export default RequestCertificateFormPersonalInfo;
