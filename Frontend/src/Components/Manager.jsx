import React from "react";
import { useEffect, useRef, useState } from "preact/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

function Manager() {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  // const { user } = useAuth();
  const [user, setUser] = useState("");
  const { authorizationToken } = useAuth();
  const passwordArray = user.msg?.site || [];
  const [editForm, setEditForm] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const userAuthentication = async () => {
    try {
      const response = await fetch(
        "https://password-manager-vq47.onrender.com/passwordInfo",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data); // Set the fetched user data to the user state
        console.log("Fetched User Data:", data);
      } else {
        console.log(
          "Failed to fetch user data. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.log("Error fetching User Data", error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    userAuthentication();
  }, [user]);
  const showPassword = () => {
    if (ref.current.src.includes("/eyecross.png")) {
      ref.current.src = "/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const deletePassword = async (siteId) => {
    const validation = confirm("Do you really want to delete?");
    if (validation) {
      try {
        const response = await fetch(
          `https://password-manager-vq47.onrender.com/deleteSite/${siteId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: authorizationToken, // Ensure token is prefixed with 'Bearer '
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        // console.log(`After delete response:`, data);

        if (response.ok) {
          toast.success("Password deleted successfully");
        } else {
          toast.error(data.message || "Failed to delete password");
        }
      } catch (error) {
        console.error("Error during deletion:", error);
        toast.error("An error occurred while deleting the password");
      }
    }
  };

  const handlehange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const savePassword = async () => {
    // console.log(form);
    try {
      const response = await fetch(
        `https://password-manager-vq47.onrender.com/addSite`,
        {
          method: "POST",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      // console.log(`After add response:`, data);

      if (response.ok) {
        toast.success("Password saved successfully");
        setForm({ site: "", username: "", password: "" });
      } else {
        toast.error(data.message || "Failed to save password");
      }
    } catch (error) {
      console.error("Error during Save password:", error);
      toast.error("An error occurred while save the password");
    }
  };
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const editPassword = (id) => {
    const item = passwordArray.find((item) => item._id === id);
    setEditForm({
      site: item.site,
      username: item.username,
      password: item.password,
    });
    setEditingId(id);
    setShowModal(true);
  };
  const updatePassword = async () => {
    try {
      console.log(editingId);
      const response = await fetch(
        `https://password-manager-vq47.onrender.com/update/${editingId}`,
        {
          method: "POST",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Password updated successfully");
        setShowModal(false);
        setEditingId(null);
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error during Update password:", error);
      toast.error("An error occurred while updating the password");
    }
  };
  const copybtn = (text) => {
    toast.success("Copied to clipboard", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
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
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Password</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Website</label>
              <input
                type="text"
                name="site"
                value={editForm.site}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={editForm.username}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={editForm.password}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={updatePassword}
                className="bg-purple-950 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="md:mycontainer py-4 mx-auto mt-12 min-h-screen
      "
      >
        <div className="navbar text-black border border-purple-100 p-10 pb-3">
          <h1 className="font-semibold text-3xl md:text-5xl text-center ">
            Pass
            <span className="text-purple-900 hover:text-purple-950">Word</span>
          </h1>
          <p className="text-center text-xl md:text-4xl font-medium m-2">
            My Password Manager
          </p>

          <div className="flex flex-col p-4 items-center">
            <input
              type="text"
              name="site"
              id=""
              value={form.site}
              onChange={handlehange}
              placeholder="Website URL"
              className=" text-center rounded-full border border-purple-100 text-lg md:text-xl w-full p-10 py-1 m-2"
              required={true}
            />
            <div className="flex flex-col md:flex-row w-full gap-8 justify-between m-2 ">
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handlehange}
                placeholder="Enter Username"
                className="rounded-full border border-purple-100 text-lg md:text-xl w-full p-4 py-1 text-center"
              />
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  ref={passwordRef}
                  value={form.password}
                  onChange={handlehange}
                  placeholder="Enter Password"
                  className="rounded-full text-center border border-purple-100 text-lg md:text-lg w-full p-4 py-1"
                />
                <span className="absolute right-1  md:right-0 top-3 md:top-2">
                  <img
                    ref={ref}
                    src="/eye.png"
                    alt="eye"
                    className="w-5 md:w-7 mr-1 md:mr-2 cursor-pointer"
                    onClick={showPassword}
                  />
                </span>
              </div>
            </div>

            <button
              onClick={savePassword}
              className="flex justify-center items-center bg-purple-950 rounded-full px-2 md:px-4 py-2 w-fit text-purple-100 font-semibold text-sm md:text-xl border-2 hover:bg-purple-900 border-purple-100 mt-3"
            >
              <lord-icon
                src="https://cdn.lordicon.com/zrkkrrpl.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#e5d1fa,secondary:#a866ee"
                style="width:45px;height:45px"
              ></lord-icon>
              Add Password
            </button>
          </div>
        </div>

        <div className="passwords  mt-16 m-3">
          <h1 className="text-black font-medium text-3xl md:text-4xl mb-4 ">
            Pass<span className="text-purple-950">Word</span>
          </h1>
          {passwordArray.length === 0 && (
            <div
              className="border border-purple-100 navbar flex justify-center text-xl md:text-3xl text-slate-900 font-semibold
            "
            >
              No Passwords to show
            </div>
          )}

          {passwordArray.length !== 0 && (
            <table className="navbar table-auto w-full">
              <thead>
                <tr className="text-base md:text-3xl border border-purple-100 text-purple-100 font-light">
                  <th className="bg-purple-950">Website</th>
                  <th className="bg-purple-950">Username</th>
                  <th className="bg-purple-950">Password</th>
                  <th className="bg-purple-950">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center w-32 py-2 border border-purple-100">
                      {item.site}
                      <lord-icon
                        src="https://cdn.lordicon.com/wyqtxzeh.json"
                        trigger="hover"
                        stroke="bold"
                        onClick={() => {
                          copybtn(item.site);
                        }}
                        colors="primary:#320a5c,secondary:#a866ee"
                        style="width:35px;height:35px; cursor:pointer;"
                      ></lord-icon>
                    </td>
                    <td className="w-32 py-2 border border-purple-300 text-center">
                      {item.username}
                      <lord-icon
                        src="https://cdn.lordicon.com/wyqtxzeh.json"
                        trigger="hover"
                        stroke="bold"
                        onClick={() => {
                          copybtn(item.username);
                        }}
                        colors="primary:#320a5c,secondary:#a866ee"
                        style="width:35px;height:35px; cursor:pointer;"
                      ></lord-icon>
                    </td>
                    <td className="text-center w-32 py-2 border border-purple-300">
                      {item.password}
                      <lord-icon
                        src="https://cdn.lordicon.com/wyqtxzeh.json"
                        trigger="hover"
                        stroke="bold"
                        onClick={() => {
                          copybtn(item.password);
                        }}
                        colors="primary:#320a5c,secondary:#a866ee"
                        style="width:35px;height:35px; cursor:pointer;"
                      ></lord-icon>
                    </td>
                    <td className="text-center w-32 py-2 border border-purple-300">
                      <span
                        className="cursor-pointer mx-2"
                        onClick={() => {
                          editPassword(item._id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/wuvorxbv.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#320a5c,secondary:#a866ee"
                          style="width:35px;height:35px"
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer mx-2"
                        onClick={() => {
                          deletePassword(item._id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/drxwpfop.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#320a5c,secondary:#a866ee"
                          style="width:35px;height:35px"
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
