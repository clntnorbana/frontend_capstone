import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from "./Modal";
import { NavLink } from "react-router-dom";
import { removeCredentials } from "@/redux/slices/auth.slice";
import { useLogoutMutation } from "@/redux/slices/employee.slice";

const PrivateHeader = () => {
  const userInfo = useAppSelector((state) => state.credentials.userInfo);

  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(removeCredentials({}));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="p-3">
      <Modal isOpen={isLoading}>
        <p>logging out...</p>
      </Modal>
      <div className="flex justify-end items-center space-x-2">
        <NavLink
          to={`/account/setting/`}
          className="font-semibold text-gray-500 hover:underline flex flex-col leading-3"
        >
          <span>{userInfo.username} </span>
          <span className="italic font-normal text-sm">
            ({userInfo.employee_id})
          </span>{" "}
        </NavLink>
        <Button variant={"outline"} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default PrivateHeader;
