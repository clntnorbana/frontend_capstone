import { useGetAllRecordsQuery } from "@/redux/slices/record.slice";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Loader from "@/components/Loader";
import NotFound from "@/components/404";

const Records = () => {
  const { data = [], isLoading } = useGetAllRecordsQuery();

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <Loader
            loading={isLoading}
            message="Fetching records, please wait..."
          />

          <div>
            <h1 className="text-xl mb-5 font-bold text-gray-600">Records</h1>
            <DataTable columns={columns} data={data} />
          </div>
        </>
      ) : (
        <NotFound message="No records yet." />
      )}
    </>
  );
};
export default Records;
