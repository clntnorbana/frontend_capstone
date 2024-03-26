import Loader from "@/components/Loader";
import { useGetResidentByIdQuery } from "@/redux/slices/resident.slice";
import { formatDate } from "@/utils/format.date";
import { useParams } from "react-router-dom";
import ResidentProfilePersonalInfo from "./ResidentProfilePersonalInfo";
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ImagePreview from "@/components/ImagePreview";
import { Input } from "@/components/ui/input";
import ResidentDeleteModal from "./ResidentDeleteModal";
import NotFound from "@/components/404";
import { useAppSelector } from "@/redux/hooks";
import { useGetEmployeeQuery } from "@/redux/slices/employee.slice";

const ResidentProfile = () => {
  const { profile_id } = useParams();

  const [file, setFile] = useState<File | null>(null);
  const [fileProp, setFileProp] = useState<FileList | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const { data: residentInfo, isLoading } = useGetResidentByIdQuery(profile_id);
  const resident = residentInfo ? residentInfo[0] : null;

  const residentName = `${resident?.firstname} ${resident?.lastname}`;

  const employee = useAppSelector((state) => state.credentials.userInfo);
  const { data: employeeInfo } = useGetEmployeeQuery(employee.employee_id);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // handle image change, for profile picture of the resident
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileProp(e.target.files);
    }
  };

  // employee is editor?
  const isEditor = () => {
    return employeeInfo && employeeInfo[0].admin_role === "editor";
  };

  return (
    <>
      {/* delete profile modal */}
      <ResidentDeleteModal
        resident={resident}
        onOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />

      {isLoading ? (
        <Loader
          loading={isLoading}
          message="Fetching resident profile, please wait..."
        />
      ) : resident ? (
        <div>
          {/* header */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700 font-bold italic">
                Registered Date:{" "}
                <span>{formatDate(resident?.created_at || "")}</span>
              </p>
              <p className="text-gray-700 font-bold italic">
                Last Update :{" "}
                <span>{formatDate(resident?.updated_at || "")}</span>
              </p>
            </div>
            <div className="space-x-1">
              {!editMode ? (
                <Button
                  disabled={!isEditor()}
                  className="bg-blue-600 hover:bg-blue-800"
                  variant={"default"}
                  onClick={() => setEditMode(true)}
                >
                  Click here to edit
                </Button>
              ) : null}
              <Button
                disabled={!isEditor()}
                variant={"destructive"}
                onClick={() => setOpenDeleteModal(true)}
              >
                Delete this profile
              </Button>
            </div>
          </div>

          {/* body */}

          <div
            className={`border relative ${
              editMode ? "border-blue-800 border-[3px]" : "border-gray-200"
            } shadow rounded p-5 mt-5 relative overflow-hidden transition-all delay-200`}
          >
            {/* image */}
            <div className="flex justify-center mt-10">
              <div className="flex flex-col items-center mb-5">
                <div className="h-[170px] w-[170px] rounded-full overflow-hidden border border-gray-800">
                  {editMode && file ? (
                    <ImagePreview file={fileProp} />
                  ) : (
                    <>
                      {resident.img_url ? (
                        <img
                          className="h-full w-full object-cover"
                          src={resident?.img_url}
                          alt={resident?.img_url}
                        />
                      ) : (
                        <span>
                          {residentName
                            .split(" ")
                            .map((word) => word.charAt(0).toUpperCase())
                            .join("")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                {editMode ? (
                  <div className="my-4">
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      onClick={() => {
                        if (editMode && fileInputRef.current) {
                          fileInputRef.current.click();
                        }
                      }}
                    >
                      Update Image
                    </Button>
                    <Input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />
                  </div>
                ) : null}
                <p className="capitalize font-bold text-gray-700 text-2xl text-center">
                  {resident?.firstname}{" "}
                  {resident?.middlename ? resident.middlename : null}{" "}
                  {resident?.lastname}
                </p>
              </div>
            </div>

            {/* section */}
            <div>
              {/* personal information */}
              <ResidentProfilePersonalInfo
                resident={resident}
                editMode={editMode}
                img={file}
                cancelEdit={() => setEditMode(false)}
              />
            </div>
          </div>
        </div>
      ) : (
        <NotFound message="Profile Not Found." />
      )}
    </>
  );
};
export default ResidentProfile;
