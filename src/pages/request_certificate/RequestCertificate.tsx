import Indicator from "@/components/Indicator";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import RequestCertificateForm from "./RequestCertificateForm";

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
    <div>
      <PageHeader title="Request Certificate" />
      <div className="max-w-[550px] mx-auto md:p-5">
        <Indicator steps={steps} currentStep={currentStep} />
        <RequestCertificateForm
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

export default RequestCertificate;
