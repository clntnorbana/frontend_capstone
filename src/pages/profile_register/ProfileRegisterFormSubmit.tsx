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

  return (
    <>
      <TermsCondition
        onOpen={openTermsCondition}
        onClose={() => setOpenTermsCondition(false)}
      />
      <div className="text-center">
        <label>
          <input
            type="checkbox"
            checked={boxChecked}
            onChange={setBoxChecked}
          />{" "}
          By checking the box, you agreed to our terms & condition
          <button
            onClick={() => setOpenTermsCondition(true)}
            type="button"
            className="underline text-blue-600 hover:text-blue-800"
          >
            terms & condition
          </button>
          .
        </label>
      </div>
    </>
  );
};
export default ProfileRegisterFormSubmit;
