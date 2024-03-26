import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { useUpdateAdminRoleMutation } from "@/redux/slices/employee.slice";
import { TEmployee } from "@/types";
import { useEffect, useState } from "react";

type AccountCardUpdateRoleModalProps = {
  onOpen: boolean;
  onClose: () => void;
  account: TEmployee;
};

const AccountCardUpdateRoleModal = ({
  onOpen,
  onClose,
  account,
}: AccountCardUpdateRoleModalProps) => {
  const [updateRole, { isLoading }] = useUpdateAdminRoleMutation();
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const employee_id = account.employee_id;

      const res = await updateRole(employee_id).unwrap();
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
        onClose();
      }, 1000);
    }
  }, [onClose, successMessage]);

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader loading={isLoading} message="Updating role, please wait..." />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      {successMessage !== "" ? (
        <p>{successMessage}</p>
      ) : (
        <>
          <div className="border-b pb-5 flex justify-center items-center">
            <p className="text-gray-700">
              Change <span className="font-bold">{account.username}'s</span>{" "}
              role to{" "}
              {account.admin_role === "editor" ? "normal admin" : "editor"}?
            </p>
          </div>
          <div className="flex space-x-1 justify-end mt-4">
            <Button
              variant={"outline"}
              size={"sm"}
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button size={"sm"} type="submit" onClick={handleUpdate}>
              Confirm
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
export default AccountCardUpdateRoleModal;
