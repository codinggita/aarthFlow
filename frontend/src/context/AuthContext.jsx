import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for mock token
    const token = localStorage.getItem("token");
    if (token) {
      setUser({
        ownerName: "Alex Rivera",
        businessName: "AarthFlow Institutional",
        email: "alex@aarthflow.com"
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    localStorage.setItem("token", "mock-token");
    setUser({
      ownerName: "Alex Rivera",
      businessName: "AarthFlow Institutional",
      email: email || "alex@aarthflow.com"
    });
    return { success: true };
  };

  const register = async (formData) => {
    localStorage.setItem("token", "mock-token");
    setUser({
      ownerName: formData.ownerName || "New User",
      businessName: formData.businessName || "New Enterprise",
      email: formData.email
    });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Mock functions for OTP
  const sendLoginOTP = async (mobile) => ({ success: true, message: "OTP Sent" });
  const verifyLoginOTP = async (mobile, otp) => {
    localStorage.setItem("token", "mock-token");
    setUser({
      ownerName: "Alex Rivera",
      businessName: "AarthFlow Institutional",
      mobile: mobile
    });
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        sendLoginOTP,
        verifyLoginOTP,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);