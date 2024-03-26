import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteEmployeeMutation } from "@/redux/slices/employee.slice";
import { TEmployee } from "@/types";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type AccountCardDeleteModalProps = {
  onOpen: boolean;
  onClose: () => void;
  account: TEmployee;
};

const AccountCardDeleteModal = ({
  onOpen,
  onClose,
  account,
}: AccountCardDeleteModalProps) => {
  const [confirmation, setConfirmation] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const confirm = `delete account/${account.username}`;

  // api call delete employee
  const [deleteEmployee, { isLoading: deleteLoading }] =
    useDeleteEmployeeMutation();

  // handle delete employee
  const handleDelete = async (employee_id: string) => {
    try {
      const res = await deleteEmployee(employee_id).unwrap();
      setSuccessMessage(res.message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    }
  }, [successMessage]);

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader
        loading={deleteLoading}
        message="Deleting account, please wait..."
      />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      {successMessage !== "" ? (
        <p>{successMessage}</p>
      ) : (
        <>
          <div className="border-b pb-5 flex justify-center items-center">
            <Trash2 className="text-red-500" size={30} />
          </div>
          <div className="border-b py-5">
            <p className="text-center font-semibold text-red-500">
              Are you sure to delete this account?
            </p>

            <div className="grid max-w-[300px] mx-auto items-center gap-1.5">
              <label className="text-center text-gray-600">
                Type <span className="font-bold italic">{confirm}</span> to
                continue
              </label>
              <Input
                type="text"
                placeholder={`Type delete account/${account.username}`}
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              />
            </div>
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
              onClick={() => handleDelete(account.employee_id)}
              type="submit"
              disabled={confirmation !== confirm}
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
export default AccountCardDeleteModal;
