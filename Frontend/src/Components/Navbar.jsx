import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
function Navbar() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <nav className="font-semibold md:font-medium text-black flex justify-between items-center h-24 navbar p-5 md:p-10 gap-5">
        <div className="text-2xl md:text-4xl md:pl-6">
          <NavLink to="/">
            <span className="text-purple-950 hover:text-purple-950">
              Manager
            </span>
          </NavLink>
        </div>
        <div>
          <ul className="flex flex-row text-xl md:text-3xl gap-3 md:gap-7 ">
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/signup">SignUp</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
