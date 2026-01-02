import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { Context } from "./context/AuthContext";

const App = () => {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    // Local check for admin
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      setUser({ fullName: "Indrajeet Kumar", role: "Admin" });
      setIsAuthenticated(true);
    }
    // Loading stop karo
    if (setLoading) setLoading(false);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
};

export default App;