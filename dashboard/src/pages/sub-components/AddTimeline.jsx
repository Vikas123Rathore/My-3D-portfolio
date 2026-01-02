import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTimeline = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // JSON Data bhejna hai
    const timelineData = { title, description, from, to };

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/timeline/add",
        timelineData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setTitle(""); setDescription(""); setFrom(""); setTo("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6">Add Timeline (Experience/Education)</h2>
        <form onSubmit={handleAddTimeline} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Title (e.g. Matriculation)" value={title} onChange={(e)=>setTitle(e.target.value)} className="bg-[#2a2a2a] p-3 rounded-lg text-white" required />
                <input type="text" placeholder="Duration (e.g. 2018 - 2020)" value={from} onChange={(e)=>setFrom(e.target.value)} className="bg-[#2a2a2a] p-3 rounded-lg text-white" required />
            </div>
            
            <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} className="bg-[#2a2a2a] p-3 rounded-lg text-white h-32" required />

            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
                {loading ? "Adding..." : "Add Entry"}
            </button>
        </form>
    </div>
  );
};

export default AddTimeline;