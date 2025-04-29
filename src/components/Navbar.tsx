import { useTheme } from "@/context/theme-provider";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { navLinks } from "@/data/data";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav
      className={`z-30 ${
        theme === "dark" ? "bg-zinc-900/90" : "bg-[#22C55E]"
      }  text-white sticky top-0 shadow-md`}>
      <div className="container mx-auto flex justify-between items-center p-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/">SRS.</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-medium uppercase mr-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-md hover:bg-white ${
                theme === "dark" ? "hover:text-black" : "hover:text-[#22C55E]"
              } transition-colors duration-200`}>
              {link.label}
            </Link>
          ))}
          <button
            className={`transition-transform duration-200 cursor-pointer ${
              theme === "dark" ? "rotate-180" : ""
            }`}
            onClick={handleClick}>
            {theme === "dark" ? (
              <Sun
                size={24}
                className="transition-all duration-200 rotate-0 "
              />
            ) : (
              <Moon
                size={24}
                className="transition-all duration-200 rotate-0"
              />
            )}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleSidebar} className="p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-full h-full ${
          theme === "dark" ? "bg-zinc-900" : "bg-[#22C55E]"
        }  text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-40`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="ml-3 text-2xl font-bold">SRS.</h2>
            <button onClick={toggleSidebar}>
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={toggleSidebar}
                className="p-3 rounded-md hover:bg-white hover:text-[#22C55E] transition-colors duration-200">
                {link.label}
              </Link>
            ))}
            <button
              className={`p-3 w-fit transition-transform duration-200 cursor-pointer ${
                theme === "dark" ? "rotate-180" : ""
              }`}
              onClick={handleClick}>
              {theme === "dark" ? (
                <Sun
                  size={24}
                  className="transition-all duration-200 rotate-0 "
                />
              ) : (
                <Moon
                  size={24}
                  className="transition-all duration-200 rotate-0"
                />
              )}
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
