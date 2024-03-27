import default_pic from "../assets/default_pic.jpg";
import { createContext, useContext, useState, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { ChevronFirst, ChevronLast } from "lucide-react";
import logo from "../assets/logo.png";
import { useGetEmployeeQuery } from "@/redux/slices/employee.slice";

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps>({
  expanded: true,
});

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true);

  // get current logged in user's data
  const userInfo = useAppSelector((state) => state.credentials?.userInfo);
  const { data = [], isLoading } = useGetEmployeeQuery(userInfo.employee_id);

  const employee = data[0] || null;
  const employeeName = `${employee?.firstname} ${employee?.lastname}`;

  return (
    <aside className="h-screen sticky top-0 z-10">
      <nav className="h-full flex flex-col bg-gray-50 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center border-b">
          <div className={`flex items-center ${expanded ? "mr-3" : "mr-0"}`}>
            <img
              className={`transition-all overflow-hidden ${
                expanded ? "w-20" : "w-0"
              }`}
              src={logo}
              alt="logo"
            />
            <p
              className={`text-lg font-medium transition-all text-gray-600 ${
                expanded ? "block opacity-1" : "hidden opacity-0"
              }`}
            >
              Barangay Malamig
            </p>
          </div>
          <button
            className={`p-1.5 rounded-lg bg-gray-100 hover:bg-gray-300 ${
              expanded && "absolute right-[-15px] border"
            }`}
            onClick={() => setExpanded((curr) => !curr)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t p-3">
          {isLoading ? (
            <p>loading...</p>
          ) : (
            <NavLink
              className={"flex hover:text-indigo-300"}
              to={"/account/setting"}
            >
              <div className="bg-gray-400 w-10 h-10 rounded-md flex justify-center items-center font-medium">
                {employee?.img_url ? (
                  <img
                    className="h-full w-full object-cover rounded-md"
                    src={employee?.img_url}
                    alt="image"
                  />
                ) : employeeName ? (
                  <span className="font-bold text-gray-50">
                    {employeeName
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase())
                      .join("")}
                  </span>
                ) : (
                  <img src={default_pic} alt="default pic" />
                )}
              </div>
              <div
                className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
              >
                <div className="leading-4">
                  <h4 className="font-medium capitalize">{employeeName}</h4>
                  <span className="text-xs text-gray-600">
                    {employee?.email}
                  </span>
                </div>
              </div>
            </NavLink>
          )}
        </div>
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  path: string;
}

export const SidebarItem = ({ icon, text, path }: SidebarItemProps) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <NavLink
      to={path}
      className={({ isActive }: { isActive: boolean }) =>
        `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          isActive
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`
      }
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        <span className="inline-block whitespace-nowrap">{text}</span>
      </span>

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6 whitespace-nowrap
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
};

export default Sidebar;
