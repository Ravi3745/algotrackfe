import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import { useAuth } from "../context/authContext";

function Navbar({
  title = "AlgoTrack",
  subtitle = "",
  showBackButton = false,
  showLogoutButton = false,
  customActions = null,
}) {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div>
          <h1 className="text-2xl font-bold text-black">{title}</h1>

          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Custom Actions */}
          {customActions}

          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={handleBack}
              className="
                px-5 py-2 rounded-lg
                border border-gray-300
                hover:bg-gray-100
                transition
                cursor-pointer
              "
            >
              Back
            </button>
          )}

          {/* Logout Button */}
          {showLogoutButton && (
            <button
              onClick={handleLogout}
              className="
                px-5 py-2 rounded-lg
                bg-black text-white
                hover:bg-gray-800
                transition
                cursor-pointer
              "
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
