import { useAppDispatch } from "@/redux/hooks";
import { Button } from "./ui/button";
import { useLogoutMutation } from "@/redux/slices/employee.slice";
import { removeCredentials } from "@/redux/slices/auth.slice";

type UnauthorizedModalProps = {
  isOpen: boolean;
};

const UnauthorizedModal = ({ isOpen }: UnauthorizedModalProps) => {
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
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        isOpen ? "visible bg-black/20" : "invisible"
      }`}
    >
      {isLoading ? (
        <p>Logging out...</p>
      ) : (
        <>
          <div
            className={`bg-white rounded-xl shadow- p-6 transition-all ${
              isOpen ? "scale-100 opacity-100 " : "scale-125 opacity-0"
            }`}
          >
            <p className="mb-3 text-lg">
              Not authorized, logout and login again as your session has
              expired.
            </p>
            <div className="flex justify-end">
              <Button type="submit" onClick={handleLogout} size={"sm"}>
                Logout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default UnauthorizedModal;
