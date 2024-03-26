import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, useState } from "react";
import { RequestCertificateFormType } from "./RequestCertificateForm";
import { Input } from "@/components/ui/input";

type InfoPropTypes = RequestCertificateFormType;

const RequestCertificateFormSubmit = ({
  info,
  handleInputChange,
}: InfoPropTypes) => {
  const [boxChecked, setBoxChecked] = useState<boolean>(false);

  return (
    <>
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Certificate Type</label>
        <Select
          name="certificate_type"
          value={info.certificate_type}
          onValueChange={(value) =>
            handleInputChange &&
            handleInputChange({
              target: { name: "certificate_type", value },
            } as ChangeEvent<HTMLSelectElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Certificate Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="barangay clearance">
                Certificate of Barangay Clearance
              </SelectItem>
              <SelectItem value="indigency">
                Certificate of Indigency
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full items-center gap-1.5 mb-2">
        <label htmlFor="purpose-select">Purpose</label>
        {/* <Input type="text" disabled value={"Proof of Identity"} /> */}
        <Select
          disabled={boxChecked || info.certificate_type === ""}
          name="purpose-select"
          value={boxChecked ? "" : info.purpose}
          onValueChange={(value) =>
            handleInputChange &&
            handleInputChange({
              target: { name: "purpose", value },
            } as ChangeEvent<HTMLInputElement | HTMLSelectElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Purpose" />
          </SelectTrigger>
          <SelectContent>
            {info.certificate_type === "barangay clearance" ? (
              <SelectGroup>
                <SelectItem value="Employement Requirement">
                  Employment Requirement
                </SelectItem>
                <SelectItem value="Loan Requirement">
                  Loan Requirement
                </SelectItem>
                <SelectItem value="Bank Requirement">
                  Bank Requirement
                </SelectItem>
                <SelectItem value="First Time Jobseeker Requirement">
                  First Time Jobseeker Requirement
                </SelectItem>
                <SelectItem value="OSCA Requirement">
                  OSCA Requirement
                </SelectItem>
              </SelectGroup>
            ) : (
              <SelectGroup>
                <SelectItem value="Burial">Burial</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Medical">Medical</SelectItem>
              </SelectGroup>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2">
        <div className="flex space-x-2">
          <input
            type="checkbox"
            checked={boxChecked}
            onChange={(e) => {
              setBoxChecked && setBoxChecked(e.target.checked);
              info.purpose = "";
            }}
          />
          <p>Specify Purpose</p>
        </div>
        <Input
          placeholder="Type your purpose"
          type="text"
          name="purpose"
          value={!boxChecked ? "" : info.purpose}
          onChange={handleInputChange}
          disabled={!boxChecked}
        />
      </div>
    </>
  );
};
export default RequestCertificateFormSubmit;
