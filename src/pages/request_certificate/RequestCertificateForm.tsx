import { TRequestCertificate } from "@/types";
import { ChangeEvent, useState } from "react";
import RequestCertificateFormProfileId from "./RequestCertificateFormProfileId";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import RequestCertificateFormPersonalInfo from "./RequestCertificateFormPersonalInfo";
import RequestCertificateFormIndentification from "./RequestCertificateFormIndentification";
import RequestCertificateFormSubmit from "./RequestCertificateFormSubmit";
import { useCreateRequestMutation } from "@/redux/slices/certificate.slice";
import Loader from "@/components/Loader";
import RequestCertificateSuccessModal from "./RequestCertificateSuccessModal";

type RequestCertificateFormProps = {
  currentStep: number;
  prevStep: number | null;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setPrevStep: React.Dispatch<React.SetStateAction<number | null>>;
  steps: string[];
};

export type RequestCertificateFormType = {
  info: TRequestCertificate;
  handleInputChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  idExists?: boolean;
  setIdExists?: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageChange?: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
  setRequireImage?: React.Dispatch<React.SetStateAction<boolean>>;
};

const RequestCertificateForm = ({
  currentStep,
  prevStep,
  setCurrentStep,
  setPrevStep,
  steps,
}: RequestCertificateFormProps) => {
  const [idExists, setIdExists] = useState<boolean>(false);
  const [requireImage, setRequireImage] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");

  const [info, setInfo] = useState<TRequestCertificate>({
    profile_id: "",
    certificate_type: "",
    purpose: "",
  });

  const [images, setImages] = useState<File[]>([]);

  // handle inputs change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setInfo({ ...info, [name]: value });
  };

  // handle image change
  const handleImageChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const newImages = [...images];
      newImages[index] = e.target.files[0];
      setImages(newImages);
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

  // api call create request
  const [createRequest, { isLoading, isSuccess }] = useCreateRequestMutation();
  // handle create request
  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(info).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (images) {
        images.forEach((image) => {
          formData.append("img", image);
        });
      }

      const res = await createRequest(formData).unwrap();
      setAlert(res.message && res.message);
      setTransactionId(res.transaction_id && res.transaction_id);

      console.log(res.message, res);
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
        message="Creating your request, please wait..."
      />

      {/* success modal */}
      <RequestCertificateSuccessModal
        success={isSuccess}
        message={alert}
        transactionId={transactionId}
      />

      <form
        onSubmit={handleCreateRequest}
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
            <RequestCertificateFormProfileId
              info={info}
              handleInputChange={handleInputChange}
              idExists={idExists}
              setIdExists={setIdExists}
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
            <RequestCertificateFormPersonalInfo info={info} />
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
            <RequestCertificateFormIndentification
              handleImageChange={handleImageChange}
              info={info}
              setRequireImage={setRequireImage}
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
            <RequestCertificateFormSubmit
              info={info}
              handleInputChange={handleInputChange}
            />
          </motion.div>
        ) : null}

        {/* buttons */}
        <div className="flex justify-end space-x-2 my-3">
          {currentStep > 1 ? (
            <Button type="button" variant={"ghost"} onClick={handlePrevStep}>
              Back
            </Button>
          ) : null}
          {currentStep < steps.length ? (
            <Button
              disabled={
                !idExists ||
                (currentStep === 3 && requireImage && images.length !== 4)
              }
              type="button"
              onClick={handleNextStep}
            >
              Next
            </Button>
          ) : null}

          {currentStep === steps.length ? (
            <Button
              disabled={!info.certificate_type || !info.purpose}
              type="submit"
            >
              Submit
            </Button>
          ) : null}
        </div>
      </form>
    </>
  );
};
export default RequestCertificateForm;
