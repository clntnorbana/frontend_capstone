import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetSettingQuery,
  useUpdateSettingMutation,
} from "@/redux/slices/employee.slice";
import { TSetting } from "@/types";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

const ContactAndSched = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);

  const { data: settingData, isLoading } = useGetSettingQuery();
  const setting = settingData ? settingData[0] : undefined;

  return (
    <>
      {/* form */}
      <ContactandSchedForm
        onOpen={openForm}
        onClose={() => setOpenForm(false)}
        settingData={setting}
      />

      <div className="border max-w-sm p-5 rounded-md shadow bg-gray-50 border-gray-200 rounded-lg hover:bg-gray-100">
        <div className="flex justify-between">
          <div>
            <h1 className="border-b mb-2 pb-2 font-bold px-1 text-gray-600">
              Contact and Schedule Setting
            </h1>
            <div>
              <p>
                <span className="font-bold text-gray-600">Contact:</span>{" "}
                <span className="italic">
                  {isLoading ? "loading..." : setting?.contact}
                </span>{" "}
              </p>
              <p>
                <span className="font-bold text-gray-600">Schedule:</span>{" "}
                <span className="italic">
                  {isLoading ? "loading..." : setting?.schedule}
                </span>{" "}
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

type ContactAndSchedFormProps = {
  onOpen: boolean;
  onClose: () => void;
  settingData: TSetting | undefined;
};

// edit contact and schedule
const ContactandSchedForm = ({
  onOpen,
  onClose,
  settingData,
}: ContactAndSchedFormProps) => {
  const [contact, setContact] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    if (settingData) {
      setContact(settingData.contact);
      setSchedule(settingData.schedule);
    }
  }, [settingData]);

  // update setting api call
  const [updateSetting, { isLoading }] = useUpdateSettingMutation();

  const handleUpdate = async () => {
    // const data = {
    //   contact,
    //   schedule,
    // };

    try {
      const res = await updateSetting({ contact, schedule }).unwrap();
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
      }, 2000);
    }

    if (success) {
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2000);
    }
  }, [error, success, onClose]);

  return (
    <Modal isOpen={onOpen}>
      {/* loading screen */}
      <Loader loading={isLoading} message="Updating, please wait..." />

      {/* Unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      {success ? (
        <p>{success}</p>
      ) : (
        <>
          <div className="border-b pb-4 min-w-[400px]">
            <h1 className="font-bold border-b pb-4">
              Update contact and schedule
            </h1>

            {/* error message */}
            {error ? (
              <p className="p-2 bg-red-400 text-gray-50 text-center">{error}</p>
            ) : null}

            <div className="mt-4">
              <label className="font-bold text-gray-600 mb-1">Contact</label>
              <Input
                type="text"
                placeholder="Enter contact #"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="font-bold text-gray-600 mb-1">Schedule</label>
              <Input
                type="text"
                placeholder="e.g. Mon - Fri 8:00 am - 6:00 pm"
                name="sched"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-1 justify-end">
            <Button size={"sm"} variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button size={"sm"} type="submit" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ContactAndSched;
