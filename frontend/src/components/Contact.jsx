import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://my-3d-portfolio-w2c6.onrender.com/api/v1/message/send",
        { senderName: name, subject, message },
        { headers: { "Content-Type": "application/json" } }
      );
      setStatus("success");
      setName(""); setSubject(""); setMessage("");
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="min-h-screen py-20 relative flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left Side: Info */}
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
                Let's Work Together
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
                Have a project in mind or just want to say hi? I'm always open to discussing new projects.
            </p>

            <div className="space-y-6">
                {/* Glassy Icon Boxes */}
                <ContactInfoBox icon={<Mail />} text="vikasrathore160@gmail.com" color="text-blue-400" bgColor="bg-blue-500/10" borderColor="border-blue-500/20" />
                <ContactInfoBox icon={<Phone />} text="+91 6397722144" color="text-purple-400" bgColor="bg-purple-500/10" borderColor="border-purple-500/20" />
                <ContactInfoBox icon={<MapPin />} text="Bareilly, India" color="text-pink-400" bgColor="bg-pink-500/10" borderColor="border-pink-500/20" />
            </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
            <form onSubmit={handleSendMessage} className="flex flex-col gap-4">
                {/* Glassy Inputs */}
                <Input field="Name" value={name} onChange={setName} />
                <Input field="Subject" value={subject} onChange={setSubject} />
                <textarea placeholder="Your Message" value={message} onChange={(e)=>setMessage(e.target.value)} className="bg-black/30 backdrop-blur-md p-4 rounded-lg text-white outline-none border border-white/10 focus:border-blue-500 focus:bg-black/50 transition-all duration-300 h-32 resize-none" required />

                <button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 scale-100 hover:scale-[1.02]">
                    {loading ? "Sending..." : <>Send Message <Send size={18}/></>}
                </button>

                {status === "success" && <p className="text-green-400 text-center font-medium">Message Sent Successfully! ✅</p>}
                {status === "error" && <p className="text-red-400 text-center font-medium">Something went wrong! ❌</p>}
            </form>
        </motion.div>

      </div>
    </section>
  );
};

// Helper Components for cleaner code
const Input = ({ field, value, onChange }) => (
    <input type="text" placeholder={`Your ${field}`} value={value} onChange={(e)=>onChange(e.target.value)} className="bg-black/30 backdrop-blur-md p-4 rounded-lg text-white outline-none border border-white/10 focus:border-blue-500 focus:bg-black/50 transition-all duration-300" required />
);

const ContactInfoBox = ({ icon, text, color, bgColor, borderColor }) => (
    <div className={`flex items-center gap-4 text-gray-300 p-4 rounded-xl border ${borderColor} ${bgColor} backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-default`}>
        <div className={`p-3 rounded-full bg-black/30 ${color}`}>{icon}</div>
        <span className="font-medium">{text}</span>
    </div>
);

export default Contact;
