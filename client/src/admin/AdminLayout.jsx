// import { NavLink, Outlet } from "react-router-dom";
// import {
//   HiOutlineViewGrid, HiOutlineCake, HiOutlineClipboardList,
//   HiOutlineUsers, HiOutlineCalendar, HiOutlineTag,
// } from "react-icons/hi";

// const links = [
//   { to: "/admin", label: "Dashboard", icon: <HiOutlineViewGrid />, end: true },
//   { to: "/admin/products", label: "Menu Items", icon: <HiOutlineCake /> },
//   { to: "/admin/categories", label: "Categories", icon: <HiOutlineTag /> },
//   { to: "/admin/orders", label: "Orders", icon: <HiOutlineClipboardList /> },
//   { to: "/admin/reservations", label: "Reservations", icon: <HiOutlineCalendar /> },
//   { to: "/admin/users", label: "Users", icon: <HiOutlineUsers /> },
// ];

// const AdminLayout = () => (
//   <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 grid md:grid-cols-[220px_1fr] gap-8">
//     <aside className="md:sticky md:top-24 h-fit">
//       <p className="text-xs uppercase tracking-wider text-espresso-400 mb-3 px-2">Admin Panel</p>
//       <nav className="flex md:flex-col gap-1 overflow-x-auto">
//         {links.map((l) => (
//           <NavLink
//             key={l.to}
//             to={l.to}
//             end={l.end}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap ${
//                 isActive ? "bg-espresso-700 text-cream-50" : "text-espresso-600 hover:bg-cream-100"
//               }`
//             }
//           >
//             <span className="text-lg">{l.icon}</span>
//             {l.label}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//     <div>
//       <Outlet />
//     </div>
//   </div>
// );

// export default AdminLayout;
import { NavLink, Outlet } from "react-router-dom";

import {
  HiOutlineViewGrid,
  HiOutlineCake,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineTag,
} from "react-icons/hi";

const links = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: <HiOutlineViewGrid />,
    end: true,
  },
  {
    to: "/admin/products",
    label: "Menu Items",
    icon: <HiOutlineCake />,
  },
  {
    to: "/admin/categories",
    label: "Categories",
    icon: <HiOutlineTag />,
  },
  {
    to: "/admin/orders",
    label: "Orders",
    icon: <HiOutlineClipboardList />,
  },
  {
    to: "/admin/reservations",
    label: "Reservations",
    icon: <HiOutlineCalendar />,
  },
  {
    to: "/admin/users",
    label: "Users",
    icon: <HiOutlineUsers />,
  },
];

const AdminLayout = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-10 py-8 md:py-10 grid md:grid-cols-[220px_1fr] gap-8">

      {/* Sidebar */}
      <aside className="md:sticky md:top-24 h-fit">

        <p className="text-xs uppercase tracking-wider text-espresso-400 mb-3 px-2">
          {/* Admin Panel */}
        </p>

        <nav className="flex md:flex-col gap-1 overflow-x-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                  isActive
                    ? "bg-espresso-700 text-cream-50"
                    : "text-espresso-600 hover:bg-cream-100"
                }`
              }
            >
              <span className="text-lg">
                {link.icon}
              </span>

              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Page Content */}
      <main className="min-w-0">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;