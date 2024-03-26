import { useGetRequestCertificatesQuery } from "@/redux/slices/certificate.slice";
import { columns } from "./colums";
import { DataTable } from "./data-table";
import Loader from "@/components/Loader";

const Certificate = () => {
  const { data = [], isLoading } = useGetRequestCertificatesQuery();

  return (
    <>
      {isLoading ? (
        <Loader
          loading={isLoading}
          message="Fetching requests, please wait..."
        />
      ) : (
        <div>
          <h1 className="text-xl mb-5 font-bold text-gray-600">
            Certificate Requests
          </h1>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
};
export default Certificate;
