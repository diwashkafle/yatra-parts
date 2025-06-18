// 'use client'
// import Image from "next/image"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { Collapsible } from "../ui/collapsible";
// import { MdSpaceDashboard } from "react-icons/md";
// import { MdInventory } from "react-icons/md";
// import { FaShoppingBag } from "react-icons/fa";
// import { FaUsers } from "react-icons/fa";
// import Link from "next/link";


// // Menu items.
// const items = [
//   {
//     title: "Dashboard Overview",
//     url: "/admin",
//     icon: MdSpaceDashboard,
//   },
//   {
//     title: "Product Management",
//     url: "/admin/product-management",
//     icon: MdInventory,
//   },
//   {
//     title: "Order Management",
//     url: "/admin/order-management",
//     icon: FaShoppingBag,
//   },
//   {
//     title: "User Management",
//     url: "/admin/user-management",
//     icon: FaUsers,
//   },
// ]

// export default function SideMenu() {
//   return (
//     <Sidebar>
//       <SidebarContent className="mt-5">
//         <SidebarGroup className="space-y-5">
//           <SidebarGroupLabel>
//             <div className="flex items-center space-x-4">
//             <h1 className="text-3xl font-semibold ">YatraParts</h1>
//             <div className="text-sm">
//               <h1 className="text-black font-semibold">ADMIN</h1>
//               <p className="text-black">Dashboard</p>
//             </div>
//             </div>
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//             <Collapsible defaultOpen className="group/collapsible">
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//               </Collapsible>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   )
// }

'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdSpaceDashboard, MdInventory } from "react-icons/md";
import { FaShoppingBag, FaUsers } from "react-icons/fa";
import { useState } from "react";

type SubMenuItem = {
  title: string;
  url: string;
};

type MenuItem = {
  title: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SubMenuItem[];
};

const items: MenuItem[] = [
  {
    title: "Dashboard Overview",
    url: "/admin",
    icon: MdSpaceDashboard,
  },
  {
    title: "Product Management",
    icon: MdInventory,
    children: [
      { title: "All Products", url: "/admin/product-management/all-products" },
      { title: "Add Product", url: "/admin/product-management/add-product" },
      { title: "Categories", url: "/admin/product-management/categories" },
      { title: "Inventory", url: "/admin/product-management/inventory" },
    ],
  },
  {
    title: "Order Management",
    icon: FaShoppingBag,
    children: [
      { title: "All Orders", url: "/admin/order-management/all-orders" },
      { title: "Returns and Refunds", url: "/admin/order-management/returns-and-refunds" },
      { title: "Shipping status", url: "/admin/order-management/shipping-status" },
    ],
  },
  {
    title: "User Management",
    icon: FaUsers,
    children: [
      { title: "All Users", url: "/admin/user-management/all-users" },
      { title: "Roles & Permissions", url: "/admin/user-management/roles-and-permissions" },
      { title: "Blocked Users", url: "/admin/user-management/blocked-users" },
    ],
  },
];

export default function SideMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  const handleToggle = (idx: number) => {
    setOpen((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <Sidebar>
      <SidebarContent className="mt-5">
        <SidebarGroup className="space-y-5">
          <SidebarGroupLabel>
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-semibold">YatraParts</h1>
              <div className="text-sm">
                <h1 className="text-black font-semibold">ADMIN</h1>
                <p className="text-black">Dashboard</p>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item: MenuItem, idx: number) =>
                item.children ? (
                  <Collapsible
                    key={item.title}
                    open={!!open[idx]}
                    onOpenChange={() => handleToggle(idx)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="flex items-center gap-2">
                          <item.icon />
                          <span>{item.title}</span>
                          <span className="ml-auto">{open[idx] ? "▼" : "►"}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pl-8 flex flex-col gap-1 py-1">
                        {item.children.map((sub) => (
                          <SidebarMenuItem key={sub.title}>
                            <SidebarMenuButton asChild>
                              <Link
                                href={sub.url}
                                className={`flex items-center gap-2 text-sm ${
                                  pathname === sub.url
                                    ? "text-primary font-bold"
                                    : "text-gray-700"
                                }`}
                              >
                                <span>{sub.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url!}
                        className={`flex items-center gap-2 ${
                          pathname === item.url
                            ? "text-primary font-bold"
                            : "text-gray-800"
                        }`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
