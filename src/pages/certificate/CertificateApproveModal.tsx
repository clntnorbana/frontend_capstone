import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { useApproveRequestMutation } from "@/redux/slices/certificate.slice";
import { CheckCheck } from "lucide-react";
import React, { useEffect, useState } from "react";

type CertificateApproveModalProps = {
  onOpen: boolean;
  onClose: () => void;
  transaction_id: string | undefined;
};

const CertificateApproveModal = ({
  onOpen,
  onClose,
  transaction_id,
}: CertificateApproveModalProps) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const employeeInfo = useAppSelector((state) => state.credentials.userInfo);
  const [approveRequest, { isLoading }] = useApproveRequestMutation();

  // handle close modal
  const handleCloseModal = () => {
    onClose();
  };

  // handle approve request
  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        employee_id: employeeInfo.employee_id,
      };

      const res = await approveRequest({ data, transaction_id }).unwrap();
      setSuccess(res.message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1500);
    }
  }, [onClose, success]);

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader loading={isLoading} message="Approving request, please wait..." />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      {success ? (
        <p>{success}</p>
      ) : (
        <>
          <div className="border-b pb-5 flex justify-center items-center">
            <CheckCheck size={30} />
          </div>
          <div className="border-b py-5">
            <p className="text-center font-semibold text-gray-700">
              Are you sure to approve this request?
            </p>
          </div>
          <div className="flex space-x-1 mt-4 justify-end">
            <Button
              variant={"outline"}
              type="button"
              size={"sm"}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button type="submit" size={"sm"} onClick={handleApprove}>
              Confirm
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
export default CertificateApproveModal;
