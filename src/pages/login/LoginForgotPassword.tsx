import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChangeForgottenPasswordMutation } from "@/redux/slices/employee.slice";
import { useEffect, useState } from "react";

type LoginForgotPasswordProps = {
  onOpen: boolean;
  onClose: () => void;
};

const LoginForgotPassword = ({ onOpen, onClose }: LoginForgotPasswordProps) => {
  const [employee_id, setEmployee_id] = useState<string>("");
  const [contact_no, setContact_no] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [changeForgottenPassword, { isLoading, isSuccess }] =
    useChangeForgottenPasswordMutation();

  const handleChangeForgottenPassword = async () => {
    try {
      const res = await changeForgottenPassword({
        employee_id,
        contact_no,
      }).unwrap();

      setSuccess(res.message);
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
      <Loader loading={isLoading} />

      <>
        {isSuccess ? (
          <p>{success}</p>
        ) : (
          <div className="min-w-[450px]">
            <header className="mb-4 border-b py-2">
              <p className="font-bold text-gray-700 text-lg">
                Forgot Password?
              </p>
            </header>
            <div className="border-b pb-2">
              {error ? (
                <p className="bg-red-400 text-gray-50 my-2 font-bold p-2 text-center">
                  {error}
                </p>
              ) : null}
              <div className="grid w-full items-center gap-1.5 mb-2">
                <label htmlFor="birthday">Employee ID*</label>
                <Input
                  type="text"
                  placeholder="Enter employee _id"
                  value={employee_id}
                  onChange={(e) => setEmployee_id(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5 mb-2">
                <label>Phone #*</label>
                <Input
                  type="number"
                  placeholder="Enter phone number"
                  value={contact_no}
                  onChange={(e) => setContact_no(e.target.value)}
                />
              </div>
              <p className="text-sm italic my-2 text-gray-600 font-bold">
                Your new password will be sent to the phone number associated
                with your account.
              </p>
            </div>
            <div className="flex justify-end space-x-1 mt-4">
              <Button variant={"outline"} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleChangeForgottenPassword}>Send</Button>
            </div>
          </div>
        )}
        {isSuccess ? (
          <div className="flex justify-end">
            <Button onClick={onClose}>OK</Button>
          </div>
        ) : null}
      </>
    </Modal>
  );
};
export default LoginForgotPassword;
