import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [avatar, setAvatar] = useState("");
  const [resume, setResume] = useState("");

  const handleAvatar = (e) => setAvatar(e.target.files[0]);
  const handleResume = (e) => setResume(e.target.files[0]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);

    try {
      const { data } = await axios.post(
        "https://my-3d-portfolio-w2c6.onrender.com/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 flex justify-center">
        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-lg">
            <h1 className="text-2xl font-bold">Register Admin (One Time)</h1>
            <input type="text" placeholder="Full Name" value={fullName} onChange={(e)=>setFullName(e.target.value)} className="p-2 bg-gray-800" required/>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="p-2 bg-gray-800" required/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="p-2 bg-gray-800" required/>
            <input type="text" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} className="p-2 bg-gray-800" required/>
            <input type="text" placeholder="About Me" value={aboutMe} onChange={(e)=>setAboutMe(e.target.value)} className="p-2 bg-gray-800" required/>
            <input type="text" placeholder="Portfolio URL (Put any URL for now)" value={portfolioURL} onChange={(e)=>setPortfolioURL(e.target.value)} className="p-2 bg-gray-800" required/>
            
            <label>Avatar (Image):</label>
            <input type="file" onChange={handleAvatar} className="bg-gray-800" required/>
            
            <label>Resume (PDF/Image):</label>
            <input type="file" onChange={handleResume} className="bg-gray-800" required/>
            
            <button type="submit" className="bg-green-600 p-2 font-bold">Register</button>
        </form>
    </div>
  );
};
export default Register;
