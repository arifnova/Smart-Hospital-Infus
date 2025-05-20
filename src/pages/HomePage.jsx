import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-cyan-100 to-blue-300 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 bg-black/25 z-0">
        <img
          src="/path/to/bg1.jpg"
          alt="background"
          className="w-full h-full object-cover opacity-75"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 p-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-cyan-600 mb-4">
          Selamat Datang di Smart Hospital
        </h1>
        <p className="text-gray-900 max-w-md mb-6">
          Sistem monitoring infus pasien secara real-time berbasis IoT yang
          akurat dan efisien.
        </p>
        <div className="space-y-3 sm:space-x-4 sm:space-y-0 sm:flex">
          <button
            onClick={() => navigate("/login")}
            className="bg-cyan-100 text-cyan-600 px-6 py-2 rounded-full hover:bg-cyan-200 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
