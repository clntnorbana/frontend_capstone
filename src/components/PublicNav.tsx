import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const PublicNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // links
  const navLinks = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "profile register",
      path: "/register",
    },
    {
      name: "request certificate",
      path: "/request",
    },
  ];

  return (
    <>
      <div className="flex justify-start bg-pink-500 px-5">
        <p className="text-gray-200">
          Open hours{" "}
          <span className="font-semibold">Mon - Fri 8:00 am - 6:00 pm</span>{" "}
        </p>
      </div>
      <nav className="lg:bg-pink-400 bg-white fixed sticky top-0 w-full h-[50px] z-50">
        <div className="container lg:px-52 mx-auto flex justify-end items-center relative h-full">
          <div
            onClick={() => setIsOpen((curr) => !curr)}
            className="p-2 cursor-pointer block lg:hidden"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </div>
          {/* navbar large screen */}
          <ul className="lg:block hidden">
            {navLinks.map((link, index) => {
              return (
                <NavLink
                  className={({ isActive }) =>
                    `py-2 px-4 hover:text-blue-300 uppercase text-gray-50 transition-all duration-200 rounded font-medium ${
                      isActive ? "bg-blue-300 hover:text-white" : ""
                    }`
                  }
                  key={index}
                  to={link.path}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </ul>

          {/* navbar small screen */}
          {isOpen ? (
            <ul
              className={`lg:hidden flex flex-col bg-white absolute top-14 rounded overflow-hidden transition-all duration-200 shadow-lg p-1.5 border border-2 ${
                isOpen ? "opacity-1" : "opacity-0"
              }`}
            >
              {navLinks.map((link, index) => {
                return (
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `py-2 px-4 hover:text-blue-400 uppercase text-gray-900 font-medium rounded ${
                        isActive
                          ? "bg-blue-400 text-white hover:text-white"
                          : ""
                      }`
                    }
                    key={index}
                    to={link.path}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </ul>
          ) : null}
        </div>
      </nav>
    </>
  );
};
export default PublicNav;
