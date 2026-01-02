import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    timeline: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("Fetching Stats..."); // DEBUG

        // 4 alag-alag calls taaki ek fail ho to baaki chalte rahein
        const [projRes, skillRes, msgRes, timeRes] = await Promise.all([
          axios.get("http://localhost:4000/api/v1/project/getall"),
          axios.get("http://localhost:4000/api/v1/softwareapplication/getall"),
          axios.get("http://localhost:4000/api/v1/message/getall"),
          axios.get("http://localhost:4000/api/v1/timeline/getall"),
        ]);

        // ✅ CORRECT LOGIC: Pehle check karo array exist karta hai ya nahi
        setStats({
          projects: projRes.data.projects ? projRes.data.projects.length : 0,
          skills: skillRes.data.softwareApplications ? skillRes.data.softwareApplications.length : 0,
          messages: msgRes.data.messages ? msgRes.data.messages.length : 0,
          timeline: timeRes.data.timelines ? timeRes.data.timelines.length : 0,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-10 text-xl">Loading Stats...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-white mb-4">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Projects */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium">Total Projects</h3>
          <p className="text-5xl font-bold text-blue-500 mt-4">{stats.projects}</p>
        </div>

        {/* Card 2: Skills */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium">Total Skills</h3>
          <p className="text-5xl font-bold text-purple-500 mt-4">{stats.skills}</p>
        </div>

        {/* Card 3: Messages */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium">Messages</h3>
          <p className="text-5xl font-bold text-green-500 mt-4">{stats.messages}</p>
        </div>

        {/* Card 4: Timeline */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium">Timeline Entries</h3>
          <p className="text-5xl font-bold text-orange-500 mt-4">{stats.timeline}</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;