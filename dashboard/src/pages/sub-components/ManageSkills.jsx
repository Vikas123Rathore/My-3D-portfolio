import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, PenSquare, Upload, Check } from "lucide-react";

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Mode States
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newSvg, setNewSvg] = useState(null);

  const fetchSkills = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/softwareapplication/getall",
        { withCredentials: true }
      );
      setSkills(data.softwareApplications);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Update Function
  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append("name", newName);
    if(newSvg) formData.append("svg", newSvg);

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/softwareapplication/update/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      toast.success(data.message);
      setEditingId(null);
      setNewName("");
      setNewSvg(null);
      fetchSkills();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Delete Function
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/softwareapplication/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setSkills((prev) => prev.filter((skill) => skill._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Skills</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((element) => (
          <div key={element._id} className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800 shadow-lg flex flex-col items-center gap-4 group">
            
            {/* Icon Preview / Edit */}
            <div className="relative w-20 h-20 bg-black/50 rounded-full flex items-center justify-center border border-gray-700 p-3">
               <img src={element.svg.url} alt={element.name} className="w-full h-full object-contain" />
               
               {/* Hover par Upload Icon dikhana jab edit mode on ho */}
               {editingId === element._id && (
                   <label className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                       <Upload className="text-white" size={20} />
                       <input type="file" className="hidden" onChange={(e)=>setNewSvg(e.target.files[0])} />
                   </label>
               )}
            </div>

            {/* Name Edit / Display */}
            {editingId === element._id ? (
                <input 
                    type="text" 
                    value={newName} 
                    onChange={(e)=>setNewName(e.target.value)}
                    className="bg-[#222] text-white p-2 rounded text-center w-full border border-gray-600 outline-none focus:border-blue-500"
                />
            ) : (
                <h3 className="text-xl font-bold text-gray-300">{element.name}</h3>
            )}

            {/* Buttons */}
            <div className="flex gap-3 w-full mt-2">
                {editingId === element._id ? (
                    <>
                        <button onClick={()=>handleUpdate(element._id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg flex justify-center"><Check size={18}/></button>
                        <button onClick={()=>setEditingId(null)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg text-sm">Cancel</button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={()=>{setEditingId(element._id); setNewName(element.name);}} 
                            className="flex-1 bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600 hover:text-white p-2 rounded-lg flex justify-center transition"
                        >
                            <PenSquare size={18}/>
                        </button>
                        <button 
                            onClick={()=>handleDelete(element._id)} 
                            className="flex-1 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white p-2 rounded-lg flex justify-center transition"
                        >
                            <Trash2 size={18}/>
                        </button>
                    </>
                )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSkills;