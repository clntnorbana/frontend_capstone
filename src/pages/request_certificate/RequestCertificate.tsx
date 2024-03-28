import Indicator from "@/components/Indicator";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import RequestCertificateForm from "./RequestCertificateForm";
import { motion } from "framer-motion";

const RequestCertificate = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [prevStep, setPrevStep] = useState<number | null>(null);

  const steps: string[] = [
    "Profile ID",
    "Personal Info",
    "Identification",
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
      <PageHeader title="Request Certificate" />
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
        className="max-w-[550px] mx-auto md:p-5"
      >
        <Indicator steps={steps} currentStep={currentStep} />
        <RequestCertificateForm
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

export default RequestCertificate;
