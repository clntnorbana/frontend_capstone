import Sidebar, { SidebarItem } from "./Sidebar";

import {
  LayoutDashboard,
  ScrollText,
  Users,
  Book,
  CircleUserRound,
} from "lucide-react";

const SidebarNav = () => {
  return (
    <Sidebar>
      <SidebarItem
        icon={<CircleUserRound size={20} />}
        text={"Accounts"}
        path="/accounts"
      />
      <SidebarItem
        icon={<LayoutDashboard size={20} />}
        text={"Dashboard"}
        path={"/dashboard"}
      />
      <SidebarItem
        icon={<Users size={20} />}
        text={"Registered Residents"}
        path={"/residents"}
      />
      <SidebarItem
        icon={<ScrollText size={20} />}
        text={"Certificate Requests"}
        path={"/certificates"}
      />
      <SidebarItem
        icon={<Book size={20} />}
        text={"Records"}
        path={"records"}
      />
    </Sidebar>
  );
};
export default SidebarNav;
