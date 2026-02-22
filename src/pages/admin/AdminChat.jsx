import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../socket";
import {
  useGetAllUsersQuery,
  useGetChatHistoryQuery,
} from "../../api/apiSlice";
import {
  HiPaperAirplane,
  HiUserCircle,
  HiMagnifyingGlass,
  HiCheck,
} from "react-icons/hi2";

// Helper for timestamps
const formatTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const AdminChat = () => {
  const { user: adminUser } = useSelector((state) => state.auth);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [liveMessages, setLiveMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef();

  // 1. Get all users to list on the left
  const { data: allUsers = [] } = useGetAllUsersQuery();

  // 2. Fetch history for the SELECTED user
  const { data: history = [], isFetching } = useGetChatHistoryQuery(
    selectedUser?._id,
    {
      skip: !selectedUser?._id,
    },
  );

  // 3. Socket Management
  useEffect(() => {
    if (selectedUser?._id) {
      setLiveMessages([]); // Clear live cache when switching users
      socket.connect();
      socket.emit("join_chat", selectedUser._id);

      socket.on("receive_message", (newMsg) => {
        if (newMsg.room === selectedUser._id) {
          setLiveMessages((prev) => [
            ...prev,
            { ...newMsg, status: "delivered" },
          ]);
        }
      });
    }
    return () => socket.off("receive_message");
  }, [selectedUser]);

  const allMessages = [...history, ...liveMessages];

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;

    const payload = {
      room: selectedUser._id,
      senderId: adminUser._id,
      text: message,
      isAdmin: true,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    socket.emit("send_message", payload);
    setLiveMessages((prev) => [...prev, { ...payload, status: "delivered" }]);
    setMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const filteredUsers = allUsers.filter(
    (u) =>
      u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-[80vh] bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
      {/* LEFT PANEL: USER LIST */}
      <div className="w-1/3 border-r border-white/5 flex flex-col bg-white/[0.01]">
        <div className="p-6">
          <h2 className="text-white font-black uppercase italic tracking-tighter mb-4 text-xl">
            Support Terminal
          </h2>
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white outline-none focus:border-sky-500 transition-all"
              placeholder="Search investors..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 p-2 custom-scrollbar">
          {filteredUsers.map((u) => (
            <button
              key={u._id}
              onClick={() => setSelectedUser(u)}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                selectedUser?._id === u._id
                  ? "bg-sky-500 text-black shadow-lg shadow-sky-500/20"
                  : "hover:bg-white/5 text-gray-400"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-bold border ${
                  selectedUser?._id === u._id
                    ? "bg-black/10 border-black/10"
                    : "bg-white/5 border-white/5"
                }`}
              >
                {u.firstName?.charAt(0) || "U"}
              </div>
              <div className="text-left">
                <p
                  className={`text-xs font-black uppercase tracking-tight ${selectedUser?._id === u._id ? "text-black" : "text-white"}`}
                >
                  {u.firstName} {u.lastName}
                </p>
                <p
                  className={`text-[10px] truncate w-32 ${selectedUser?._id === u._id ? "text-black/70" : "opacity-50"}`}
                >
                  {u.email}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: CHAT WINDOW */}
      <div className="flex-1 flex flex-col bg-black/20">
        {selectedUser ? (
          <>
            <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
              <div className="h-12 w-12 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 font-bold text-lg">
                {selectedUser.firstName.charAt(0)}
              </div>
              <div>
                <h3 className="text-white text-base font-black uppercase italic tracking-tight">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-[10px] text-emerald-500 uppercase font-black tracking-[0.2em]">
                    Active Secure Session
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {allMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`relative p-4 pb-7 rounded-2xl max-w-[75%] text-[13px] leading-relaxed shadow-sm ${
                      msg.isAdmin
                        ? "bg-sky-500 text-black font-bold rounded-tr-none"
                        : "bg-white/5 text-gray-300 rounded-tl-none border border-white/5"
                    }`}
                  >
                    <p className="pr-2">{msg.text}</p>

                    {/* Meta: Time and Ticks */}
                    <div
                      className={`absolute bottom-1.5 right-3 flex items-center gap-1 opacity-60 scale-90 ${
                        msg.isAdmin ? "text-black" : "text-gray-500"
                      }`}
                    >
                      <span className="text-[9px] font-bold uppercase">
                        {formatTime(msg.timestamp || new Date())}
                      </span>
                      {msg.isAdmin && (
                        <div className="flex">
                          <HiCheck className="text-[14px]" />
                          {msg.status === "delivered" && (
                            <HiCheck className="text-[14px] -ml-2" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            <form
              onSubmit={handleSend}
              className="p-6 border-t border-white/5 bg-white/[0.01] flex gap-3"
            >
              <input
                className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-sky-500 transition-all placeholder:text-gray-700"
                placeholder={`Type a secure response to ${selectedUser.firstName}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="bg-sky-500 p-4 rounded-2xl text-black hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/10">
                <HiPaperAirplane size={22} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-800">
            <div className="relative mb-6">
              <HiUserCircle size={100} className="opacity-5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-dashed border-white/5 rounded-full animate-spin-slow" />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 italic">
              Terminal Idle — Select Client
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
