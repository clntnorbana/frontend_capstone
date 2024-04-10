import { useGetEmployeeQuery } from "@/redux/slices/employee.slice";
import { TEmployee } from "@/types";
import default_pic from "../../assets/default_pic.jpg";
import { NavLink } from "react-router-dom";
import { formatDate } from "@/utils/format.date";
import { useAppSelector } from "@/redux/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import AccountCardDeleteModal from "./AccountCardDeleteModal";
import AccountCardUpdateRoleModal from "./AccountCardUpdateRoleModal";

type AccountCardProps = {
  account: TEmployee;
};

const AccountCard = ({ account }: AccountCardProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openUpdateRoleModal, setOpenUpdateRoleModal] =
    useState<boolean>(false);

  const userInfo = useAppSelector((state) => state.credentials.userInfo);
  const { data: employeeCurrent } = useGetEmployeeQuery(userInfo.employee_id);
  const employee = employeeCurrent ? employeeCurrent[0] : undefined;

  return (
    <>
      {/* delete modal */}
      <AccountCardDeleteModal
        onOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        account={account}
      />

      {/* update role modal */}
      <AccountCardUpdateRoleModal
        onOpen={openUpdateRoleModal}
        onClose={() => setOpenUpdateRoleModal(false)}
        account={account}
      />

      <NavLink
        to={`/account/setting/${account.employee_id}`}
        className="bg-gray-50 shadow p-10 rounded-lg w-[300px] flex flex-col justify-center items-center text-gray-700 border-gray-200 hover:bg-gray-100 relative"
      >
        {employee?.admin_role === "editor" && employee.username === "admin" ? (
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only"></span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  disabled={account.employee_id === employee.employee_id}
                  className="cursor-pointer"
                  onClick={() => setOpenUpdateRoleModal(true)}
                >
                  Set role to{" "}
                  {account.admin_role === "editor" ? "normal admin" : "editor"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={account.employee_id === employee.employee_id}
                  className="cursor-pointer"
                  onClick={() => setOpenDeleteModal(true)}
                >
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null}
        <div className="rounded-full h-[100px] w-[100px] flex justify-center items-center font-medium bg-gray-400 mb-3 overflow-hidden">
          {account.img_url ? (
            <img
              className="w-full h-full object-cover"
              src={account.img_url}
              alt="img"
            />
          ) : account.firstname && account.lastname ? (
            <span className="text-2xl font-bold text-white">
              {`${account.firstname} ${account.lastname}`
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase())
                .join("")}
            </span>
          ) : (
            <img src={default_pic} alt="default pic" />
          )}
        </div>

        <div className="text-center">
          {employee?.username === account.username ? (
            <p className="capitalize text-lg font-bold">{`${account.firstname} ${account.lastname}`}</p>
          ) : (
            <p className="capitalize text-lg font-bold">{`${account.firstname} ${account.lastname}`}</p>
          )}

          <p className="italic text-sm opacity-[0.8]">{account.email}</p>
          <p className="italic text-sm opacity-[0.8]">{account.contact_no}</p>
          <p className="italic text-sm opacity-[0.8] mt-5">
            Joined date: {formatDate(account.created_at || "")}
          </p>
        </div>

        {account.admin_role === "editor" ? (
          <p className="text-gray-500 absolute top-[5%] left-[5%] font-semibold">
            {account.username === "admin" ? "Root Admin" : "Editor"}
          </p>
        ) : null}
      </NavLink>
    </>
  );
};
export default AccountCard;
