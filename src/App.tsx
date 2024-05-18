import useAuthStore from "@stores/authStore";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@src/components/Login";
import Register from "@src/components/Register";
import Dashboard from "@src/components/Dashboard";
import Home from "@src/components/Home";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
