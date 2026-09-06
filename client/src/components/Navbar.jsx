// // import { useState } from "react";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { HiOutlineShoppingBag, HiOutlineMenu, HiOutlineX, HiOutlineUser } from "react-icons/hi";
// // import { useAuth } from "../context/AuthContext";
// // import { useCart } from "../context/CartContext";

// // const navLinkClass = ({ isActive }) =>
// //   `text-sm font-medium tracking-wide transition-colors ${
// //     isActive ? "text-cinnamon-500" : "text-espresso-700 hover:text-cinnamon-500"
// //   }`;

// // const Navbar = () => {
// //   const [open, setOpen] = useState(false);
// //   const { user, logout } = useAuth();
// //   const { totalItems } = useCart();
// //   const navigate = useNavigate();

// //   return (
// //     <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur border-b border-espresso-100">
// //       <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-20">
// //         <Link to="/" className="flex items-center gap-2">
// //           <span className="text-3xl">☕</span>
// //           <span className="font-display text-2xl font-semibold text-espresso-800">
// //             Brew & Bite
// //           </span>
// //         </Link>

// //         <nav className="hidden md:flex items-center gap-8">
// //           <NavLink to="/" className={navLinkClass} end>Home</NavLink>
// //           <NavLink to="/menu" className={navLinkClass}>Menu</NavLink>
// //           <NavLink to="/reservation" className={navLinkClass}>Reserve a Table</NavLink>
// //           {user && <NavLink to="/orders" className={navLinkClass}>My Orders</NavLink>}
// //           {user?.role === "admin" && <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>}
// //         </nav>

// //         <div className="hidden md:flex items-center gap-5">
// //           <Link to="/cart" className="relative text-espresso-800 hover:text-cinnamon-500">
// //             <HiOutlineShoppingBag className="w-6 h-6" />
// //             {totalItems > 0 && (
// //               <span className="absolute -top-2 -right-2 bg-cinnamon-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
// //                 {totalItems}
// //               </span>
// //             )}
// //           </Link>

// //           {user ? (
// //             <div className="flex items-center gap-3">
// //               <Link to="/profile" className="flex items-center gap-1 text-sm font-medium text-espresso-800 hover:text-cinnamon-500">
// //                 <HiOutlineUser className="w-5 h-5" /> {user.name?.split(" ")[0]}
// //               </Link>
// //               <button
// //                 onClick={() => { logout(); navigate("/"); }}
// //                 className="text-sm text-espresso-500 hover:text-cinnamon-600"
// //               >
// //                 Log out
// //               </button>
// //             </div>
// //           ) : (
// //             <Link to="/login" className="btn-primary !py-2 !px-5 text-sm">Sign in</Link>
// //           )}
// //         </div>

// //         <button className="md:hidden text-espresso-800" onClick={() => setOpen(!open)}>
// //           {open ? <HiOutlineX className="w-7 h-7" /> : <HiOutlineMenu className="w-7 h-7" />}
// //         </button>
// //       </div>

// //       {open && (
// //         <div className="md:hidden bg-cream-50 border-t border-espresso-100 px-5 py-4 flex flex-col gap-4">
// //           <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass} end>Home</NavLink>
// //           <NavLink to="/menu" onClick={() => setOpen(false)} className={navLinkClass}>Menu</NavLink>
// //           <NavLink to="/reservation" onClick={() => setOpen(false)} className={navLinkClass}>Reserve a Table</NavLink>
// //           <NavLink to="/cart" onClick={() => setOpen(false)} className={navLinkClass}>Cart ({totalItems})</NavLink>
// //           {user && <NavLink to="/orders" onClick={() => setOpen(false)} className={navLinkClass}>My Orders</NavLink>}
// //           {user?.role === "admin" && <NavLink to="/admin" onClick={() => setOpen(false)} className={navLinkClass}>Admin</NavLink>}
// //           {user ? (
// //             <button onClick={() => { logout(); setOpen(false); navigate("/"); }} className="text-left text-sm text-espresso-500">
// //               Log out
// //             </button>
// //           ) : (
// //             <Link to="/login" onClick={() => setOpen(false)} className="btn-primary text-center !py-2">Sign in</Link>
// //           )}
// //         </div>
// //       )}
// //     </header>
// //   );
// // };

