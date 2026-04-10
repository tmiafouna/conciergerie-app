import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ScrollToTop from "./components/ScrollToTop";

// Public
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Hotel from "./pages/public/Hotel";
import RoomDetails from "./pages/public/RoomDetails";
import Rooms from "./pages/public/Rooms";
import Reservation from "./pages/public/Reservation";
import RoomService from "./pages/public/RoomService";
import Legal from "./pages/public/Legal";
import Privacy from "./pages/public/Privacy";
import Terms from "./pages/public/Terms";

// Client
import Dashboard from "./pages/client/Dashboard";
import Orders from "./pages/client/Orders";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageUsers from "./pages/admin/ManageUsers";

const App = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/hotel/rooms" element={<Rooms />} />
        <Route path="/hotel/rooms/:roomId" element={<RoomDetails />} />
        <Route path="/hotel/reservation" element={<Reservation />} />
        <Route path="/room-service" element={<RoomService />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Client (protected) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><ManageOrders /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
      </Routes>
    </Layout>
  );
};

export default App;
