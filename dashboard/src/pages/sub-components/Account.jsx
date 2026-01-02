import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Upload, FileText, Image as ImageIcon } from "lucide-react";

const Account = () => {
  const [resume, setResume] = useState("");
  const [avatar, setAvatar] = useState("");
  
  // 👇 FIX: Do alag loading states banaye hain
  const [profileLoading, setProfileLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);

  // Resume Update Handler
  const handleResumeUpdate = async (e) => {
    e.preventDefault();
    setResumeLoading(true); // Sirf resume loading on karo
    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/update/me",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Resume Updated Successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error Updating Resume");
    }
    setResumeLoading(false); // Sirf resume loading off karo
  };

  // Avatar Update Handler
  const handleAvatarUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true); // Sirf profile loading on karo
    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/update/me",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Profile Photo Updated!");
    } catch (error) {
      toast.error("Error Updating Avatar");
    }
    setProfileLoading(false); // Sirf profile loading off karo
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* 1. Update Profile Photo Card */}
      <div className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-800 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="text-blue-500" size={28} />
            <h2 className="text-2xl font-bold text-white">Update Profile Photo</h2>
        </div>
        <form onSubmit={handleAvatarUpdate} className="flex flex-col gap-4">
            <div className="relative">
                <input 
                    type="file" 
                    onChange={(e)=>setAvatar(e.target.files[0])} 
                    className="w-full bg-[#2a2a2a] text-gray-300 p-3 rounded-lg border border-gray-700 focus:border-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
            </div>
            <button 
                type="submit" 
                disabled={profileLoading} // Sirf profile loading check karega
                className="bg-blue-600 p-3 rounded-lg text-white font-bold hover:bg-blue-700 transition-all flex justify-center items-center gap-2"
            >
                {profileLoading ? "Uploading..." : <>Update Photo <Upload size={18} /></>}
            </button>
        </form>
      </div>

      {/* 2. UPDATE RESUME SECTION Card */}
      <div className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-800 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
            <FileText className="text-purple-500" size={28} />
            <h2 className="text-2xl font-bold text-white">Update Resume (CV)</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">Select a new PDF file to replace the old one.</p>
        
        <form onSubmit={handleResumeUpdate} className="flex flex-col gap-4">
            <div className="relative">
                <input 
                    type="file" 
                    onChange={(e)=>setResume(e.target.files[0])} 
                    className="w-full bg-[#2a2a2a] text-gray-300 p-3 rounded-lg border border-gray-700 focus:border-purple-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    accept=".pdf" 
                />
            </div>
            <button 
                type="submit" 
                disabled={resumeLoading} // Sirf resume loading check karega
                className="bg-purple-600 p-3 rounded-lg text-white font-bold hover:bg-purple-700 transition-all flex justify-center items-center gap-2"
            >
                {resumeLoading ? "Uploading..." : <>Upload New Resume <Upload size={18} /></>}
            </button>
        </form>
      </div>

    </div>
  );
};

export default Account;