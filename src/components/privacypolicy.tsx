import Modal from "./Modal";
import { Button } from "./ui/button";

type PrivacyPolicyProps = {
  onOpen: boolean;
  onClose: () => void;
};

const Privacypolicy = ({ onOpen, onClose }: PrivacyPolicyProps) => {
  return (
    <Modal isOpen={onOpen}>
      <div className="max-w-[600px] h-[500px] overflow-scroll md:p-4 p-2 mb-5">
        <div className="border-b">
          <h1 className="text-2xl py-2">Privacy Policy</h1>
        </div>
        <div className="border-b py-4">
          <p>
            Welcome to Barangay Malamig Request Services System. This privacy
            policy explains how we collect, use, and protect your personal
            information when you use our website.
          </p>
          <div className="mt-5">
            <p className="font-bold text-gray-700">Information we collect</p>
            <p>We may collect the following types of information:</p>
            <div>
              <p>1. Personal Information</p>
              <p>2. Contact Information</p>
              <p>3. Contact Address</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="font-bold text-gray-700">
              How we collect your information
            </p>
            <div>
              <p>We collect your information when you:</p>
              <div>
                <p>1. Create a profile</p>
                <p>2. Make request certificate</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="font-bold text-gray-700">
              We collect information for the following purposes:
            </p>
            <div>
              <p>1. For profiling</p>
              <p>2. To provide and maintain our services</p>
              <p>3. To process your request certificate</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="font-bold text-gray-700">Policy updates</p>
            <div>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="font-bold text-gray-700">Contact Us</p>
            <div>
              <p>
                If you have any questions or concerns about our Privacy Policy,
                please contact us at barangaymalamig@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          className="p-5"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};
export default Privacypolicy;
