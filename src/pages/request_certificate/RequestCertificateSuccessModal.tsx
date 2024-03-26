import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type RequestCertificateSuccessModalProps = {
  success: boolean;
  message: string;
  transactionId: string;
};

const RequestCertificateSuccessModal = ({
  success,
  message,
  transactionId,
}: RequestCertificateSuccessModalProps) => {
  const [copyText, setCopyText] = useState<boolean>(false);
  const [activeReturnBtn, setActiveReturnBtn] = useState<boolean>(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText(transactionId);

    setCopyText(true);
    setActiveReturnBtn(true);

    setTimeout(() => {
      setCopyText(false);
    }, 1000);
  };

  return (
    <>
      <Modal isOpen={success}>
        {/* copied text */}
        <Modal isOpen={copyText}>Copied successfully</Modal>

        <div className="flex flex-col justify-center items-center">
          <header>
            <PartyPopper color="blue" size={35} />
          </header>
          <div>
            <p className="text-center italic font-bold text-gray-700">
              {message}
            </p>
            <p className="text-sm text-gray-700 italic text-center">
              Your transaction id:{" "}
              <span className="text-gray-800 font-bold">{transactionId}</span>
            </p>

            <div className="mt-4 flex justify-center space-x-2">
              <Button onClick={handleCopyText} variant={"outline"} size={"sm"}>
                Copy transaction ID
              </Button>
              <Button disabled={!activeReturnBtn} size={"sm"}>
                <NavLink to={"/"}>Return to home</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default RequestCertificateSuccessModal;
