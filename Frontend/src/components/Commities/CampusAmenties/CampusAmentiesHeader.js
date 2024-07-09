import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const CampusAmentiesHeader = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#426CAD] p-4 fixed top-0 left-0 right-0 w-full">
      <div className="flex justify-between items-center">
        <div className="text-white lg:block md:block sm:hidden">{name}</div>
        <div className="text-white text-lg font-bold">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl  sm:block md:hidden focus:outline-none"
          >
            <FaBars />
          </button>
        </div>
        <p className="text-white">Login</p>
      </div>

      <div
        className={`fixed top-0 left-0 h-full bg-[#426CAD]  sm:block md:hidden transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 p-4`}
        ref={menuRef}
      >
        <div className={`${isOpen ? "block" : "hidden"} w-full  mt-4`}>
          <ul className="flex flex-col">
            <li className="text-white">
              <Link
                to="/home"
                className="block px-2 py-2 hover:bg-[#6a2121] hover:text-white hover:rounded-lg"
              >
                Home
              </Link>
            </li>
            <li className="text-white">
              <Link
                to="/home"
                className="block px-2 py-2 hover:bg-[#6a2121] hover:text-white hover:rounded-lg"
              >
                Central Authority
              </Link>
            </li>
            <li className="text-white">
              <Link
                to="/home"
                className="block px-2 py-2 hover:bg-[#6a2121] hover:text-white hover:rounded-lg"
              >
                Faculty Incharge
              </Link>
            </li>

            <li className="text-white">
              <Link to="/login" className="block px-2 py-1">
                Students Commity
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CampusAmentiesHeader;