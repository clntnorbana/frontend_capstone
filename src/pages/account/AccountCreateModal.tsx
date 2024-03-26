import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateAccountMutation } from "@/redux/slices/employee.slice";
import { ChangeEvent, useEffect, useState } from "react";

interface CreateAccountModalProps {
  onOpen: boolean;
  onClose: () => void;
}

const AccountCreateModal = ({ onOpen, onClose }: CreateAccountModalProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [admin_role, setAdmin_role] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact_no, setContact_no] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // handle inputs change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;

    setAdmin_role(value);
  };

  const [createAccount, { isLoading }] = useCreateAccountMutation();

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      setErrorMessage("Password do not match");
      return;
    }

    try {
      const res = await createAccount({
        username,
        password,
        admin_role,
        firstname,
        lastname,
        email,
        contact_no,
      }).unwrap();

      setSuccessMessage(res.message);
      resetModal();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setErrorMessage((error as any).data.message || (error as any).message);
    }
  };

  // close modal
  const handleCloseModal = () => {
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setUsername("");
    setPassword("");
    setPasswordRepeat("");
    setAdmin_role("");
    setFirstname("");
    setLastname("");
    setEmail("");
    setContact_no("");
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
      if (errorMessage !== "unauthorized") {
        setErrorMessage("");
      }
    }, 2000);
  }, [errorMessage, successMessage]);

  return (
    <>
      {/* create modal */}
      <Modal isOpen={onOpen}>
        {/* loading screen */}
        <Loader
          loading={isLoading}
          message="Creating account, please wait..."
        />

        {/* unauthorized modal */}
        <UnauthorizedModal isOpen={errorMessage === "unauthorized"} />

        {successMessage ? (
          <p>{successMessage}</p>
        ) : (
          <div className="min-w-[500px]">
            <header className="border-b">
              <h1 className="text-lg text-gray-700 font-bold my-3">
                Create new account
              </h1>
            </header>
            <form onSubmit={handleSubmit} className="mt-3">
              {errorMessage ? (
                <p className="p-2 bg-red-300 text-gray-50 my-5">
                  {errorMessage}
                </p>
              ) : null}
              <div className="flex space-x-5 pb-3 border-b mb-3">
                <div className="w-full">
                  <div className="grid w-full items-center gap-1.5 mb-2">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5 mb-2">
                    <label>Password</label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5 mb-2">
                    <label>Confirm Password</label>
                    <Input
                      type="password"
                      value={passwordRepeat}
                      onChange={(e) => setPasswordRepeat(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5 mb-2">
                    <label>Admin Role</label>
                    <Select
                      value={admin_role}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "admin_role", value },
                        } as ChangeEvent<HTMLInputElement | HTMLSelectElement>)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Set Admin Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="w-full">
                  <div className="grid w-full items-center gap-1.5 mb-2">
                    <label>Firstname</label>
                    <Input
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5 mb-2">
                    <label>Lastname</label>
                    <Input
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5 mb-2">
                    <label>Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5 mb-2">
                    <label>Phone #</label>
                    <Input
                      type="number"
                      value={contact_no}
                      onChange={(e) => setContact_no(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button>Create Account</Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AccountCreateModal;
