import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddSkill = () => {
  const [name, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("svg", svg);

    try {
      // Backend Security hata di hai, isliye credentials ki zaroorat nahi
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/softwareapplication/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message);
      setName("");
      setSvg("");
      setSvgPreview("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-[#1a1a1a] p-8 rounded-xl w-full max-w-md border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6">Add New Skill</h2>
        <form onSubmit={handleAddSkill} className="flex flex-col gap-4">
          
          <input
            type="text"
            placeholder="Skill Name (e.g. React.js)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#2a2a2a] p-3 rounded-lg text-white outline-none border border-gray-700 focus:border-blue-500"
            required
          />

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm">Skill Icon/Logo</label>
            <input
              type="file"
              onChange={handleSvg}
              className="bg-[#2a2a2a] p-2 rounded-lg text-gray-400 cursor-pointer"
              required
            />
          </div>

          {svgPreview && (
            <div className="flex justify-center mt-2">
              <img src={svgPreview} alt="Preview" className="w-16 h-16 object-contain" />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 transition-all"
          >
            {loading ? "Adding..." : "Add Skill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;