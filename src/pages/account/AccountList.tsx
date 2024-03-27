import Loader from "@/components/Loader";
import { useGetAllEmployeesQuery } from "@/redux/slices/employee.slice";
import AccountCard from "./AccountCard";
import NotFound from "@/components/404";

const AccountList = () => {
  const { data: accounts, isLoading } = useGetAllEmployeesQuery();

  return (
    <>
      {accounts && accounts.length > 0 ? (
        <>
          {/* loading screen */}
          <Loader
            loading={isLoading}
            message="Fetching accounts, please wait..."
          />
          <div className="flex flex-wrap gap-2">
            {accounts?.map((account) => {
              return (
                <AccountCard key={account.employee_id} account={account} />
              );
            })}
          </div>
        </>
      ) : (
        <NotFound message="No accounts created yet." />
      )}
    </>
  );
};
export default AccountList;
