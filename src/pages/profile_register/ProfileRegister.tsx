import Indicator from "@/components/Indicator";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import ProfileRegisterForm from "./ProfileRegisterForm";

const ProfileRegister = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [prevStep, setPrevStep] = useState<number | null>(null);

  const steps: string[] = [
    "Personal Info",
    "Contact / Address",
    "Upload Image",
    "Submit",
  ];

  return (
    <div>
      <PageHeader title="Profile Register" />
      <div className="max-w-[550px] mx-auto md:p-5">
        <Indicator steps={steps} currentStep={currentStep} />
        <ProfileRegisterForm
          currentStep={currentStep}
          prevStep={prevStep}
          setCurrentStep={setCurrentStep}
          setPrevStep={setPrevStep}
          steps={steps}
        />
      </div>
    </div>
  );
};
export default ProfileRegister;
