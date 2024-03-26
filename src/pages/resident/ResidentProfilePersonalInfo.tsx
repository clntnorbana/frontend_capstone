import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import UnauthorizedModal from "@/components/UnauthorizedModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateResidentMutation } from "@/redux/slices/resident.slice";
import { TResident } from "@/types";
import { formatDate, formatDateForInput } from "@/utils/format.date";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type ResidentProfilePersonalInfoProps = {
  resident: TResident | null;
  editMode: boolean;
  img: File | null;
  cancelEdit: () => void;
};

const ResidentProfilePersonalInfo = ({
  resident,
  editMode,
  img,
  cancelEdit,
}: ResidentProfilePersonalInfoProps) => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [middlename, setMiddlename] = useState<string>("");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [voter, setVoter] = useState<0 | 1>(0);
  const [date_of_birth, setDateOfBirth] = useState<string>("");
  const [place_of_birth, setPlaceOfBirth] = useState<string>("");
  const [citizenship, setCitizenship] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [civil_status, setCivilStatus] = useState<
    "single" | "married" | "widow/er" | "single parent"
  >("single");
  const [occupation, setOccupation] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [contact_no, setContactNo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number_street, setNumberStreet] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  useEffect(() => {
    if (resident) {
      setFirstname(resident.firstname);
      setLastname(resident.lastname);
      setMiddlename(resident.middlename);
      setSex(resident.sex);
      setVoter(resident.voter);
      setDateOfBirth(resident.date_of_birth);
      setPlaceOfBirth(resident.place_of_birth);
      setCitizenship(resident.citizenship);
      setReligion(resident.religion);
      setCivilStatus(resident.civil_status);
      setOccupation(resident.occupation);
      setCompany(resident.company);
      setContactNo(resident.contact_no);
      setEmail(resident.email);
      setNumberStreet(resident.number_street);
    }
  }, [resident]);

  // api call update resident
  const [updateResident, { isLoading }] = useUpdateResidentMutation();
  // handle update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const profile_id = resident?.profile_id;

    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("middlename", middlename);
      formData.append("sex", sex);
      formData.append("voter", String(voter));
      formData.append("date_of_birth", date_of_birth);
      formData.append("place_of_birth", place_of_birth);
      formData.append("citizenship", citizenship);
      formData.append("religion", religion);
      formData.append("civil_status", civil_status);
      formData.append("occupation", occupation);
      formData.append("company", company);
      formData.append("contact_no", contact_no);
      formData.append("email", email);
      formData.append("number_street", number_street);

      if (img) {
        formData.append("img", img);
      }

      const res = await updateResident({ data: formData, profile_id }).unwrap();
      setSuccessMsg(res.message);
      cancelEdit();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error as any).data.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (successMsg) {
        setSuccessMsg("");
      }
    }, 2000);
  }, [successMsg]);

  return (
    <div>
      {/* loading screen */}
      <Loader loading={isLoading} message="Updating profile, please wait..." />

      {/* unauthorized modal */}
      <UnauthorizedModal isOpen={error === "unauthorized"} />

      {/* success modal */}
      <Modal isOpen={successMsg !== ""}>
        <p>{successMsg}</p>
      </Modal>

      {error ? (
        <p className="p-3 mb-5 bg-red-300 text-center text-gray-50 font-bold relative">
          {error}
          <X
            className="absolute top-0 right-3 h-full cursor-pointer"
            onClick={() => setError("")}
          />
        </p>
      ) : null}

      <div
        className={`${
          editMode ? "top-0" : "top-[-60px]"
        } p-3 absolute left-0  w-full h-[60px] transition-all delay-200 flex justify-between items-center`}
      >
        <p className="h-full font-bold">
          Edit
          <span className="capitalize">
            {" "}
            {resident?.firstname} {resident?.lastname}'
            {resident?.lastname.charAt(resident.lastname.length - 1) === "s"
              ? ""
              : "s"}{" "}
          </span>
          profile?
        </p>
        <div className="space-x-1">
          <Button variant={"outline"} type="button" onClick={cancelEdit}>
            Cancel Edit
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800"
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <h1 className="text-gray-700 font-bold">Personal Information</h1>
      </div>
      <div className="grid grid-cols-2 space-x-5">
        {/* profile id */}
        <div>
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>Profile ID</label>
            <Input type="text" value={resident?.profile_id} disabled />
          </div>

          {/* first name */}
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>First name</label>
            <Input
              className="capitalize"
              type="text"
              placeholder="Enter first name"
              value={editMode ? firstname : resident?.firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          {/* lastname */}
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>Last name</label>
            <Input
              className="capitalize"
              type="text"
              placeholder="Enter last name"
              value={editMode ? lastname : resident?.lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          {/* Middlename */}
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>M.I</label>
            <Input
              className="capitalize"
              type="text"
              placeholder="Enter middle name"
              value={
                editMode
                  ? middlename
                  : resident?.middlename
                  ? resident.middlename
                  : "N/A"
              }
              onChange={(e) => setMiddlename(e.target.value)}
            />
          </div>

          {/* sex */}
          <div className="grid w-full items-center mb-2">
            <label className="font-medium">Legal Gender</label>
            <Select
              name="sex"
              value={editMode ? sex : resident?.sex}
              onValueChange={(value: "male" | "female") => setSex(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Legal Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* voter */}
          <div className="grid w-full items-center mb-2">
            <label className="font-medium">Voter</label>
            <Select
              name="voter"
              value={editMode ? String(voter) : String(resident?.voter)}
              onValueChange={(value: "0" | "1") =>
                setVoter(value === "1" ? 1 : 0)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select YES/NO" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* birthday */}
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>Birthdate</label>
            <Input
              type={editMode ? "date" : "text"}
              value={
                editMode
                  ? formatDateForInput(date_of_birth || "")
                  : formatDate(resident?.date_of_birth || "")
              }
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
        </div>

        <div>
          {/* birthplace */}
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>Birthplace</label>
            <Input
              className="capitalize"
              type="text"
              placeholder="Enter birthplace"
              value={editMode ? place_of_birth : resident?.place_of_birth}
              onChange={(e) => setPlaceOfBirth(e.target.value)}
            />
          </div>

          {/* Citizenship */}
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>Citizenship</label>
            <Input
              className="capitalize"
              type="text"
              placeholder="Enter citizenship"
              value={editMode ? citizenship : resident?.citizenship}
              onChange={(e) => setCitizenship(e.target.value)}
            />
          </div>

          {/* religion */}
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>Religion</label>
            <Input
              className="capitalize"
              type="text"
              placeholder="Enter Religion"
              value={editMode ? religion : resident?.religion}
              onChange={(e) => setReligion(e.target.value)}
            />
          </div>

          {/* civil status */}
          {/* voter */}
          <div className="grid w-full items-center mb-2">
            <label className="font-medium">Civil Status</label>
            <Select
              name="civil status"
              value={editMode ? civil_status : resident?.civil_status}
              onValueChange={(
                value: "single" | "married" | "widow/er" | "single parent"
              ) => setCivilStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select civil status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="widow/er">Window/er</SelectItem>
                  <SelectItem value="single parent">Single Parent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* occupaion */}
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>Occupation</label>
            <Input
              className="capitalize"
              type="text"
              placeholder="Enter occupation"
              value={editMode ? occupation : resident?.occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>

          {/* company */}
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>Company</label>
            <Input
              className="capitalize"
              type="text"
              placeholder="Enter company"
              value={editMode ? company : resident?.company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-gray-700 font-bold mb-4">Contact / Address</h1>
        <div className="grid grid-cols-2 space-x-5">
          {/* contact no */}
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>Phone #</label>
            <Input
              type="number"
              placeholder="Enter phone #"
              value={editMode ? contact_no : resident?.contact_no}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>

          {/* email */}
          <div className="grid w-full items-center gap-0.3 mb-2">
            <label>Email</label>
            <Input
              type="email"
              placeholder="Enter email"
              value={editMode ? email : resident?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* street number */}
        <div className="grid w-full items-center gap-0.3 mb-2">
          <label>Number / Street</label>
          <Input
            type="text"
            placeholder="Enter number / street address"
            value={editMode ? number_street : resident?.number_street}
            onChange={(e) => setNumberStreet(e.target.value)}
          />
        </div>

        {/* barangay */}
        <div className="grid w-full items-center gap-0.3 mb-2">
          <label>Barangay</label>
          <Input type="text" value={resident?.barangay} disabled />
        </div>

        {/* city */}
        <div className="grid w-full items-center gap-0.3 mb-2">
          <label>City</label>
          <Input type="text" value={resident?.city} disabled />
        </div>

        {/* zip code */}
        <div className="grid w-full items-center gap-0.3 mb-2">
          <label>Zip Code</label>
          <Input type="text" value={resident?.zip_code} disabled />
        </div>
      </div>
    </div>
  );
};
export default ResidentProfilePersonalInfo;
