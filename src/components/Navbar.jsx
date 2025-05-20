import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white bg-opacity-80 shadow-md fixed top-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-cyan-600">Smart Hospital</h1>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-cyan-100 text-cyan-600 rounded-md hover:bg-cyan-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
          >
            Sign In
          </button>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 space-y-2">
          <button
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="w-full px-4 py-2 bg-cyan-100 text-cyan-600 rounded-md hover:bg-cyan-200"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/register");
              setMenuOpen(false);
            }}
            className="w-full px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
          >
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
