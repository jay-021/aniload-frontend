import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimeItem from "./Components/AnimeItem";
import Gallery from "./Components/Gallery";
import Homepage from "./Components/Homepage";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ProtectedRoutes from "./Auth/ProtectedRoutes";
import Favourite from "./Components/Favourite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/anime/:id" element={<AnimeItem />} />
          <Route path="/character/:id" element={<Gallery />} />
          <Route path="/favourite" element={<Favourite />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
