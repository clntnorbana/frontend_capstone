import { useAppSelector } from "@/redux/hooks";
import AccountList from "./AccountList";
import { useGetEmployeeQuery } from "@/redux/slices/employee.slice";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AccountCreateModal from "./AccountCreateModal";

const Accounts = () => {
  const [openCreateModalAccount, setOpenCreateModalAccount] =
    useState<boolean>(false);

  const userInfo = useAppSelector((state) => state.credentials.userInfo);
  const { data: employee } = useGetEmployeeQuery(userInfo.employee_id);
  const employeeInfo = employee ? employee[0] : undefined;

  return (
    <div>
      <h1 className="text-xl mb-5 font-bold text-gray-600">Accounts</h1>
      {employeeInfo?.admin_role === "editor" ? (
        <Button
          className="mb-5"
          variant={"outline"}
          onClick={() => setOpenCreateModalAccount(true)}
        >
          Create an account
        </Button>
      ) : null}
      <AccountCreateModal
        onOpen={openCreateModalAccount}
        onClose={() => setOpenCreateModalAccount(false)}
      />
      <AccountList />
    </div>
  );
};
export default Accounts;
