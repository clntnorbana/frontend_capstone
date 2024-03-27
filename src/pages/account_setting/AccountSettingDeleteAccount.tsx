import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { removeCredentials } from "@/redux/slices/auth.slice";
import { useDeleteAccountMutation } from "@/redux/slices/employee.slice";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type AccountSettingDeleteAccountProps = {
  onOpen: boolean;
  onClose: () => void;
  employee_id: string | undefined;
};

const AccountSettingDeleteAccount = ({
  onOpen,
  onClose,
  employee_id,
}: AccountSettingDeleteAccountProps) => {
  const [password, setPassword] = useState<string>("");
  const [boxChecked, setBoxChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // handle close modal
  const handleCloseModal = () => {
    setPassword("");
    setBoxChecked(false);

    onClose();
  };

  const dispatch = useDispatch();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        password,
      };

      await deleteAccount({ data, employee_id }).unwrap();
      dispatch(removeCredentials({}));
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  }, [error]);

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader loading={isLoading} message="Deleting account, please wait..." />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      <div className="min-w-[400px]">
        <div className="border-b pb-5 flex justify-center items-center">
          <Trash2 size={30} />
        </div>
        <div className="border-b py-5">
          <p className="font-semibold text-red-500 mb-4 text-center">
            Are you sure to delete your account?
          </p>

          <div className="grid max-w-sm items-center mb-2">
            <label className="text-sm font-semibold text-gray-400">
              Enter Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* error message */}
          {error ? (
            <p className="p-3 bg-red-300 text-gray-50 font-bold my-2">
              {error}
            </p>
          ) : null}

          <p className="flex items-center mt-5">
            <input
              className="mr-2"
              type="checkbox"
              checked={boxChecked}
              onChange={(e) => setBoxChecked(e.target.checked)}
            />
            I want to delete my account
          </p>
        </div>

        <div className="mt-5 flex justify-end space-x-1">
          <Button type="button" variant={"outline"} onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button type="submit" disabled={!boxChecked} onClick={handleDelete}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default AccountSettingDeleteAccount;
