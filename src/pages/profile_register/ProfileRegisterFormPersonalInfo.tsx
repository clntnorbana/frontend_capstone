import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent } from "react";
import { ProfileRegisterFormType } from "./ProfileRegisterForm";
import { grayTodayDate } from "@/utils/format.date";

type InfoPropTypes = ProfileRegisterFormType;

const ProfileRegisterFormPersonalInfo = ({
  info,
  handleInputChange,
}: InfoPropTypes) => {
  return (
    <>
      {/* firstname */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Firstname</label>
        <Input
          name="firstname"
          type="text"
          className="capitalize"
          placeholder="Enter first name"
          value={info.firstname}
          onChange={handleInputChange}
        />
      </div>
      {/* lastname */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Lastname</label>
        <Input
          name="lastname"
          type="text"
          className="capitalize"
          placeholder="Enter last name"
          value={info.lastname}
          onChange={handleInputChange}
        />
      </div>
      {/* middlename */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Middlename (optional)</label>
        <Input
          name="middlename"
          type="text"
          className="capitalize"
          placeholder="Enter middle name"
          value={info.middlename}
          onChange={handleInputChange}
        />
      </div>
      {/* sex */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Sex</label>
        <Select
          name="sex"
          value={info.sex}
          onValueChange={(value) =>
            handleInputChange({
              target: { name: "sex", value },
            } as ChangeEvent<HTMLInputElement | HTMLSelectElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sex" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* birthday */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="birthday">Birthday*</label>
        <Input
          name="date_of_birth"
          className="capitalize"
          type="date"
          id="birthday"
          value={info.date_of_birth}
          onChange={handleInputChange}
          max={grayTodayDate()}
        />
      </div>
      {/* birthplace */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="birthplace">Birthplace</label>
        <Input
          name="place_of_birth"
          className="capitalize"
          type="text"
          placeholder="Enter birth place"
          value={info.place_of_birth}
          onChange={handleInputChange}
        />
      </div>
      {/* citizenship */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="citizenship">Citizenship</label>
        <Input
          name="citizenship"
          className="capitalize"
          type="text"
          placeholder="enter citizenship"
          value={info.citizenship}
          onChange={handleInputChange}
        />
      </div>
      {/* civil status */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="civil_status">Civil Status</label>
        <Select
          name="civil_status"
          value={info.civil_status}
          onValueChange={(value) =>
            handleInputChange({
              target: { name: "civil_status", value },
            } as ChangeEvent<HTMLInputElement | HTMLSelectElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Civil Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="widow/er">Widow/er</SelectItem>
              <SelectItem value="single parent">Single Parent</SelectItem>
              <SelectItem value="separated">Separated</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* religion */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="religion">Religion (optional)</label>
        <Input
          name="religion"
          className="capitalize"
          type="text"
          placeholder="enter religion"
          value={info.religion}
          onChange={handleInputChange}
        />
      </div>
      {/* occupation */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="occupation">Occupation (optional)</label>
        <Input
          name="occupation"
          className="capitalize"
          type="text"
          placeholder="enter occupation"
          value={info.occupation}
          onChange={handleInputChange}
        />
      </div>
      {/* company */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="company">Company (optional)</label>
        <Input
          name="company"
          className="capitalize"
          type="text"
          placeholder="enter company"
          value={info.company}
          onChange={handleInputChange}
        />
      </div>
      {/* voter */}
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="civil_status">Voter</label>
        <Select
          name="voter"
          value={String(info.voter)}
          onValueChange={(value) =>
            handleInputChange({
              target: { name: "voter", value },
            } as ChangeEvent<HTMLInputElement | HTMLSelectElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Are you a registered voter?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="1">Yes</SelectItem>
              <SelectItem value="0">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
export default ProfileRegisterFormPersonalInfo;
