import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LayoutDashboard, FolderGit2, BriefcaseBusiness, History, MessageSquareText, LogOut, User, PenTool, Settings, Clock } from "lucide-react";

import Dashboard from "./sub-components/Dashboard";
import AddProject from "./sub-components/AddProject";
import AddSkill from "./sub-components/AddSkill";
import AddTimeline from "./sub-components/AddTimeline";
import Messages from "./sub-components/Messages";
import Account from "./sub-components/Account";
import ManageProjects from "./sub-components/ManageProjects";
import ManageSkills from "./sub-components/ManageSkills";
import ManageTimeline from "./sub-components/ManageTimeline"; // 👈 Import kiya

const HomePage = () => {
  const { setIsAuthenticated, user } = useContext(Context);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    toast.success("Logged Out!");
    navigate("/login");
  };

  const menuItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "Add Project", label: "Add Project", icon: FolderGit2 },
    { id: "Manage Projects", label: "Manage Projects", icon: PenTool },
    { id: "Add Skill", label: "Add Skill", icon: BriefcaseBusiness },
    { id: "Manage Skills", label: "Manage Skills", icon: Settings },
    { id: "Add Timeline", label: "Add Timeline", icon: History },
    { id: "Manage Timeline", label: "Manage Timeline", icon: Clock }, // 👈 New Tab Added
    { id: "Messages", label: "Messages", icon: MessageSquareText },
    { id: "Account", label: "Account", icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      <aside className="w-64 bg-[#111] border-r border-gray-800 flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Portfolio Panel</h1>
          <p className="text-xs text-gray-500 mt-1">Welcome, Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={20} /> {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-sm font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 bg-black p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
           <header className="mb-8 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white tracking-tight">{activeTab}</h2>
           </header>
           <div className="min-h-[500px]">
             {(() => {
                switch (activeTab) {
                  case "Dashboard": return <Dashboard />;
                  case "Add Project": return <AddProject />;
                  case "Manage Projects": return <ManageProjects />;
                  case "Add Skill": return <AddSkill />;
                  case "Manage Skills": return <ManageSkills />;
                  case "Add Timeline": return <AddTimeline />;
                  case "Manage Timeline": return <ManageTimeline />; // 👈 Component Render
                  case "Messages": return <Messages />;
                  case "Account": return <Account />;
                  default: return <Dashboard />;
                }
             })()}
           </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;