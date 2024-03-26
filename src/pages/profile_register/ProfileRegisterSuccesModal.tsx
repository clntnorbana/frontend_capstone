import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type ProfileRegisterSuccesModalProps = {
  success: boolean;
  message: string;
  profileId: string;
};

const ProfileRegisterSuccesModal = ({
  success,
  message,
  profileId,
}: ProfileRegisterSuccesModalProps) => {
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [activeReturnBtn, setActiveReturnBtn] = useState<boolean>(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText(profileId);

    setCopiedText(true);
    setActiveReturnBtn(true);

    setTimeout(() => {
      setCopiedText(false);
    }, 1000);
  };

  return (
    <>
      {/* success modal */}
      <Modal isOpen={success}>
        {/* copied text */}
        <Modal isOpen={copiedText}>Copied successfully</Modal>

        <div className="flex flex-col justify-center items-center space-y-3">
          <header>
            <PartyPopper color="blue" size={35} />
          </header>
          <div>
            <p className="text-center italic font-bold text-gray-700">
              {message}
            </p>
            <p className="text-sm text-gray-700 italic text-center">
              Your profile id:{" "}
              <span className="text-gray-800 font-bold">{profileId}</span>
            </p>

            <div className="mt-4 flex justify-center space-x-2">
              <Button onClick={handleCopyText} variant={"outline"} size={"sm"}>
                Copy profile ID
              </Button>
              <Button disabled={!activeReturnBtn} size={"sm"}>
                {" "}
                <NavLink to={"/"}>Return to home</NavLink>{" "}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ProfileRegisterSuccesModal;
