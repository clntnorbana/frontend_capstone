import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRejectRequestMutation } from "@/redux/slices/certificate.slice";
import { X } from "lucide-react";
import { useState } from "react";

type CertificateRejectModal = {
  transaction_id: string | undefined;
  onOpen: boolean;
  onClose: () => void;
};

const CertificateRejectModal = ({
  transaction_id,
  onOpen,
  onClose,
}: CertificateRejectModal) => {
  const [remark, setRemark] = useState<string>("");
  const [error, setError] = useState<string>("");

  // reject request
  const [rejectRequest, { isLoading }] = useRejectRequestMutation();
  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        remark,
      };

      await rejectRequest({ data, transaction_id }).unwrap();
      onClose();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader loading={isLoading} message="Rejecting request, please wait..." />
      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />
      <>
        <div className="border-b pb-5 flex justify-center items-center">
          <X className="text-red-500" size={30} />
        </div>
        <div className="border-b py-5">
          <p className="text-center font-semibold text-red-500">
            Are you sure to reject this request?
          </p>

          <div className="grid max-w-[300px] mx-auto items-center gap-1.5">
            <label className="text-center text-gray-600">
              State a reason to be sent.
            </label>
            <Input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-1 mt-4 justify-end">
          <Button
            type="button"
            size={"sm"}
            variant={"outline"}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant={"destructive"}
            size={"sm"}
            onClick={handleReject}
          >
            Confirm
          </Button>
        </div>
      </>
    </Modal>
  );
};
export default CertificateRejectModal;
