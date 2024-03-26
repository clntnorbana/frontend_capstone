import PublicNav from "@/components/PublicNav";
import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicPages = () => {
  const userInfo = useAppSelector((state) => state.credentials.userInfo);

  if (userInfo) {
    return <Navigate to={"/dashboard"} />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const showNav = location.pathname !== "/";

  return (
    <div>
      {showNav ? <PublicNav /> : null}
      <div
        className={`${showNav ? "container mx-auto lg:px-54 md:px-40" : ""}`}
      >
        <Outlet />
      </div>
    </div>
  );
};
export default PublicPages;
