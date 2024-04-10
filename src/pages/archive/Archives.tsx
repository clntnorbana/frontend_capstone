import Loader from "@/components/Loader";
import { useGetArchivesQuery } from "@/redux/slices/archive.slice";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import NotFound from "@/components/404";

const Archives = () => {
  const { data = [], isLoading } = useGetArchivesQuery();

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <Loader
            loading={isLoading}
            message="Fetching archives, please wait..."
          />

          <div>
            <h1 className="text-xl mb-b font-bold text-gray-600">Archives</h1>

            <DataTable columns={columns} data={data} />
          </div>
        </>
      ) : (
        <NotFound message="No archives yet." />
      )}
    </>
  );
};
export default Archives;
