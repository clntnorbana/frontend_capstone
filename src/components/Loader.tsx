import { SyncLoader } from "react-spinners";
import Modal from "./Modal";

type LoaderProps = {
  loading: boolean;
  message?: string;
};

const Loader = ({ loading, message }: LoaderProps) => {
  return (
    <Modal isOpen={loading}>
      <div className="flex flex-col justify-center items-center z-50">
        <SyncLoader color="#ddd" />
        <div className="mt-5">
          <p className="italic font-bold text-gray-700">{message}</p>
        </div>
      </div>
    </Modal>
  );
};
export default Loader;
