import Privacypolicy from "@/components/privacypolicy";
import TermsCondition from "@/components/terms&condition";
import { useState } from "react";

type ProfileRegisterFormSubmitProps = {
  boxChecked: boolean;
  setBoxChecked: (e: {
    target: {
      checked: boolean | ((prevState: boolean) => boolean);
    };
  }) => void;
};

const ProfileRegisterFormSubmit = ({
  boxChecked,
  setBoxChecked,
}: ProfileRegisterFormSubmitProps) => {
  const [openTermsCondition, setOpenTermsCondition] = useState<boolean>(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState<boolean>(false);

  return (
    <>
      {/* terms and condition modal */}
      <TermsCondition
        onOpen={openTermsCondition}
        onClose={() => setOpenTermsCondition(false)}
      />

      {/* privacy policy modal */}
      <Privacypolicy
        onOpen={openPrivacyPolicy}
        onClose={() => setOpenPrivacyPolicy(false)}
      />
      <div className="text-center">
        <label>
          <input
            type="checkbox"
            checked={boxChecked}
            onChange={setBoxChecked}
          />{" "}
          By checking the box, you agreed to our{" "}
          <button
            onClick={() => setOpenTermsCondition(true)}
            type="button"
            className="underline text-blue-600 hover:text-blue-800"
          >
            terms & condition
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="underline text-blue-600 hover:text-blue-800"
            onClick={() => setOpenPrivacyPolicy(true)}
          >
            privacy policy
          </button>
          .
        </label>
      </div>
    </>
  );
};
export default ProfileRegisterFormSubmit;
