import { useGetRequestCertificatesQuery } from "@/redux/slices/certificate.slice";
import { columns } from "./colums";
import { DataTable } from "./data-table";
import Loader from "@/components/Loader";
import NotFound from "@/components/404";

const Certificate = () => {
  const { data = [], isLoading } = useGetRequestCertificatesQuery();

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <Loader
            loading={isLoading}
            message="Fetching records, please wait..."
          />

          <div>
            <h1 className="text-xl mb-5 font-bold text-gray-600">
              Certificate Requests
            </h1>
            <DataTable columns={columns} data={data} />
          </div>
        </>
      ) : (
        <NotFound message="No requests yet." />
      )}
    </>
  );
};
export default Certificate;
