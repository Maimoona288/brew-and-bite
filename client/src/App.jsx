import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Customer Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/Profile";
import Reservation from "./pages/Reservation";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/Products";
import AdminCategories from "./admin/Categories";
import AdminOrders from "./admin/Orders";
import AdminReservations from "./admin/Reservations";
import AdminUsers from "./admin/Users";

function App() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Main Navbar */}
      <Navbar />

      <main className="flex-1">
        <Routes>

          {/* =========================
              CUSTOMER ROUTES
          ========================= */}

          <Route path="/" element={<Home />} />

          <Route path="/menu" element={<Menu />} />

          <Route
            path="/menu/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/reservation"
            element={<Reservation />}
          />

          {/* Protected Customer Routes */}

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* =========================
              ADMIN ROUTES
          ========================= */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            {/* /admin */}
            <Route
              index
              element={<Dashboard />}
            />

            {/* /admin/products */}
            <Route
              path="products"
              element={<AdminProducts />}
            />

            {/* /admin/categories */}
            <Route
              path="categories"
              element={<AdminCategories />}
            />

            {/* /admin/orders */}
            <Route
              path="orders"
              element={<AdminOrders />}
            />

            {/* /admin/reservations */}
            <Route
              path="reservations"
              element={<AdminReservations />}
            />

            {/* /admin/users */}
            <Route
              path="users"
              element={<AdminUsers />}
            />
          </Route>

          {/* =========================
              404
          ========================= */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;