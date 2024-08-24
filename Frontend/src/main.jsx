import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.jsx";
import "./index.css";
import { AuthProvider } from "./store/auth.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);
