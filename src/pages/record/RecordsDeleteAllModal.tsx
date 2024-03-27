import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hooks";
import { useDeleteAllRecordsMutation } from "@/redux/slices/record.slice";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type RecordsDeleteAllModalProps = {
  onOpen: boolean;
  onClose: () => void;
};

const RecordsDeleteAllModal = ({
  onOpen,
  onClose,
}: RecordsDeleteAllModalProps) => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const employeeInfo = useAppSelector((state) => state.credentials.userInfo);

  const [deleteRecords, { isLoading }] = useDeleteAllRecordsMutation();
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        password,
        employee_id: employeeInfo.employee_id,
      };

      const res = await deleteRecords(data).unwrap();
      setSuccessMessage(res.message);
      setPassword("");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1500);
    }
  }, [onClose, successMessage]);

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader loading={isLoading} message="Deleting records, please wait..." />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      {successMessage ? (
        <p>Records deleted</p>
      ) : (
        <>
          <div className="border-b pb-5 flex justify-center items-center">
            <Trash2 className="text-red-500" size={30} />
          </div>
          <div className="border-b py-5">
            <p className="text-center font-semibold text-red-500">
              Are you sure to delete records?
            </p>

            <div className="grid max-w-[300px] mx-auto items-center gap-1.5">
              <label className="text-center textgray-600">
                Enter your password to confirm
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && error !== "unauthorized" ? (
                <p className="text-center text-sm text-red-400">{error}</p>
              ) : null}
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
              disabled={!password}
              type="submit"
              size={"sm"}
              variant={"destructive"}
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
export default RecordsDeleteAllModal;
