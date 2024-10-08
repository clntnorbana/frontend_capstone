import Modal from "@/components/Modal";
import ProfileForm from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetRequestByIdQuery } from "@/redux/slices/certificate.slice";
import { useGetResidentByIdQuery } from "@/redux/slices/resident.slice";
import { formatDate } from "@/utils/format.date";
import { Download, Info, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

type HomeSearchRequestProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HomeSearchRequest = ({ isOpen, onClose }: HomeSearchRequestProps) => {
  const [transactionId, setTransactionId] = useState<string>("");

  const { data: request, isLoading } = useGetRequestByIdQuery(
    transactionId ? transactionId : undefined
  );
  const profile_id =
    request && request[0] && request[0].profile_id
      ? request[0].profile_id
      : null;

  const { data: resident } = useGetResidentByIdQuery(profile_id);

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal isOpen={isOpen}>
      <div className="lg:w-[500px] w-full">
        <X
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => {
            setTransactionId(""), onClose();
          }}
        />

        <header className="mb-3">
          <h1 className="font-bold text-gray-700">Check your request status</h1>
        </header>
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter 12 digit transaction ID"
            onChange={(e) => setTransactionId(e.target.value)}
            value={transactionId}
            maxLength={12}
          />
          <Search className="absolute h-full top-0 right-3 hidden lg:block" />
        </div>

        {/* request */}
        {transactionId && transactionId.length === 12 ? (
          isLoading ? (
            <p>loading...</p>
          ) : request && request.length > 0 ? (
            <div className="flex flex-col justify-center items-center mt-5">
              <h1
                className={`${
                  request[0].status === "approved"
                    ? "text-green-600"
                    : request[0].status === "rejected"
                    ? "text-red-600"
                    : "text-gray-700"
                } font-bold text-gray-700 mb-4 text-lg uppercase`}
              >
                {request[0].status}
              </h1>
              <div className="text-center">
                <p className="italic">
                  Request for certificate of{" "}
                  <span className="capitalize font-bold text-gray-700">
                    {request[0].certificate_type}
                  </span>{" "}
                </p>
                <p className="italic">
                  Request by{" "}
                  <span className="capitalize font-bold text-gray-700">
                    {request[0].request_by}
                  </span>{" "}
                </p>

                <p className="italic">
                  Request date,{" "}
                  <span className="font-bold text-gray-700">
                    {formatDate(request[0].request_date || "")}
                  </span>
                </p>
              </div>

              <div className="my-5">
                <p
                  className={`${
                    request[0].status === "approved"
                      ? "bg-green-100"
                      : request[0].status === "rejected"
                      ? "bg-red-100"
                      : "bg-blue-100"
                  } p-4 leading-4 flex flex-col space-y-3 justify-center items-center rounded `}
                >
                  <Info />
                  <span>
                    {request[0].status === "approved"
                      ? "Your request for obtaining a certificate of BARANGAY CLEARANCE has been approved. Download and print the profiling form and proceed to barangay to get the document."
                      : request[0].status === "rejected"
                      ? "If your request is rejected, it may be due to discrepancies or inaccuracies in the information provided. Make a request again and please double-check the details and ensure they match your official records."
                      : "Your request for obtaining a certificate of BARANGAY CLEARANCE is currently pending approval. We appreciate your patience, and we will notify you once the request has been processed."}
                  </span>
                </p>
              </div>

              {/* print profile form */}
              {request[0].status === "approved" ? (
                <>
                  <Button variant={"outline"} onClick={handlePrint}>
                    Download Profile Form <Download size={15} />{" "}
                  </Button>
                  <div className="hidden">
                    <ProfileForm
                      ref={componentRef}
                      residentData={resident}
                      requestData={request}
                    />
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <p className="text-center mt-5">no result</p>
          )
        ) : null}
      </div>
    </Modal>
  );
};
export default HomeSearchRequest;
