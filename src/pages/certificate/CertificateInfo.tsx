import Loader from "@/components/Loader";
import {
  useApproveRequestMutation,
  useGetRequestByIdQuery,
  useUpdatePurposeMutation,
} from "@/redux/slices/certificate.slice";
import { useGetResidentByIdQuery } from "@/redux/slices/resident.slice";
import { daysAgo, formatDate } from "@/utils/format.date";
import { NavLink, useParams } from "react-router-dom";
import CertificateInfoImages from "./CertificateInfoImages";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCheck, X } from "lucide-react";
import CertificatePrint from "./CertificatePrint";
import { useAppSelector } from "@/redux/hooks";
import CertificateRejectModal from "./CertificateRejectModal";

const CertificateInfo = () => {
  const { transaction_id } = useParams();

  const [editPurpose, setEditPurpose] = useState<boolean>(false);
  const [newPurpose, setNewPurpose] = useState<string>("");
  const [updatePurposeError, setUpdatePurposeError] = useState<string>("");
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);

  const employeeInfo = useAppSelector((state) => state.credentials.userInfo);

  // request data
  const { data: requestInfo, isLoading: requestLoading } =
    useGetRequestByIdQuery(transaction_id);
  const request = requestInfo ? requestInfo[0] : undefined;

  useEffect(() => {
    if (request) {
      setNewPurpose(request.purpose);
    }
  }, [request]);

  // resident data
  const { data: residentInfo } = useGetResidentByIdQuery(request?.profile_id);
  const resident = residentInfo ? residentInfo[0] : undefined;

  // update purpose
  const [updatePupose] = useUpdatePurposeMutation();
  const handleUpdatePurpose = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const transaction_id = request?.transaction_id;
      const data = {
        newPurpose,
      };

      await updatePupose({ data, transaction_id }).unwrap();
      setEditPurpose(false);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setUpdatePurposeError((error as any).data.message);
    }
  };

  // approve request
  const [approveRequest, { isLoading: approveLoading }] =
    useApproveRequestMutation();
  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();

    const employee_id = employeeInfo.employee_id;
    const data = {
      employee_id,
    };

    await approveRequest({ data, transaction_id }).unwrap();
  };

  return (
    <>
      <CertificateRejectModal
        transaction_id={request?.transaction_id}
        onOpen={openRejectModal}
        onClose={() => setOpenRejectModal(false)}
      />

      {requestLoading ? (
        <Loader
          loading={requestLoading}
          message="Certificate request loading, please wait..."
        />
      ) : (
        <div>
          <div>
            <p
              className={`${
                request?.status === "approved"
                  ? "bg-green-500"
                  : request?.status === "rejected"
                  ? "bg-red-500"
                  : "bg-blue-500"
              } uppercase text-4xl p-3 text-gray-50`}
            >
              {request?.status === "approved"
                ? "Approved"
                : request?.status === "rejected"
                ? "Rejected"
                : "Pending"}
            </p>
          </div>
          <div className="mb-5">
            <p className="text-3xl text-gray-700">
              Request for Certificate of{" "}
              <span className="capitalize">{request?.certificate_type}</span>
            </p>
            <p className="my-3">by:</p>
          </div>
          <div className="flex justify-between items-center py-4">
            <NavLink
              to={`/resident/profile/${request?.profile_id}`}
              className="flex items-center space-x-1 hover:underline hover:text-gray-400 rounded"
            >
              <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                <img
                  className="w-full h-full object-cover"
                  src={resident?.img_url}
                  alt={resident?.img_url}
                />
              </div>

              <div>
                <p className="font-bold text-gray-700 capitalize">
                  {request?.request_by}
                </p>
                <p className="text-gray-400 text-sm">
                  {"<"}
                  {request?.profile_id}
                  {">"}
                </p>
              </div>
            </NavLink>
            <div>
              <p className="text-sm text-gray-400">
                {formatDate(request?.request_date || "")} (
                {daysAgo(request?.request_date || "")} days ago)
              </p>
            </div>

            {/* approve loading screen */}
            <Loader
              loading={approveLoading}
              message="Approving certificate request, please wait..."
            />

            {/* actions */}
            <div className="inline-flex">
              {request?.status === "pending" ? (
                <>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l flex items-center space-x-1 text-sm"
                    onClick={handleApprove}
                  >
                    <CheckCheck size={20} />
                    <span>Approve</span>
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r flex items-center space-x-1 text-sm"
                    onClick={() => setOpenRejectModal(true)}
                  >
                    <X size={20} />
                    <span>Reject</span>
                  </button>
                </>
              ) : null}
              {request?.status === "rejected" ? (
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r flex items-center space-x-1 text-sm">
                  <X size={20} />
                  <span>Undo</span>
                </button>
              ) : null}
            </div>
          </div>
          <div>
            <p className="italic text-gray-700 font-bold">
              Voter: <span>{resident?.voter == 1 ? "Yes" : "No"}</span>{" "}
            </p>
            <p className="italic text-gray-700">{request?.contact_no}</p>
            <p className="italic text-gray-700">
              {request?.email ? request.email : null}
            </p>
            <p className="italic text-gray-700 capitalize">
              {resident?.number_street}, {resident?.barangay}, {resident?.city}
            </p>

            <div className={`grid items-center gap-1.5 mt-5`}>
              <div className="flex space-x-2 items-center">
                <p className="font-bold text-gray-600">Purpose: </p>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setEditPurpose((prev) => !prev)}
                >
                  {editPurpose ? "Cancel Edit" : "Edit"}
                </button>
              </div>
              <div className={`${editPurpose && "flex space-x-2"}`}>
                <div>
                  {updatePurposeError ? (
                    <p className="p-2 bg-red-300 text-center font-bold text-gray-50">
                      {updatePurposeError}
                    </p>
                  ) : null}
                  <Input
                    className={`w-full ${
                      editPurpose ? "px-4" : "p-0 border-white"
                    } `}
                    type="text"
                    placeholder="Purpose"
                    value={editPurpose ? newPurpose : request?.purpose}
                    onChange={(e) => setNewPurpose(e.target.value)}
                    readOnly={!editPurpose}
                  />
                </div>
                {editPurpose ? (
                  <>
                    <Button
                      disabled={!newPurpose || newPurpose === request?.purpose}
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-800"
                      onClick={handleUpdatePurpose}
                    >
                      Save
                    </Button>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* images */}
          {request?.status === "approved" ? (
            <CertificatePrint
              transaction_id={request.transaction_id}
              certificateData={request}
            />
          ) : (
            <>
              {resident?.voter == 1 ? null : (
                <div className="mt-5 font-bold text-gray-700">
                  <p>Requirement/Document Screenshot:</p>
                  <div className="h-[500px] w-[500px] grid grid-cols-2 mt-2 gap-2">
                    {request?.images?.map((img, index) => {
                      return <CertificateInfoImages key={index} img={img} />;
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
export default CertificateInfo;
