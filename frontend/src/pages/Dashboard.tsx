import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-section">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-vh-100 bg-section d-flex align-items-center justify-content-center">
      <div style={{ width: "70%", maxWidth: "700px" }}>
        {/* Welcome Heading - Centered above card */}
        <div className="text-center text-white mb-4">
          <h2 className="fw-bold mb-2">Welcome to Dashboard</h2>
          <p className="opacity-75 mb-0">You have successfully logged in to your account.</p>
        </div>

        {/* Card */}
        <div
          className="card border-0"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
            borderRadius: "16px",
            minHeight: "300px",
          }}
        >
          <div className="card-body p-4 d-flex flex-column" style={{ minHeight: "inherit" }}>
            {/* User Info */}
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed 0%, #0051e6 100%)",
                }}
              >
                <User size={24} color="white" />
              </div>
              <div>
                <p className="mb-0 small text-muted">Logged in as</p>
                <p className="mb-0 fw-semibold" style={{ color: "#1a1a2e" }}>
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Spacer to push content below to bottom */}
            <div className="mt-auto">
              {/* Divider */}
              <hr className="my-4" style={{ borderColor: "#acacacff" }} />

              {/* Logout Button - Right aligned */}
              <div className="d-flex justify-content-end">
                <button
                  onClick={handleLogout}
                  className="btn d-flex align-items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #dc3545 0%, #b31a1a 100%)",
                    color: "white",
                    padding: "10px 24px",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "8px",
                  }}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
