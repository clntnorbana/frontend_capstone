import "./styles/indicator.css";
import { Check } from "lucide-react";

type IndicatorProps = {
  currentStep: number;
  steps: string[];
};

const Indicator = ({ currentStep, steps }: IndicatorProps) => {
  return (
    <div className="flex justify-center mt-16">
      {steps?.map((step, index) => {
        return (
          <div
            key={index}
            className={`step-item ${currentStep === index + 1 && "active"} ${
              index + 1 < currentStep && "complete"
            }`}
          >
            <div className="step">
              {index + 1 < currentStep ? <Check size={15} /> : index + 1}
            </div>
            <p className="text-gray-300 text-[9px] md:text-[15px]">{step}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Indicator;
