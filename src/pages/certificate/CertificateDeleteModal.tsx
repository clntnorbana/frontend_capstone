import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { useDeleteRequestMutation } from "@/redux/slices/certificate.slice";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type CertificateDeleteModalProps = {
  onOpen: boolean;
  onClose: () => void;
  transaction_id: string | undefined;
};

const CertificateDeleteModal = ({
  onOpen,
  onClose,
  transaction_id,
}: CertificateDeleteModalProps) => {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const [deleteRequest, { isLoading }] = useDeleteRequestMutation();
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await deleteRequest(transaction_id).unwrap();
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
        navigate("/certificates");
      }, 1500);
    }
  }, [navigate, onClose, success]);

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader loading={isLoading} message="Deleting request, please wait..." />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      {success ? (
        <p>{success}</p>
      ) : (
        <>
          <div className="border-b pb-5 flex justify-center items-center">
            <Trash2 className="text-red-500" size={30} />
          </div>
          <div className="border-b py-5">
            <p className="text-center font-semibold text-red-500">
              Are you sure to delete this request?
            </p>
          </div>
          <div className="flex space-x-1 mt-4 justify-end">
            <Button
              onClick={onClose}
              type="button"
              size={"sm"}
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              type="submit"
              variant={"destructive"}
              size={"sm"}
            >
              Confirm
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
export default CertificateDeleteModal;
