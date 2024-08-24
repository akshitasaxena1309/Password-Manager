import React, { useRef, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const ref = useRef();
  const passwordRef = useRef();
  const showPassword = () => {
    if (ref.current.src.includes("/eyecross.png")) {
      ref.current.src = "/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eyecross.png";
      passwordRef.current.type = "text";
    }
  };
  const handleInput = (e) => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://password-manager-vq47.onrender.com/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      console.log(response);
      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data);
        storeTokenInLS(res_data.token);
        setUser({ name: "", email: "", password: "" });
        toast.success("SignUp successfully");
        navigate("/");
      } else {
        const data = await response.json(); // Parse the error response
        toast.error(
          "Login failed. Please check your credentials or register first."
        );
        setUser({ name: "", email: "", password: "" });
      }
    } catch (error) {
      console.log("registration Failed", error);
      toast.error(
        "An error occurred while trying to log in. Please try again later."
      );
      setUser({ email: "", password: "" });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}

      <ToastContainer />
      <div
        className="md:mycontainer mx-auto mt-10 md:mt-12 min-h-screen
      "
      >
        <div className="navbar text-black border border-purple-100 p-10 md:p-20 md:pb-12 md:m-0 m-5">
          <h1 className="font-bold text-2xl md:text-4xl text-center text-black pb-9 ">
            Sign
            <span className="text-purple-900 hover:text-purple-950">
              Up
            </span>{" "}
            Section
          </h1>

          <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-10 md:m-2 w-72 md:w-auto">
                <label
                  htmlFor="name"
                  className="font-bold text-xl md:text-2xl md:pr-8 text-black"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="rounded-full border border-purple-100 text-lg md:text-xl p-4 py-1 text-center "
                  placeholder="Enter your name"
                  value={user.name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-12 md:m-2 w-72 md:w-auto mt-3 md:mt-0 ">
                <label
                  htmlFor="email"
                  className="font-bold text-xl md:text-2xl md:pr-8 text-black"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="rounded-full border border-purple-100 text-lg md:text-xl p-4 py-1 text-center "
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-1 md:m-2 w-72 md:w-auto mt-3 md:mt-0 ">
                <label
                  htmlFor="password"
                  className="font-bold text-xl md:text-2xl md:pr-8 text-black"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="rounded-full border border-purple-100 text-lg md:text-xl p-4 py-1 text-center "
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={handleInput}
                    required
                  />{" "}
                  <span className="absolute right-1 top-3 md:top-2">
                    <img
                      ref={ref}
                      src="/eye.png"
                      alt="eye"
                      className="w-5 md:w-6 mr-1 md:mr-2 cursor-pointer"
                      onClick={showPassword}
                    />
                  </span>
                </div>
              </div>

              <button
                className="flex items-center ml-20 md:ml-32 bg-purple-950 rounded-full px-5 md:px-6 py-3 w-fit text-purple-100 font-semibold text-base md:text-xl border-2 hover:bg-purple-900 border-purple-100 mt-8 gap-2"
                type="submit"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/bgebyztw.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#c69cf4,secondary:#ffffff"
                  style="width:35px;height:35px"
                ></lord-icon>
                <span>Signup</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default signup;
