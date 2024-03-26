import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hooks";
import { useDeleteResidentMutation } from "@/redux/slices/resident.slice";
import { TResident } from "@/types";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ResidentDeleteModalProps = {
  resident: TResident | null;
  onOpen: boolean;
  onClose: () => void;
};

const ResidentDeleteModal = ({
  resident,
  onOpen,
  onClose,
}: ResidentDeleteModalProps) => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  // current logged in data
  const employee = useAppSelector((state) => state.credentials.userInfo);

  const navigate = useNavigate();

  // api call delete resident
  const [deleteResident, { isLoading }] = useDeleteResidentMutation();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    // employee data
    const data = {
      password,
      employee_id: employee.employee_id,
    };

    // profile id
    const profile_id = resident?.profile_id;

    try {
      const res = await deleteResident({ data, profile_id }).unwrap();
      setSuccessMsg(res.message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  // handle close modal
  const handleCloseModal = () => {
    onClose();
    setPassword("");
  };

  useEffect(() => {
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg("");
        onClose();
        navigate("/residents");
      }, 1500);
    }

    if (error && error !== "unauthorized") {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error, navigate, onClose, successMsg]);

  return (
    <Modal isOpen={onOpen}>
      {successMsg !== "" ? (
        <p>Resident profile successfully deleted</p>
      ) : (
        <>
          {/* loading screen */}
          <Loader
            loading={isLoading}
            message="Deleting profile, please wait..."
          />

          <div className="border-b pb-5 flex justify-center items-center">
            <Trash2 className="text-red-500" size={30} />
          </div>
          <div className="border-b py-5">
            <p className="text-center font-semibold text-red-500">
              Are you sure to delete this profile?
            </p>

            <div className="mt-5">
              <label>Enter your password to confirm</label>
              <Input
                className="mt-1"
                type="text"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* error message */}
              {error ? (
                <p className="font-bold mt-2 text-center italic">{error}</p>
              ) : null}
            </div>
          </div>
          <div className="mt-4 space-x-1 flex justify-end">
            <Button variant={"outline"} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              type="submit"
              onClick={handleDelete}
              disabled={!password}
            >
              Confirm
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
export default ResidentDeleteModal;
