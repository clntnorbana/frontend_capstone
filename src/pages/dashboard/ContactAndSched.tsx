import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState } from "react";

const ContactAndSched = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);

  const contactAndSched = JSON.parse(
    localStorage.getItem("contactSchedData") || ""
  );

  return (
    <>
      {/* form */}
      <ContactandSchedForm
        onOpen={openForm}
        onClose={() => setOpenForm(false)}
      />

      <div className="my-5 border max-w-sm p-5 rounded-md shadow">
        <div className="flex justify-between">
          <div>
            <h1 className="border-b mb-2 pb-2 font-bold px-1 text-gray-600">
              Barangay Malamig Contact and Schedule
            </h1>
            <div>
              <p>
                <span className="font-bold text-gray-600">Contact:</span>{" "}
                <span className="italic">{contactAndSched.contact}</span>{" "}
              </p>
              <p>
                <span className="font-bold text-gray-600">Open hours:</span>{" "}
                <span className="italic">{contactAndSched.sched}</span>{" "}
              </p>
            </div>
          </div>
          <Pencil
            size={20}
            onClick={() => setOpenForm(true)}
            className="cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

type ContactandSchedFormProps = {
  onOpen: boolean;
  onClose: () => void;
};

// edit contact and schedule
const ContactandSchedForm = ({ onOpen, onClose }: ContactandSchedFormProps) => {
  const [formData, setFormData] = useState<{ contact: string; sched: string }>(
    () => {
      const savedData = localStorage.getItem("contactSchedData");
      return savedData ? JSON.parse(savedData) : { contact: "", sched: "" };
    }
  );

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange =
    (key: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [key]: e.target.value }));
    };

  const handleUpdate = () => {
    if (!formData.contact || !formData.sched) {
      setError(true);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("contactSchedData", JSON.stringify(formData));
      setError(false);
      setLoading(false);
      onClose();
    }, 2500);
  };

  const handleCloseModal = () => {
    onClose();
    setError(false);
  };

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader
        loading={loading}
        message="Updating contact and schedule, please wait..."
      />

      <div className="border-b pb-4 min-w-[400px]">
        {error ? (
          <p className="my-4 bg-red-400 p-2 text-gray-50 text-sm text-center">
            Field is required
          </p>
        ) : null}

        <h1 className="font-bold border-b pb-4">Update contact and schedule</h1>

        <div className="mt-4">
          <label className="font-bold text-gray-600 mb-1">Contact</label>
          <Input
            type="text"
            placeholder="Enter contact #"
            value={formData.contact}
            onChange={handleInputChange("contact")}
          />
        </div>

        <div className="mt-4">
          <label className="font-bold text-gray-600 mb-1">Schedule</label>
          <Input
            type="text"
            placeholder="e.g. Mon - Fri 8:00 am - 6:00 pm"
            value={formData.sched}
            onChange={handleInputChange("sched")}
          />
        </div>
      </div>
      <div className="mt-4 flex space-x-1 justify-end">
        <Button size={"sm"} variant={"outline"} onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button size={"sm"} onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default ContactAndSched;
