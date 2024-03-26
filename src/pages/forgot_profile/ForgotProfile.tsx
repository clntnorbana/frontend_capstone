import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendForgottenProfileMutation } from "@/redux/slices/resident.slice";
import { Info, X } from "lucide-react";
import { useState } from "react";

const ForgotProfile = () => {
  const [contact_no, setContact_no] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [error, setError] = useState<string>("");

  // api call send profile id to contact number
  const [sendProfileId, { isLoading, isSuccess }] =
    useSendForgottenProfileMutation();

  // handle send profile id
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await sendProfileId({ contact_no }).unwrap();
      setAlert(res.message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  return (
    <>
      {/* loading screen */}
      <Loader
        loading={isLoading}
        message="Sending to your phone, please wait..."
      />

      {/* success modal */}
      <Modal isOpen={isSuccess}>
        <div className="p-4">
          <p className="text-center font-bold italic text-gray-700">{alert}</p>
        </div>
        <a href="/forgot_profile">
          <X className="absolute top-3 right-3 cursor-pointer" />
        </a>
      </Modal>

      <div>
        <PageHeader title="Forgot your Profile ID?" />
        <div className="max-w-[550px] mx-auto py-5">
          <form onSubmit={handleSubmit}>
            <div className="grid mb-2 w-full items-center gap-1.5">
              <label>Enter phone number</label>
              {error ? (
                <p className="p-2 mb-2 bg-red-400 rounded relative font-bold text-center text-gray-50">
                  <p className="p-4">{error}</p>
                  <X
                    className="absolute top-3 right-3 cursor-pointer hover:opacity-[0.5]"
                    onClick={() => setError("")}
                  />
                </p>
              ) : null}
              {!error ? (
                <p className="p-2 mb-2 text-gray-700 flex justify-center items-center space-x-2 bg-gray-200 rounded">
                  <Info size={20} />{" "}
                  <span>Enter the phone number you use to register.</span>
                </p>
              ) : null}
              <Input
                placeholder="e.g. 09123456789"
                type="number"
                maxLength={11}
                value={contact_no}
                onChange={(e) => setContact_no(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size={"sm"}
              className="bg-blue-600 hover:bg-blue-800"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ForgotProfile;
