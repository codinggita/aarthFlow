import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Financing from "./pages/Financing";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import SignupStep2 from "./pages/SignupStep2";
import SignupStep3 from "./pages/SignupStep3";
import InvoiceUpload from "./pages/InvoiceUpload";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetail from "./pages/InvoiceDetail";
import Landing from "./pages/Landing";
import PayoutInitiate from "./pages/PayoutInitiate";
import PayoutSuccess from "./pages/PayoutSuccess";
import PayoutList from "./pages/PayoutList";
import WhatsAppFloat from "./components/WhatsAppFloat";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/step2" element={<SignupStep2 />} />
      <Route path="/signup/step3" element={<SignupStep3 />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/financing" element={<ProtectedRoute><Financing /></ProtectedRoute>} />
      <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      {/* Invoice Routes */}
      <Route path="/invoices" element={<ProtectedRoute><InvoiceList /></ProtectedRoute>} />
      <Route path="/invoices/upload" element={<ProtectedRoute><InvoiceUpload /></ProtectedRoute>} />
      <Route path="/invoices/:id" element={<ProtectedRoute><InvoiceDetail /></ProtectedRoute>} />
      
      {/* Payout Routes */}
      <Route path="/payouts" element={<ProtectedRoute><PayoutList /></ProtectedRoute>} />
      <Route path="/payouts/initiate/:invoiceId" element={<ProtectedRoute><PayoutInitiate /></ProtectedRoute>} />
      <Route path="/payouts/success" element={<ProtectedRoute><PayoutSuccess /></ProtectedRoute>} />
      
      <Route path="/" element={<Landing />} />
    </Routes>
    <WhatsAppFloat />
    </>
  );
};

export default App;