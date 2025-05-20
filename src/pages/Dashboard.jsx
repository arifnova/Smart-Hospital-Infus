import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfusionData from "../components/InfusionData";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-40 bg-cyan-100 p-4 md:p-4 flex md:block justify-between items-center md:items-start">
        <h1 className="text-lg md:text-xl font-semibold text-cyan-600 mb-0 md:mb-6 text-center md:text-left">
          Smart
          <br />
          Hospital
        </h1>
        <nav className="space-y-0 md:space-y-4 mt-2 md:mt-0">
          <div className="flex items-center space-x-2 font-bold text-cyan-600">
            <span>📊</span>
            <span className="hidden md:inline">Data Infus</span>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-6">
        {/* Topbar */}
        <div className="flex justify-between md:justify-end items-center text-sm mb-4">
          <span className="mr-2">admin123 👤</span>
          <button
            onClick={handleLogout}
            className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500"
          >
            Logout
          </button>
        </div>

        <InfusionData />
      </main>
    </div>
  );
};

export default Dashboard;
