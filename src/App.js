import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimeItem from "./Components/AnimeItem";
import Gallery from "./Components/Gallery";
import Homepage from "./Components/Homepage";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import UserRoutes from "./Auth/UserRoutes";
import AdminRoutes from "./Auth/AdminRoutes";
import Favourite from "./Components/Favourite";
import AdminLogin from "./Components/AdminLogin";
import AdminHome from "./Components/AdminHome";
import AdminSignUp from "./Components/AdminSignUp";
import EditUser from "./Components/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/anime/:id" element={<AnimeItem />} />
          <Route path="/character/:id" element={<Gallery />} />
          <Route path="/favourite" element={<Favourite />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/edit-item/:id" element={<EditUser />} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
