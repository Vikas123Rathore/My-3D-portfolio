import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Upload, PenSquare, X, Check } from "lucide-react";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Mode States
  const [editingProject, setEditingProject] = useState(null); // ID of project being edited
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  // Projects Fetch Karo
  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(
        "https://my-3d-portfolio-w2c6.onrender.comapi/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 📝 Open Edit Modal & Fill Data
  const handleEditClick = (project) => {
    setEditingProject(project._id);
    setTitle(project.title);
    setDescription(project.description);
    setGitRepoLink(project.gitRepoLink);
    setProjectLink(project.projectLink);
    setTechnologies(project.technologies);
    setStack(project.stack);
    setDeployed(project.deployed);
  };

  // 💾 Save Edited Data
  const handleUpdateText = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/project/update/${editingProject}`,
        {
          title,
          description,
          gitRepoLink,
          projectLink,
          technologies,
          stack,
          deployed,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setEditingProject(null); // Close Modal
      fetchProjects(); // Refresh List
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // 🗑️ Delete Function
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/project/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // 🖼️ Update Image Function
  const handleImageUpdate = async (id, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("projectBanner", file);

    const toastId = toast.loading("Updating Image...");
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/project/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.update(toastId, { render: data.message, type: "success", isLoading: false, autoClose: 3000 });
      fetchProjects();
    } catch (error) {
      toast.update(toastId, { render: error.response.data.message, type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex flex-col gap-6 relative">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((element) => {
          return (
            <div key={element._id} className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow-lg group">
              
              {/* Image Section */}
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <img src={element.projectBanner.url} alt={element.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-lg">
                        <Upload size={18} /> Change Photo
                        <input type="file" className="hidden" onChange={(e) => handleImageUpdate(element._id, e.target.files[0])} />
                    </label>
                </div>
              </div>

              {/* Text Info */}
              <h3 className="text-xl font-bold text-white mb-2">{element.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{element.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-gray-800 text-blue-400 px-2 py-1 rounded border border-gray-700">{element.stack}</span>
                <span className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded border border-gray-700">Deployed: {element.deployed}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <button 
                    onClick={() => handleEditClick(element)} 
                    className="flex items-center gap-2 bg-yellow-600/10 text-yellow-500 px-3 py-2 rounded-lg hover:bg-yellow-600 hover:text-white transition"
                >
                    <PenSquare size={18} /> Edit
                </button>
                
                <button 
                    onClick={() => handleDelete(element._id)} 
                    className="flex items-center gap-2 bg-red-600/10 text-red-500 px-3 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                    <Trash2 size={18} /> Delete
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* ✏️ EDIT MODAL (Popup) */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Edit Project Details</h3>
                    <button onClick={() => setEditingProject(null)} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400">Project Title</label>
                            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="bg-[#222] p-3 rounded-lg text-white border border-gray-700 focus:border-blue-500 outline-none" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400">Is Deployed?</label>
                            <select value={deployed} onChange={(e)=>setDeployed(e.target.value)} className="bg-[#222] p-3 rounded-lg text-white border border-gray-700 focus:border-blue-500 outline-none">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-400">Description</label>
                        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="bg-[#222] p-3 rounded-lg text-white border border-gray-700 focus:border-blue-500 outline-none h-24" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400">Github Link</label>
                            <input type="text" value={gitRepoLink} onChange={(e)=>setGitRepoLink(e.target.value)} className="bg-[#222] p-3 rounded-lg text-white border border-gray-700 focus:border-blue-500 outline-none" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400">Project Link</label>
                            <input type="text" value={projectLink} onChange={(e)=>setProjectLink(e.target.value)} className="bg-[#222] p-3 rounded-lg text-white border border-gray-700 focus:border-blue-500 outline-none" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-400">Technologies</label>
                        <input type="text" value={technologies} onChange={(e)=>setTechnologies(e.target.value)} className="bg-[#222] p-3 rounded-lg text-white border border-gray-700 focus:border-blue-500 outline-none" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-400">Stack</label>
                        <input type="text" value={stack} onChange={(e)=>setStack(e.target.value)} className="bg-[#222] p-3 rounded-lg text-white border border-gray-700 focus:border-blue-500 outline-none" />
                    </div>

                    <button 
                        onClick={handleUpdateText} 
                        className="mt-4 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition flex justify-center items-center gap-2"
                    >
                        <Check size={20} /> Save Changes
                    </button>
                </div>

            </div>
        </div>
      )}

    </div>
  );
};

export default ManageProjects;
