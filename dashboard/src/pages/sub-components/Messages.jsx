import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react"; // Delete Icon

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Messages Fetch karne ka function
  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(
        "https://my-3d-portfolio-w2c6.onrender.com/api/v1/message/getall",
        { withCredentials: true }
      );
      setMessages(data.messages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // 2. Message Delete karne ka function
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://my-3d-portfolio-w2c6.onrender.com/api/v1/message/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      
      // Delete hone ke baad list update karo
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Page load hote hi messages lao
  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading Messages...</div>;
  }

  return (
    <div className="min-h-[80vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Inbox Messages</h2>
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          Total: {messages.length}
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="text-gray-500 text-center mt-20 text-lg">
          No messages found! 📭
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((element) => {
            return (
              <div
                key={element._id}
                className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg hover:border-blue-500/50 transition-all relative group"
              >
                {/* Header: Name & Date */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-blue-400">
                      {element.senderName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {new Date(element.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject:</span>
                    <p className="text-white font-medium">{element.subject}</p>
                </div>

                {/* Message Body */}
                <div className="bg-[#111] p-3 rounded-lg border border-gray-800 text-gray-300 text-sm h-32 overflow-y-auto">
                  {element.message}
                </div>

                {/* Delete Button (Hover karne pe dikhega ya hamesha) */}
                <button
                  onClick={() => handleDelete(element._id)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white py-2 rounded-lg transition-colors"
                >
                  <Trash2 size={18} /> Delete Message
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Messages;
