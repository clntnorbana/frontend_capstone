import Indicator from "@/components/Indicator";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import ProfileRegisterForm from "./ProfileRegisterForm";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{ opacity: 0, y: 25 }}
      transition={{
        duration: 0.1,
        delay: 0.1,
      }}
    >
      <PageHeader title="Profile Register" />
      <div className="bg-gray-200 p-4 mt-4">
        <p>
          Your privacy is important to us. Please feel comfortable entering the
          requested information in this form. Rest assured that we will handle
          your data carefully and securely. If you have any problems, please
          refer to our privacy policy or contact us directly. I appreciate your
          trust and cooperation.
        </p>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{ opacity: 0, y: 25 }}
        transition={{
          duration: 0.1,
          delay: 0.3,
        }}
        className="max-w-[550px] mx-auto mt-[-30px]"
      >
        <Indicator steps={steps} currentStep={currentStep} />
        <ProfileRegisterForm
          currentStep={currentStep}
          prevStep={prevStep}
          setCurrentStep={setCurrentStep}
          setPrevStep={setPrevStep}
          steps={steps}
        />
      </motion.div>
    </motion.div>
  );
};
export default ProfileRegister;
