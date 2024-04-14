import { forwardRef } from "react";
import CertificateHeader from "../certificate/CertificateHeader";
import { TypeRecord } from "@/redux/slices/record.slice";
import { formatDate, getCurrentDateFormatted } from "@/utils/format.date";

type RecordPrintProps = {
  data: TypeRecord | undefined;
};

const RecordPrint = forwardRef<HTMLDivElement, RecordPrintProps>(
  ({ data: records }, ref) => {
    return (
      <div className="hidden">
        <div ref={ref} className="w-screen py-20 px-10">
          <CertificateHeader />
          <div>
            <div className="my-4 border-b pb-2 flex justify-between">
              <p className="font-bold">List of approved requests</p>
              <p>
                <span className="italic">Printed on</span>{" "}
                <span className="font-bold">{getCurrentDateFormatted()}</span>
              </p>
            </div>
            <table className="w-full">
              <thead className="text-[12px]">
                <tr className="text-center">
                  <th>Transaction ID</th>
                  <th>Certificate Type</th>
                  <th>Profile ID</th>
                  <th>Request By</th>
                  <th>Phone #</th>
                  <th>Request Date</th>
                  <th>Committed By</th>
                  <th>Committed Date</th>
                </tr>
              </thead>
              <tbody className="text-header text-[12px]">
                {records?.map((item) => {
                  return (
                    <tr key={item.id} className="text-center">
                      <td>{item.transaction_id}</td>
                      <td className="capitalize">{item.certificate_type}</td>
                      <td>{item.profile_id}</td>
                      <td className="capitalize">{item.resident_name}</td>
                      <td>{item.resident_contact_no}</td>
                      <td>{formatDate(item.request_date)}</td>
                      <td className="capitalize">{item.committed_by}</td>
                      <td>{formatDate(item.committed_date)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

export default RecordPrint;
