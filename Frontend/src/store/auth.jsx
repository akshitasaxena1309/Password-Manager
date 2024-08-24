import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("manager_token"));

  const [user, setUser] = useState("");
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("manager_token", serverToken);
  };

  let isLoggedIn = !!token;

  //   logout functionality
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("manager_token");
  };

  // JWT Authentication

  // const userAuthentication = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://password-manager-vq47.onrender.com/passwordInfo",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setUser(data);
  //       // console.log("Fetched User Data:", data); // Log data to console
  //     } else {
  //       console.log(
  //         "Failed to fetch user data. Response status:",
  //         response.status
  //       );
  //     }
  //   } catch (error) {
  //     console.log("Error fetching User Data ");
  //   }
  // };

  // useEffect(() => {
  //   userAuthentication();
  // });

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogoutUser,
        isLoggedIn,
        // user,
        authorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext); // Pass the context object here
};
