import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteAllArchivesMutation } from "@/redux/slices/archive.slice";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type ArchiveDeleteAllModalProps = {
  onOpen: boolean;
  onClose: () => void;
  employee_id: string | undefined;
};

const ArchiveDeleteAllModal = ({
  onOpen,
  onClose,
  employee_id,
}: ArchiveDeleteAllModalProps) => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [deleteAllArchives, { isLoading }] = useDeleteAllArchivesMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteAllArchives({ employee_id, password }).unwrap();

      setSuccess(res.message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  const handleClose = () => {
    setPassword("");
    onClose();
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
        setPassword("");
        onClose();
      }, 2000);
    }

    if (error && error !== "unauthorized") {
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  }, [success, onClose, error]);

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader
        loading={isLoading}
        message="Deleting archives record, please wait..."
      />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      {success ? (
        <p>{success}</p>
      ) : (
        <>
          <div className="border-b pb-5 flex justify-center">
            <Trash2 size={30} className="text-red-500" />
          </div>
          <div className="border-b py-5">
            <p className="text-center font-semibold text-red-500">
              Are you sure to clear archive? This cannot be undone.
            </p>

            <div className="mt-5">
              <label>Enter your password to confirm</label>
              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <p className="text-center mt-4 bg-red-400 p-2 text-gray-50">
                {error}
              </p>
            ) : null}
          </div>
          <div className="flex justify-end space-x-1 mt-4">
            <Button variant={"outline"} type="button" onClick={handleClose}>
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
export default ArchiveDeleteAllModal;
