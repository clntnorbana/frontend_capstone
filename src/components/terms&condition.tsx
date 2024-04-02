import Modal from "./Modal";
import { Button } from "./ui/button";

const termsConditionList = [
  {
    title: "Acceptance of Terms",
    text: "By registering a profile on our platform, you agree to abide by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.",
  },
  {
    title: "Accurate Information",
    text: "You agree to provide accurate and complete information during the registration process. It is our responsibility to update this information promptly to maintain its accuracy.",
  },
  {
    title: "Content Guidelines",
    text: "All content submitted through your profile must comply with our community guidelines. We reserve the right to remove or restrict any content that violates these guidelines.",
  },
  {
    title: "Privacy and Data Security",
    text: "Your privacy is important to us. We will handle your personal information in accordance with our Privacy Policy. By using our platform, you consent to the collection, use, and storage of your information as described in the Privacy Policy.",
  },
  {
    title: "Contact Information",
    text: "For any questions or concerns regarding these Terms and Conditions, please contact us at barangaymalamig@gmail.com.",
  },
];

type TermsConditionProps = {
  onOpen: boolean;
  onClose: () => void;
};

const TermsCondition = ({ onOpen, onClose }: TermsConditionProps) => {
  return (
    <Modal isOpen={onOpen}>
      <div className="max-w-[600px] h-[500px] overflow-scroll md:p-4 p-2 mb-5">
        <div className="border-b">
          <h1 className="text-2xl py-2">Terms & Conditions</h1>
        </div>
        <div className="border-b py-4">
          {termsConditionList.map((item, index) => {
            return (
              <div className="mb-3" key={index}>
                <p className="text-xl capitalize mb-1">{item.title}:</p>
                <p className="text-gray-700">{item.text}</p>
              </div>
            );
          })}
          <p className="text-blue-400">
            By registering a profile on our platform, you acknowledge that you
            have read, understood, and agreed to these Terms and Conditions.
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={onClose}
          variant="outline"
          className="p-5"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};
export default TermsCondition;
