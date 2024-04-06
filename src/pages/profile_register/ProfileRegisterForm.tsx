import { Button } from "@/components/ui/button";
import ProfileRegisterFormContactAddress from "./ProfileRegisterFormContactAddress";
import ProfileRegisterFormPersonalInfo from "./ProfileRegisterFormPersonalInfo";
import ProfileRegisterFormSubmit from "./ProfileRegisterFormSubmit";
import ProfileRegisterFormUploadImage from "./ProfileRegisterFormUploadImage";
import { motion } from "framer-motion";
import { ChangeEvent, useEffect, useState } from "react";
import { TResident } from "@/types";
import { useCreateResidentMutation } from "@/redux/slices/resident.slice";
import Loader from "@/components/Loader";
import ProfileRegisterSuccesModal from "./ProfileRegisterSuccesModal";

type ProfileRegisterFormProps = {
  currentStep: number;
  prevStep: number | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setPrevStep: React.Dispatch<React.SetStateAction<number | null>>;
  steps: string[];
};

export type ProfileRegisterFormType = {
  info: TResident;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

const ProfileRegisterForm = ({
  currentStep,
  prevStep,
  setCurrentStep,
  setPrevStep,
  steps,
}: ProfileRegisterFormProps) => {
  const [emptyInput, setEmptyInput] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileProp, setFileProp] = useState<FileList | null>(null);
  const [boxChecked, setBoxChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [profileId, setProfileId] = useState<string>("");

  const [info, setInfo] = useState<TResident>({
    firstname: "",
    lastname: "",
    middlename: "",
    sex: "male",
    date_of_birth: "",
    place_of_birth: "",
    contact_no: "",
    email: "",
    citizenship: "",
    religion: "",
    civil_status: "single",
    company: "",
    occupation: "",
    number_street: "",
    voter: 0,
  });

  const hasNumber = (input: string): boolean => {
    const regex = /^[0-9]+$/;
    return regex.test(input);
  };

  // check inputs
  useEffect(() => {
    const requiredInputs: { [steps: number]: string[] } = {
      1: ["firstname", "lastname", "date_of_birth", "citizenship"],
      2: ["contact_no", "number_street"],
      3: [],
      4: [],
    };

    const requiredInputInCurrentStep = requiredInputs[currentStep];
    const hasEmptyInput = requiredInputInCurrentStep.some(
      (input) => info[input as keyof TResident] === ""
    );
    setEmptyInput(hasEmptyInput);
  }, [info, currentStep]);

  // handle inputs change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setInfo({ ...info, [name]: value });
  };

  // handle image input change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileProp(e.target.files);
    }
  };

  // handle next step button
  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
    setPrevStep(currentStep);
  };

  // handle prev step button
  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
    setPrevStep(currentStep);
  };

  // api call create resident
  const [createResident, { isLoading, isSuccess }] =
    useCreateResidentMutation();

  // handle form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(info).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (file) {
        formData.append("img", file);
      }

      const res = await createResident(formData).unwrap();
      setAlert(res.message && res.message);
      setProfileId(res.profileId && res.profileId);
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
        message={"Creating your profile, please wait..."}
      />

      {/* success modal */}
      <ProfileRegisterSuccesModal
        success={isSuccess}
        message={alert}
        profileId={profileId}
      />

      {/* form */}
      <form
        onSubmit={handleFormSubmit}
        className="p-5 border rounded shadow my-4"
      >
        {/* error */}
        {error !== "" ? (
          <p className="p-2 mb-4 bg-red-100 font-bold text-gray-500 rounded text-center">
            {error}
          </p>
        ) : null}
        {currentStep === 1 ? (
          <motion.div
            initial={{
              x: (prevStep ?? 0) > currentStep ? -35 : 0,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: 35,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <ProfileRegisterFormPersonalInfo
              info={info}
              handleInputChange={handleInputChange}
            />
          </motion.div>
        ) : null}
        {currentStep === 2 ? (
          <motion.div
            initial={{
              x: (prevStep ?? 0) > currentStep ? -35 : 35,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: (prevStep ?? 0) > currentStep ? -35 : 35,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <ProfileRegisterFormContactAddress
              info={info}
              handleInputChange={handleInputChange}
            />
          </motion.div>
        ) : null}
        {currentStep === 3 ? (
          <motion.div
            initial={{
              x: (prevStep ?? 0) > currentStep ? -35 : 35,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: (prevStep ?? 0) > currentStep ? -35 : 35,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <ProfileRegisterFormUploadImage
              file={file}
              fileProp={fileProp}
              handleImageChange={handleImageChange}
            />
          </motion.div>
        ) : null}
        {currentStep === 4 ? (
          <motion.div
            initial={{
              x: (prevStep ?? 0) > currentStep ? -35 : 35,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: (prevStep ?? 0) > currentStep ? -35 : 35,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <ProfileRegisterFormSubmit
              boxChecked={boxChecked}
              setBoxChecked={(e: {
                target: {
                  checked: boolean | ((prevState: boolean) => boolean);
                };
              }) => setBoxChecked(e.target.checked)}
            />
          </motion.div>
        ) : null}

        <div className="flex justify-end space-x-2 my-3">
          {currentStep > 1 ? (
            <Button type="button" variant={"ghost"} onClick={handlePrevStep}>
              Back
            </Button>
          ) : null}
          {currentStep < steps.length ? (
            <Button
              disabled={
                emptyInput ||
                (currentStep === 3 && !file) ||
                (currentStep === 2 && info.contact_no.length !== 11) ||
                (currentStep === 1 && hasNumber(info.firstname)) ||
                hasNumber(info.lastname) ||
                hasNumber(info.middlename)
              }
              type="button"
              onClick={handleNextStep}
            >
              Next
            </Button>
          ) : null}
          {currentStep === steps.length ? (
            <Button disabled={!boxChecked} type="submit">
              Submit
            </Button>
          ) : null}
        </div>
      </form>
    </>
  );
};
export default ProfileRegisterForm;
