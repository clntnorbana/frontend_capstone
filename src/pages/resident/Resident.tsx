import { useGetAllResidentsQuery } from "@/redux/slices/resident.slice";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Loader from "@/components/Loader";
import NotFound from "@/components/404";

const Residents = () => {
  const { data = [], isLoading } = useGetAllResidentsQuery();

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
              Registered Residents
            </h1>
            <DataTable columns={columns} data={data} />
          </div>
        </>
      ) : (
        <NotFound message="No registered residents yet." />
      )}
    </>
  );
};
export default Residents;
