import ImagePreview from "@/components/ImagePreview";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from "@/redux/slices/employee.slice";
import { Edit2, KeyRound, Trash2 } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import AccountSettingUpdatePassword from "./AccountSettingUpdatePassword";
import AccountSettingDeleteAccount from "./AccountSettingDeleteAccount";
import UnauthorizedModal from "@/components/UnauthorizedModal";

const Accountsetting = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [middlename, setMiddlename] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [contactNo, setContactNo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileProp, setFileProp] = useState<FileList | null>(null);
  const [error, setError] = useState<string>("");

  const employeeInfo = useAppSelector((state) => state.credentials.userInfo);

  const { data: employeeData, isLoading: employeeDataLoading } =
    useGetEmployeeQuery(employeeInfo.employee_id);
  const employee = employeeData ? employeeData[0] : undefined;
  const employeeName = `${employee?.firstname} ${employee?.lastname}`;

  useEffect(() => {
    if (employee) {
      setFirstname(employee.firstname);
      setLastname(employee.lastname);
      setMiddlename(employee.middlename && employee.middlename);
      setUsername(employee.username);
      setContactNo(employee.contact_no);
      setEmail(employee.email);
    }
  }, [employee]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // handle image change, for profile picture of the resident
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileProp(e.target.files);
    }
  };

  // handle update
  const [updateEmployee, { isLoading: employeeUpdateLoading }] =
    useUpdateEmployeeMutation();
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const employee_id = employee?.employee_id;
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("middlename", middlename);
      formData.append("username", username);
      formData.append("contact_no", contactNo);
      formData.append("email", email);
      formData.append("password", password);

      if (file) {
        formData.append("img", file);
      }

      await updateEmployee({ data: formData, employee_id }).unwrap();
      setPassword("");
      setEditMode(false);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  useEffect(() => {
    if (error && error !== "unauthorized") {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <>
      {/* delete account modal */}
      <AccountSettingDeleteAccount
        onOpen={deleteAccount}
        onClose={() => setDeleteAccount(false)}
        employee_id={employee?.employee_id}
      />

      {/* change password modal */}
      <AccountSettingUpdatePassword
        onOpen={changePassword}
        onClose={() => setChangePassword(false)}
        employee_id={employee?.employee_id}
      />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      {/* loading screen */}
      {employeeDataLoading ? (
        <Loader
          loading={employeeDataLoading}
          message="Fetching information, please wait..."
        />
      ) : (
        <div>
          {/* loading screen */}
          <Loader
            loading={employeeUpdateLoading}
            message="Updating information, please wait..."
          />

          <div className="max-w-[600px] mx-auto">
            {/* actions */}
            <div className="flex space-x-4 mb-20 justify-center">
              <button
                className="flex items-center text-blue-500 text-sm hover:underline"
                onClick={() => setEditMode((prev) => !prev)}
              >
                {editMode ? (
                  "Cancel Edit"
                ) : (
                  <>
                    Edit <Edit2 size={15} className="ml-1" />{" "}
                  </>
                )}
              </button>

              {!editMode ? (
                <>
                  <button
                    className="flex items-center text-gray-600 text-sm hover:underline"
                    onClick={() => setChangePassword(true)}
                  >
                    Change Password <KeyRound size={15} className="ml-1" />
                  </button>

                  <button
                    className="flex items-center text-red-500 text-sm hover:underline"
                    onClick={() => setDeleteAccount(true)}
                  >
                    Delete Account <Trash2 size={15} className="ml-1" />
                  </button>
                </>
              ) : null}
            </div>
            <div className="flex flex-col justify-center items-center mb-4">
              {/* image */}
              <div className="w-[150px] h-[150px] rounded-full flex justify-center items-center bg-gray-300 overflow-hidden">
                {editMode && file ? (
                  <ImagePreview file={fileProp} />
                ) : (
                  <>
                    {employee?.img_url ? (
                      <img
                        className="w-full h-full"
                        src={employee.img_url}
                        alt={employee.img_url}
                      />
                    ) : (
                      <span className="w-full h-full text-white flex justify-center items-center text-4xl font-bold">
                        {employeeName
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
            </div>
            <div className="grid grid-cols-2 space-x-4">
              <div>
                <div className="grid max-w-sm items-center mb-2">
                  <label className="text-sm font-semibold text-gray-400">
                    ID
                  </label>
                  <Input value={employee?.employee_id} disabled />
                </div>

                {/* firstname */}
                <div className="grid max-w-sm items-center mb-2">
                  <label className="text-sm font-semibold text-gray-400">
                    Firstname
                  </label>
                  <Input
                    disabled={!editMode}
                    type="text"
                    placeholder="Enter firstname"
                    value={editMode ? firstname : employee?.firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>

                {/* lastname */}
                <div className="grid max-w-sm items-center mb-2">
                  <label className="text-sm font-semibold text-gray-400">
                    Lastname
                  </label>
                  <Input
                    disabled={!editMode}
                    type="text"
                    placeholder="Enter lastname"
                    value={editMode ? lastname : employee?.lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>

                {/* middlename */}
                <div className="grid max-w-sm items-center mb-2">
                  <label className="text-sm font-semibold text-gray-400">
                    M.I.
                  </label>
                  <Input
                    disabled={!editMode}
                    type="text"
                    placeholder="N/A"
                    value={
                      editMode
                        ? middlename
                        : employee?.middlename !== null
                        ? employee?.middlename
                        : ""
                    }
                    onChange={(e) => setMiddlename(e.target.value)}
                  />
                </div>
              </div>

              <div>
                {/* username */}
                <div className="grid max-w-sm items-center mb-2">
                  <label className="text-sm font-semibold text-gray-400">
                    Username
                  </label>
                  <Input
                    disabled={!editMode}
                    type="text"
                    placeholder="Enter username"
                    value={editMode ? username : employee?.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* contact */}
                <div className="grid max-w-sm items-center mb-2">
                  <label className="text-sm font-semibold text-gray-400">
                    Phone
                  </label>
                  <Input
                    disabled={!editMode}
                    type="number"
                    placeholder="e.g, 09123456789"
                    value={editMode ? contactNo : employee?.contact_no}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </div>

                {/* email */}
                <div className="grid max-w-sm items-center mb-2">
                  <label className="text-sm font-semibold text-gray-400">
                    Email
                  </label>
                  <Input
                    disabled={!editMode}
                    type="email"
                    placeholder="Enter email"
                    value={editMode ? email : employee?.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {editMode ? (
                  // password
                  <div className="grid max-w-sm items-center mb-2">
                    <label className="text-sm font-semibold text-gray-400">
                      Password
                    </label>
                    <Input
                      disabled={!editMode}
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            {editMode ? (
              <>
                {error && error !== "unauthorized" ? (
                  <p className="p-3 bg-red-300 text-gray-50 font-bold">
                    {error}
                  </p>
                ) : null}
                <div className="flex justify-end ">
                  <Button
                    className="mt-4 bg-blue-600 hover:bg-blue-500"
                    type="submit"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Accountsetting;
