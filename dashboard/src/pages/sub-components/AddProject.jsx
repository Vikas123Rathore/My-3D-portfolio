import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Image } from "lucide-react";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  const handleProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner);

    try {
      // 👇 YE WALI LINE CORRECT KI HAI Maine
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/project/add", 
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message);
      // Reset Form
      setTitle(""); setDescription(""); setGitRepoLink(""); setProjectLink("");
      setTechnologies(""); setStack(""); setDeployed(""); setProjectBanner(""); setProjectBannerPreview("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="text-white bg-[#1a1a1a] p-8 rounded-xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
      <form onSubmit={handleProject} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Project Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="bg-[#2a2a2a] p-3 rounded-lg border border-gray-700 outline-none focus:border-blue-500" required />
            <select value={deployed} onChange={(e)=>setDeployed(e.target.value)} className="bg-[#2a2a2a] p-3 rounded-lg border border-gray-700 outline-none focus:border-blue-500" required>
                <option value="">Is Deployed?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        </div>
        
        <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} className="bg-[#2a2a2a] p-3 rounded-lg border border-gray-700 outline-none focus:border-blue-500 h-24" required />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Github Link" value={gitRepoLink} onChange={(e)=>setGitRepoLink(e.target.value)} className="bg-[#2a2a2a] p-3 rounded-lg border border-gray-700 outline-none focus:border-blue-500" required />
            <input type="text" placeholder="Live URL" value={projectLink} onChange={(e)=>setProjectLink(e.target.value)} className="bg-[#2a2a2a] p-3 rounded-lg border border-gray-700 outline-none focus:border-blue-500" required />
        </div>

        <input type="text" placeholder="Technologies (React, Node, etc.)" value={technologies} onChange={(e)=>setTechnologies(e.target.value)} className="bg-[#2a2a2a] p-3 rounded-lg border border-gray-700 outline-none focus:border-blue-500" required />
        <input type="text" placeholder="Stack (MERN, MEAN, etc.)" value={stack} onChange={(e)=>setStack(e.target.value)} className="bg-[#2a2a2a] p-3 rounded-lg border border-gray-700 outline-none focus:border-blue-500" required />

        <div className="flex items-center gap-4">
            <div className="relative w-full">
                <input type="file" onChange={handleSvg} className="w-full bg-[#2a2a2a] p-3 rounded-lg border border-gray-700 cursor-pointer" required />
            </div>
            {projectBannerPreview ? (
              <img src={projectBannerPreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
            ) : (
              <div className="w-20 h-20 bg-[#2a2a2a] rounded-lg flex items-center justify-center text-gray-500">
                <Image />
              </div>
            )}
        </div>

        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold transition text-white mt-4">
            {loading ? "Uploading..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};
export default AddProject;