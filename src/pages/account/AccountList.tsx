import Loader from "@/components/Loader";
import { useGetAllEmployeesQuery } from "@/redux/slices/employee.slice";
import AccountCard from "./AccountCard";

const AccountList = () => {
  const { data: accounts, isLoading } = useGetAllEmployeesQuery();

  return (
    <>
      {/* loading screen */}
      <Loader loading={isLoading} message="Fetching accounts, please wait..." />
      <div className="flex flex-wrap gap-2">
        {accounts?.map((account) => {
          return <AccountCard key={account.employee_id} account={account} />;
        })}
      </div>
    </>
  );
};
export default AccountList;
