import PrivateHeader from "@/components/PrivateNav";
import SidebarNav from "@/components/SidebarNav";
import { useAppSelector } from "@/redux/hooks";
import { Navigate, useOutlet } from "react-router-dom";

const PrivatePages = () => {
  const userInfo = useAppSelector((state) => state.credentials.userInfo);
  const outlet = useOutlet();

  if (!userInfo) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex">
      <SidebarNav />
      <div className="w-full">
        <PrivateHeader />
        <div className="p-5 w-full">{outlet}</div>
      </div>
    </div>
  );
};
export default PrivatePages;
