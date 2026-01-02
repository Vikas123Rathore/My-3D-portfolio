import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Fake Login Logic
    if (email === "admin@gmail.com" && password === "Vikas123") {
      toast.success("Welcome Admin (Bypass Mode)!");
      setIsAuthenticated(true);
      setUser({
        fullName: "Vikas Rathore",
        email: "vikas@gmail.com",
        role: "Admin"
      });
      localStorage.setItem("isAdmin", "true");
      window.location.href = "/";
    } else {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-xl border border-gray-800 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Admin <span className="text-blue-500">Panel</span>
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="admin@example.com"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="••••••••"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02]"
          >
            Force Login 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
