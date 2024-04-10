import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { useDeleteSingleArchiveMutation } from "@/redux/slices/archive.slice";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type ArchiveDeleteSingleModalProps = {
  onOpen: boolean;
  onClose: () => void;
  transaction_id: string | undefined;
};

const ArchiveDeleteSingleModal = ({
  onOpen,
  onClose,
  transaction_id,
}: ArchiveDeleteSingleModalProps) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [deleteSingleArchive, { isLoading }] = useDeleteSingleArchiveMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteSingleArchive(transaction_id).unwrap();

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
      }, 2000);
    }
  }, [success, onClose]);

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader loading={isLoading} message="Deleting item, please wait..." />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      {success ? (
        <p>{success}</p>
      ) : (
        <>
          <div className="border-b pb-5 flex justify-center items-center">
            <Trash2 size={30} className="text-red-500" />
          </div>
          <div className="border-b py-5">
            <p className="text-center font-semibold text-red-500">
              Are you sure to delete this item?
            </p>
            <p className="text-center font-bold text-gray-700 my-2">
              {"<"}
              {transaction_id}
              {">"}
            </p>
          </div>
          <div className="flex space-x-1 mt-4 justify-end">
            <Button type="button" variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              type="submit"
              onClick={handleDelete}
            >
              Confirm
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
export default ArchiveDeleteSingleModal;
