import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, PenSquare, Check, X } from "lucide-react";

const ManageTimeline = () => {
  const [timelines, setTimelines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Mode States
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchTimelines = async () => {
    try {
      // 👇 IMPORTANT CHANGE: Yahan Render wala URL aayega
      const { data } = await axios.get(
        "https://my-3d-portfolio-w2c6.onrender.com/api/v1/timeline/getall",
        { withCredentials: true }
      );
      setTimelines(data.timelines);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimelines();
  }, []);

  // Handle Edit Click
  const handleEditClick = (element) => {
      setEditingId(element._id);
      setTitle(element.title);
      setDescription(element.description);
      setFrom(element.timeline.from);
      setTo(element.timeline.to);
  }

  // Update Function
  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/timeline/update/${id}`,
        { title, description, from, to },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      toast.success(data.message);
      setEditingId(null);
      fetchTimelines();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Delete Function
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/timeline/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setTimelines((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading Timeline...</div>;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Timeline</h2>
      
      {timelines.length === 0 ? (
          <div className="text-gray-500">No timeline entries found. Add one from 'Add Timeline' tab.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {timelines.map((element) => (
            <div key={element._id} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg group">
                
                {editingId === element._id ? (
                    // EDIT MODE FORM
                    <div className="flex flex-col gap-3">
                        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="bg-[#222] p-2 rounded text-white border border-gray-600 outline-none" placeholder="Title" />
                        <div className="flex gap-2">
                            <input type="text" value={from} onChange={(e)=>setFrom(e.target.value)} className="bg-[#222] p-2 rounded text-white border border-gray-600 outline-none w-1/2" placeholder="From" />
                            <input type="text" value={to} onChange={(e)=>setTo(e.target.value)} className="bg-[#222] p-2 rounded text-white border border-gray-600 outline-none w-1/2" placeholder="To" />
                        </div>
                        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="bg-[#222] p-2 rounded text-white border border-gray-600 outline-none h-20" placeholder="Description" />
                        
                        <div className="flex gap-2 mt-2">
                            <button onClick={()=>handleUpdate(element._id)} className="flex-1 bg-green-600 p-2 rounded text-white flex justify-center hover:bg-green-700"><Check /></button>
                            <button onClick={()=>setEditingId(null)} className="flex-1 bg-gray-600 p-2 rounded text-white flex justify-center hover:bg-gray-700"><X /></button>
                        </div>
                    </div>
                ) : (
                    // VIEW MODE
                    <>
                        <h3 className="text-xl font-bold text-white mb-1">{element.title}</h3>
                        <span className="text-sm text-blue-400 font-mono block mb-3">
                            {element.timeline.from} - {element.timeline.to ? element.timeline.to : "Present"}
                        </span>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{element.description}</p>

                        <div className="flex justify-end gap-3 border-t border-gray-700 pt-3">
                            <button onClick={()=>handleEditClick(element)} className="p-2 text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition"><PenSquare size={20} /></button>
                            <button onClick={()=>handleDelete(element._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"><Trash2 size={20} /></button>
                        </div>
                    </>
                )}

            </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ManageTimeline;