// // export default Navbar;
// import { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import {
//   HiOutlineShoppingBag,
//   HiOutlineMenu,
//   HiOutlineX,
//   HiOutlineUser,
// } from "react-icons/hi";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";

// const navLinkClass = ({ isActive }) =>
//   `relative text-sm font-medium tracking-wide transition-all duration-200 ${
//     isActive
//       ? "text-cinnamon-500"
//       : "text-espresso-700 hover:text-cinnamon-500"
//   }`;

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const { totalItems } = useCart();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     setOpen(false);
//     navigate("/");
//   };

//   return (
//     <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-espresso-100 shadow-sm">
//       <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-10">
//         <div className="h-20 flex items-center justify-between">

//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-2.5 shrink-0"
//           >
//             <span className="text-3xl leading-none">☕</span>

//             <span className="font-display text-xl sm:text-2xl font-semibold text-espresso-800 whitespace-nowrap">
//               Brew & Bite
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center gap-7 xl:gap-9 ml-8  md:flex ">
//             <NavLink to="/" className={navLinkClass} end>
//               Home
//             </NavLink>

//             <NavLink to="/menu" className={navLinkClass}>
//               Menu
//             </NavLink>

//             <NavLink to="/reservation" className={navLinkClass}>
//               Reserve a Table
//             </NavLink>

//             {user && (
//               <NavLink to="/orders" className={navLinkClass}>
//                 My Orders
//               </NavLink>
//             )}

//             {user?.role === "admin" && (
//               <NavLink to="/admin" className={navLinkClass}>
//                 Admin
//               </NavLink>
//             )}
//           </nav>

//           {/* Right Side */}
//           <div className="hidden md:flex items-center gap-4 ml-auto">

//             {/* Cart */}
//             <Link
//               to="/cart"
//               className="relative flex items-center justify-center w-10 h-10 rounded-full text-espresso-800 hover:bg-cinnamon-50 hover:text-cinnamon-500 transition-all duration-200"
//               aria-label="Shopping cart"
//             >
//               <HiOutlineShoppingBag className="w-6 h-6" />

//               {totalItems > 0 && (
//                 <span className="absolute -top-0.5 -right-0.5 bg-cinnamon-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream-50">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>

//             {/* User */}
//             {user ? (
//               <div className="flex items-center gap-2 pl-3 border-l border-espresso-100">

//                 {/* Profile */}
//                 <Link
//                   to="/profile"
//                   className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-cinnamon-50 transition-all duration-200"
//                 >
//                   <span className="flex items-center justify-center w-9 h-9 rounded-full bg-cinnamon-100 text-cinnamon-600">
//                     <HiOutlineUser className="w-5 h-5" />
//                   </span>

//                   <span className="hidden xl:block text-sm font-semibold text-espresso-800 max-w-[100px] truncate">
//                     {user.name?.split(" ")[0]}
//                   </span>
//                 </Link>

//                 {/* Logout Button */}
//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-2 rounded-lg border border-espresso-200 text-sm font-medium text-espresso-500 hover:bg-espresso-600 hover:text-white hover:border-espresso-800 transition-all duration-200"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="btn-primary !py-2.5 !px-5 text-sm font-medium"
//               >
//                 Sign in
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-espresso-800 hover:bg-cinnamon-50 transition"
//             onClick={() => setOpen(!open)}
//             aria-label="Toggle menu"
//           >
//             {open ? (
//               <HiOutlineX className="w-7 h-7" />
//             ) : (
//               <HiOutlineMenu className="w-7 h-7" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden bg-cream-50 border-t border-espresso-100 shadow-lg">
//           <div className="px-5 sm:px-6 py-5 space-y-2">

