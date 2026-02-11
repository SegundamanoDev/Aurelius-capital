import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Pages
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import DashboardHome from "./pages/private/DashboardHome";
import Invest from "./pages/private/Invest";
import Deposit from "./pages/private/Deposit";
import Profile from "./pages/private/Profile";
import Withdraw from "./pages/private/Withdraw";
import Transactions from "./pages/private/Transactions";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminUserList from "./pages/admin/AdminUserList";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import AdminInvestments from "./pages/admin/AdminInvestments";
import CopyTrading from "./pages/private/CopyTrading";
import Upgrade from "./pages/private/Upgrade";
import ManageTraders from "./pages/admin/ManageTraders";
import AdminLedger from "./pages/admin/AdminLedger";
import Market from "./pages/public/Market";
import Portfolio from "./pages/public/Portfolio";
import About from "./pages/public/About";
import Academy from "./pages/public/Academy";
import ScrollToTop from "./components/ScrollToTop";
import CopyTradingPage from "./components/CopyTradingPage";
import AMLPolicy from "./components/AMLPolicy";
import FAQ from "./components/FAQ";
import MadeToTradeVideo from "./pages/private/Invest";
import PricingSection from "./components/InvestmentPlans";
import AdminTransactions from "./pages/admin/AdminTransactions";
import Insurance from "./components/Insurance";

// --- PUBLIC LAYOUT WRAPPER ---
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// --- GUEST ROUTE (Redirects Auth users away from Landing/Login) ---
const GuestRoute = ({ children }) => {
  const { user, isLoading } = useSelector(
    (state) => state.auth || { user: null, isLoading: false },
  );

  if (isLoading) return null; // Or a smaller loader

  // If user exists, send them to dashboard instead of Home/Login
  return user ? <Navigate to="/dashboard" replace /> : children;
};

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useSelector(
    (state) => state.auth || { user: null, isLoading: false },
  );

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#05070A] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
};

// --- PROTECTED ADMIN ROUTE ---
const ProtectedAdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth || { user: null });
  const isAdmin = user?.role === "admin";

  return isAdmin ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-[#05070A] min-h-screen font-inter text-slate-300 selection:bg-sky-500/30 selection:text-white">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#05070A",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "12px",
              borderRadius: "15px",
            },
          }}
        />
        <Routes>
          {/* 1. PUBLIC ROUTES (Wrapped in GuestRoute) */}
          <Route
            element={
              <GuestRoute>
                <PublicLayout />
              </GuestRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/copy-trading" element={<CopyTradingPage />} />
            <Route path="/aml-policy" element={<AMLPolicy />} />
            <Route path="/faqs" element={<FAQ />} />
            <Route path="/insurance" element={<Insurance />} />
          </Route>

          {/* 2. USER DASHBOARD ROUTES */}
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
              <DashboardLayout />
              // </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="trade" element={<MadeToTradeVideo />} />
            <Route path="profile" element={<Profile />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="copy-trade" element={<CopyTrading />} />
            <Route path="upgrade" element={<Upgrade />} />
            <Route path="pricing" element={<PricingSection />} />
          </Route>

          {/* 3. ADMIN PANEL ROUTES */}
          <Route
            path="/admin"
            element={
              // <ProtectedAdminRoute>
              <AdminLayout />
              // </ProtectedAdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUserList />} />
            <Route path="ledger" element={<AdminLedger />} />
            <Route path="traders" element={<ManageTraders />} />
            <Route path="deposits" element={<AdminDeposits />} />
            <Route path="withdrawals" element={<AdminWithdrawals />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="investments" element={<AdminInvestments />} />
          </Route>

          {/* CATCH ALL */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
