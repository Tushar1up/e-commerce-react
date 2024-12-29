import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { NavLink } from "react-router-dom";

function Navbar({ searchterm, setSearchterm, count }) {
  return (
    <div className="flex h-16 w-full items-center justify-between gap-2 bg-yellow-400 px-6 text-xs shadow-md sm:text-xl">
      <div>
        <NavLink to="/">
          <h1 className="font-bold">shop.com</h1>{" "}
        </NavLink>
      </div>
      <div className="flex items-center overflow-hidden rounded-full bg-white shadow-inner">
        <input
          type="text"
          placeholder="Search your items"
          className="w-auto px-4 py-2 focus:outline-none md:w-96"
          value={searchterm}
          onChange={(e) => setSearchterm(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-4 rounded-full bg-green-500 p-2">
        <NavLink to="/cart" className="flex gap-1 justify-center items-center">
          <FaShoppingCart className="cursor-pointer text-white hover:text-gray-300" />
          <sup className="text-sm text-white">{count}</sup>
        </NavLink>

        
      </div>
    </div>
  );
}

export default Navbar;
