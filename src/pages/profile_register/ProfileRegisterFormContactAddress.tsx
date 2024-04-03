import { Input } from "@/components/ui/input";
import { ProfileRegisterFormType } from "./ProfileRegisterForm";

type InfoPropTypes = ProfileRegisterFormType;

const ProfileRegisterFormContactAddress = ({
  info,
  handleInputChange,
}: InfoPropTypes) => {
  return (
    <>
      {/* contact no */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Contact no.</label>
        <p className="italic text-red-600">
          Note: Please provide your phone number to receive updates.
        </p>
        <Input
          name="contact_no"
          placeholder="e.g. 09123456789"
          type="number"
          maxLength={11}
          value={info.contact_no}
          onChange={handleInputChange}
        />
      </div>
      {/* email */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Email (optional)</label>
        <Input
          name="email"
          placeholder="Enter email"
          type="email"
          value={info.email}
          onChange={handleInputChange}
        />
      </div>
      {/* number / street */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="street_no">Number/Street</label>
        <Input
          name="number_street"
          className="capitalize"
          type="text"
          value={info.number_street}
          onChange={handleInputChange}
        />
      </div>
      {/* barangay */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="barangay">Barangay</label>
        <Input className="capitalize" type="text" value={"Malamig"} disabled />
      </div>
      {/* city */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="city">City</label>
        <Input
          className="capitalize"
          type="text"
          value={"Mandaluyong City"}
          disabled
        />
      </div>
      {/* zip code */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="zip_code">Zip Code</label>
        <Input className="capitalize" type="text" value={"1550"} disabled />
      </div>
    </>
  );
};
export default ProfileRegisterFormContactAddress;
``;