//             <NavLink
//               to="/"
//               onClick={() => setOpen(false)}
//               className={navLinkClass}
//               end
//             >
//               <div className="px-3 py-2.5 rounded-lg hover:bg-cinnamon-50">
//                 Home
//               </div>
//             </NavLink>

//             <NavLink
//               to="/menu"
//               onClick={() => setOpen(false)}
//               className={navLinkClass}
//             >
//               <div className="px-3 py-2.5 rounded-lg hover:bg-cinnamon-50">
//                 Menu
//               </div>
//             </NavLink>

//             <NavLink
//               to="/reservation"
//               onClick={() => setOpen(false)}
//               className={navLinkClass}
//             >
//               <div className="px-3 py-2.5 rounded-lg hover:bg-cinnamon-50">
//                 Reserve a Table
//               </div>
//             </NavLink>

//             <NavLink
//               to="/cart"
//               onClick={() => setOpen(false)}
//               className={navLinkClass}
//             >
//               <div className="px-3 py-2.5 rounded-lg hover:bg-cinnamon-50 flex items-center justify-between">
//                 <span>Cart</span>

//                 {totalItems > 0 && (
//                   <span className="bg-cinnamon-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                     {totalItems}
//                   </span>
//                 )}
//               </div>
//             </NavLink>

//             {user && (
//               <NavLink
//                 to="/orders"
//                 onClick={() => setOpen(false)}
//                 className={navLinkClass}
//               >
//                 <div className="px-3 py-2.5 rounded-lg hover:bg-cinnamon-50">
//                   My Orders
//                 </div>
//               </NavLink>
//             )}

//             {user?.role === "admin" && (
//               <NavLink
//                 to="/admin"
//                 onClick={() => setOpen(false)}
//                 className={navLinkClass}
//               >
//                 <div className="px-3 py-2.5 rounded-lg hover:bg-cinnamon-50">
//                   Admin
//                 </div>
//               </NavLink>
//             )}

//             {/* Mobile User Section */}
//             {user ? (
//               <div className="mt-4 pt-4 border-t border-espresso-100">

//                 <Link
//                   to="/profile"
//                   onClick={() => setOpen(false)}
//                   className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cinnamon-50"
//                 >
//                   <span className="flex items-center justify-center w-10 h-10 rounded-full bg-cinnamon-100 text-cinnamon-600">
//                     <HiOutlineUser className="w-5 h-5" />
//                   </span>

//                   <div>
//                     <p className="text-xs text-espresso-500">
//                       Signed in as
//                     </p>

//                     <p className="text-sm font-semibold text-espresso-800">
//                       {user.name}
//                     </p>
//                   </div>
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="w-full mt-3 px-4 py-2.5 rounded-lg border border-espresso-200 text-sm font-medium text-espresso-700 hover:bg-espresso-800 hover:text-white transition-all duration-200"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 onClick={() => setOpen(false)}
//                 className="block btn-primary text-center !py-2.5 mt-4"
//               >
//                 Sign in
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

import { useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  HiOutlineShoppingBag,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineUser,
} from "react-icons/hi";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const navLinkClass = ({ isActive }) =>
  `relative text-sm font-medium tracking-wide transition-all duration-200 ${
    isActive
      ? "text-cinnamon-500"
      : "text-espresso-700 hover:text-cinnamon-500"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current page is an admin page
  const isAdminPage =
  user?.role === "admin" &&
  (
    location.pathname.toLowerCase().startsWith("/admin") ||
    location.pathname.toLowerCase() === "/profile"
  );

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-espresso-100 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0"
          >
            <span className="text-3xl leading-none">☕</span>

            <span className="font-display text-xl sm:text-2xl font-semibold text-espresso-800 whitespace-nowrap">
              Brew & Bite
            </span>
          </Link>

          {/* =========================
              DESKTOP CUSTOMER NAVBAR
              Hidden on Admin pages
          ========================= */}
          {!isAdminPage && (
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9 ml-8">
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>

              <NavLink to="/menu" className={navLinkClass}>
                Menu
              </NavLink>

              <NavLink to="/reservation" className={navLinkClass}>
                Reserve a Table
              </NavLink>

              {user && (
                <NavLink to="/orders" className={navLinkClass}>
                  My Orders
                </NavLink>
              )}
            </nav>
          )}

          {/* =========================
              RIGHT SIDE
          ========================= */}
          <div className="hidden md:flex items-center gap-4 ml-auto">

            {/* Cart - hidden on admin pages */}
            {!isAdminPage && (
              <Link
                to="/cart"
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-espresso-800 hover:bg-cinnamon-50 hover:text-cinnamon-500 transition-all duration-200"
                aria-label="Shopping cart"
              >
                <HiOutlineShoppingBag className="w-6 h-6" />

                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-cinnamon-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream-50">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* User */}
            {user ? (
              <div className="flex items-center gap-2 pl-3 border-l border-espresso-100">

                {/* Profile */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-cinnamon-50 transition-all duration-200"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-cinnamon-100 text-cinnamon-600">
                    <HiOutlineUser className="w-5 h-5" />
                  </span>

                  <span className="hidden xl:block text-sm font-semibold text-espresso-800 max-w-[100px] truncate">
                    {user.name?.split(" ")[0]}
                  </span>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border border-espresso-200 text-sm font-medium text-espresso-500 hover:bg-espresso-600 hover:text-white hover:border-espresso-800 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary !py-2.5 !px-5 text-sm font-medium"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* =========================
              MOBILE MENU BUTTON
              Hidden on Admin pages
          ========================= */}
          {!isAdminPage && (
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-espresso-800 hover:bg-cinnamon-50 transition"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? (
                <HiOutlineX className="w-7 h-7" />
              ) : (
                <HiOutlineMenu className="w-7 h-7" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* =========================
          MOBILE CUSTOMER MENU
          Hidden on Admin pages
      ========================= */}
      {!isAdminPage && open && (
        <div className="md:hidden bg-cream-50 border-t border-espresso-100 shadow-lg">
          <div className="px-5 sm:px-6 py-5 space-y-2">

            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={navLinkClass}
              end
            >
              <div className="px-3 py-2.5 rounded-lg hover:bg-cinnamon-50">
                Home
              </div>
            </NavLink>

            <NavLink
              to="/menu"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              <div className="px-3 py-2.5 rounded-lg hover:bg-cinnamon-50">
                Menu
              </div>
            </NavLink>

            <NavLink
              to="/reservation"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              <div className="px-3 py-2.5 rounded-lg hover:bg-cinnamon-50">
                Reserve a Table
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              <div className="px-3 py-2.5 rounded-lg hover:bg-cinnamon-50 flex items-center justify-between">
                <span>Cart</span>

                {totalItems > 0 && (
                  <span className="bg-cinnamon-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
            </NavLink>

            {user && (
              <NavLink
                to="/orders"
                onClick={() => setOpen(false)}
                className={navLinkClass}
              >
                <div className="px-3 py-2.5 rounded-lg hover:bg-cinnamon-50">
                  My Orders
                </div>
              </NavLink>
            )}

            {/* Mobile User */}
            {user ? (
              <div className="mt-4 pt-4 border-t border-espresso-100">

                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cinnamon-50"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-cinnamon-100 text-cinnamon-600">
                    <HiOutlineUser className="w-5 h-5" />
                  </span>

                  <div>
                    <p className="text-xs text-espresso-500">
                      Signed in as
                    </p>

                    <p className="text-sm font-semibold text-espresso-800">
                      {user.name}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full mt-3 px-4 py-2.5 rounded-lg border border-espresso-200 text-sm font-medium text-espresso-700 hover:bg-espresso-800 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block btn-primary text-center !py-2.5 mt-4"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;