import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePasswordMutation } from "@/redux/slices/employee.slice";
import { KeyRound } from "lucide-react";
import { useEffect, useState } from "react";

type AccountSettingUpdatePasswordProps = {
  onOpen: boolean;
  onClose: () => void;
  employee_id: string | undefined;
};

const AccountSettingUpdatePassword = ({
  onOpen,
  onClose,
  employee_id,
}: AccountSettingUpdatePasswordProps) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleCloseModal = () => {
    resetModal();
    onClose();
  };

  // reset modal
  const resetModal = () => {
    setPasswordRepeat("");
    setCurrentPassword("");
    setNewPassword("");
  };

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== passwordRepeat) {
      setError("Password do not match");
      return;
    }

    try {
      const data = {
        currentPassword,
        newPassword,
      };

      const res = await updatePassword({ data, employee_id }).unwrap();
      setSuccess(res.message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  useEffect(() => {
    if (error && error !== "unauthorized") {
      setTimeout(() => {
        setError("");
      }, 2500);
    }

    if (success) {
      setTimeout(() => {
        setSuccess("");
        onClose();
        resetModal();
      }, 2500);
    }
  }, [error, onClose, success]);

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader loading={isLoading} message="Updating password, please wait..." />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />
      <>
        {success ? (
          <p>Password Updated</p>
        ) : (
          <div className="min-w-[400px]">
            <div className="border-b pb-5 flex justify-center items-center">
              <KeyRound size={30} />
            </div>
            <div className="border-b py-5">
              <p className="font-semibold text-gray-500 mb-4 text-center">
                Update Password
              </p>
              {error && error !== "unauthorized" ? (
                <p className="p-3 bg-red-300 my-3 font-bold text-gray-50">
                  {error}
                </p>
              ) : null}
              <div>
                <div className="grid max-w-sm items-center mb-2">
                  <label className="text-sm font-semibold text-gray-400">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="grid max-w-sm items-center mb-2">
                  <label className="text-sm font-semibold text-gray-400">
                    New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="grid max-w-sm items-center mb-2">
                  <label className="text-sm font-semibold text-gray-400">
                    Repeat New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-1 mt-4">
              <Button
                type="button"
                variant={"outline"}
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleUpdate}>
                Confirm
              </Button>
            </div>
          </div>
        )}
      </>
    </Modal>
  );
};
export default AccountSettingUpdatePassword;
