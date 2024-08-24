import { BrowserRouter, Routes, Route } from "react-router-dom";
import Manager from "./Components/Manager";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Logout from "./Components/Logout";

export function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bg-slate-500 bg-[linear-gradient(to_right,#D4CEDB_0.1px,transparent_0.69px),linear-gradient(to_bottom,#D4CEDB_0.1px,transparent_0.69px)] bg-[size:6rem_4rem]">
          <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_200px_at_50%_400px,#E9D8FD,transparent)]"></div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Manager />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
        {/* <Manager /> */}
      </BrowserRouter>
    </>
  );
}
