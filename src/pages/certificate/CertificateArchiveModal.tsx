import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMoveToArchivesMutation } from "@/redux/slices/archive.slice";
import { Eye, EyeOff, PackageOpen } from "lucide-react";
import { useEffect, useState } from "react";

type CertificateArchiveModalProps = {
  onOpen: boolean;
  onClose: () => void;
  employee_id: string | undefined;
};

const CertificateArchiveModal = ({
  onOpen,
  onClose,
  employee_id,
}: CertificateArchiveModalProps) => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setErrror] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [moveToArchive, { isLoading }] = useMoveToArchivesMutation();

  const handleMoveToArchive = async () => {
    try {
      const res = await moveToArchive({ employee_id, password }).unwrap();
      setSuccess(res.message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setErrror((error as any).data.message);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2000);
    }

    if (error && error !== "unauthorized") {
      setTimeout(() => {
        setErrror("");
      }, 2500);
    }
  }, [success, onClose, error]);

  return (
    <Modal isOpen={onOpen}>
      {/* laoding screen */}
      <Loader loading={isLoading} message="Moving to archive, please wait..." />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      {success ? (
        <p>Moved to archive successfully</p>
      ) : (
        <>
          <div className="border-b pb-5 flex justify-center items-center">
            <PackageOpen size={30} />
          </div>
          <div className="border-b py-5">
            <p className="text-center font-semibold text-gray-700">
              Archive approved & rejected requests?
            </p>

            <div className="mt-5">
              <label>Enter your password to confirm</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />

                <Button
                  type="button"
                  className={`bg-transparent hover:bg-transparent text-gray-900 absolute top-0 right-0 ${
                    showPassword ? "opacity-[1]" : "opacity-[0.5]"
                  }`}
                  onClick={() => setShowPassword((curr) => !curr)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </Button>
              </div>
            </div>

            {/* error message */}
            {error ? (
              <p className="p-2 bg-red-400 text-gray-50 my-2 text-center">
                {error}
              </p>
            ) : null}
          </div>
          <div className="space-x-1 flex justify-end mt-4">
            <Button type="button" variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleMoveToArchive}>
              Confirm
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
export default CertificateArchiveModal;
