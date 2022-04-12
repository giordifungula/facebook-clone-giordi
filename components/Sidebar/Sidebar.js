import React from "react";
import {
  ChevronDoubleDownIcon,
  ClockIcon,
  DesktopComputerIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { ShoppingBagIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
// Sidebar
import SidebarRow from "./SidebarRow";

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="p-2 mt-5 max-w-[680px] xl:min-w-[300px]">
      <SidebarRow src={session?.user.image} title={session?.user.name} />
      <SidebarRow Icon={UserGroupIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDoubleDownIcon} title="See More" />
    </div>
  );
}
