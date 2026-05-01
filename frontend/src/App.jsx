import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import SignupStep2 from "./pages/SignupStep2";
import SignupStep3 from "./pages/SignupStep3";
import InvoiceUpload from "./pages/InvoiceUpload";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetail from "./pages/InvoiceDetail";
import Landing from "./pages/Landing";



// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/step2" element={<SignupStep2 />} />
      <Route path="/signup/step3" element={<SignupStep3 />} />
<Route path="/invoices" element={<ProtectedRoute><InvoiceList /></ProtectedRoute>} />
<Route path="/invoices/upload" element={<ProtectedRoute><InvoiceUpload /></ProtectedRoute>} />
<Route path="/invoices/:id" element={<ProtectedRoute><InvoiceDetail /></ProtectedRoute>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

export default App;