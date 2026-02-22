import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../socket";
import { useGetChatHistoryQuery, apiSlice } from "../api/apiSlice";
import {
  HiPaperAirplane,
  HiXMark,
  HiChatBubbleLeftRight,
  HiCheck,
} from "react-icons/hi2";

const formatTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ChatWidget = () => {
  const dispatch = useDispatch();
  // Using user from auth store is perfect
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [liveMessages, setLiveMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  const { data: history = [], isLoading } = useGetChatHistoryQuery(user?._id, {
    skip: !user?._id || !isOpen,
  });

  useEffect(() => {
    if (user?._id) {
      socket.connect();
      socket.emit("join_chat", user._id);

      socket.on("receive_message", (newMsg) => {
        // We update local state for immediate UI feedback
        setLiveMessages((prev) => [...prev, newMsg]);

        // OPTIONAL: Manually update RTK Query cache so history is fresh on next open
        dispatch(
          apiSlice.util.updateQueryData("getChatHistory", user._id, (draft) => {
            // Check if message already exists in history to prevent double-renders
            const exists = draft.some((m) => m._id === newMsg._id);
            if (!exists) draft.push(newMsg);
          }),
        );
      });

      socket.on("display_typing", (data) => {
        setIsTyping(data.isTyping);
      });
    }

    return () => {
      socket.off("receive_message");
      socket.off("display_typing");
      socket.disconnect();
    };
  }, [user, dispatch]);

  // COMBINE & DEDUPLICATE: Ensures messages don't appear twice if they exist in both states
  const allMessages = [...history, ...liveMessages].reduce((acc, current) => {
    const id = current._id || current.tempId;
    const isDuplicate = acc.some((item) => (item._id || item.tempId) === id);
    if (!isDuplicate) acc.push(current);
    return acc;
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const payload = {
      room: user._id,
      senderId: user._id, // Key matched to your saveMessage controller
      text: message,
      isAdmin: false,
      timestamp: new Date().toISOString(),
      tempId: Date.now(), // Unique ID for deduplication until DB gives us an _id
    };

    socket.emit("send_message", payload);

    // Optimistic UI update
    setLiveMessages((prev) => [...prev, { ...payload, status: "delivered" }]);
    setMessage("");
    socket.emit("typing", { receiverId: "ADMIN", isTyping: false });
  };

  const onTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", {
      receiverId: "ADMIN",
      isTyping: e.target.value.length > 0,
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, isTyping]);

  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-sky-500 p-4 rounded-full shadow-2xl text-black hover:scale-110 transition-all border-4 border-black"
        >
          <HiChatBubbleLeftRight size={28} />
        </button>
      ) : (
        <div className="bg-[#0A0C10] border border-white/10 w-80 md:w-96 h-[500px] rounded-[3rem] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-6 bg-white/5 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-white text-xs font-black uppercase italic tracking-tighter">
                Aurelius Support
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <HiXMark size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {allMessages.map((msg, i) => {
              // Fix: Check both 'sender' (from DB) and 'senderId' (from Live)
              const isFromMe =
                msg.sender === user._id || msg.senderId === user._id;

              return (
                <div
                  key={msg._id || msg.tempId || i}
                  className={`flex ${!isFromMe ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`relative p-3 pb-7 rounded-[1.2rem] max-w-[85%] min-w-[100px] text-[13px] leading-relaxed shadow-lg ${
                      !isFromMe
                        ? "bg-[#25282e] text-white rounded-tl-none border border-white/10 shadow-black/40"
                        : "bg-sky-500 text-[#022c33] font-bold rounded-tr-none shadow-sky-500/20"
                    }`}
                  >
                    <p className="pr-10 break-words">{msg.text}</p>

                    <div
                      className={`absolute bottom-1.5 right-3 flex items-center gap-1 scale-[0.85] origin-right ${
                        !isFromMe ? "text-gray-400" : "text-[#022c33]/70"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase whitespace-nowrap">
                        {formatTime(msg.timestamp)}
                      </span>
                      {isFromMe && (
                        <div className="flex">
                          <HiCheck className="text-[14px]" />
                          {(msg.status === "delivered" || msg._id) && (
                            <HiCheck className="text-[14px] -ml-2" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-5 bg-black border-t border-white/5 flex gap-2"
          >
            <input
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white outline-none focus:border-sky-500 transition-all placeholder:text-gray-600"
              placeholder="Query terminal..."
              value={message}
              onChange={onTyping}
            />
            <button
              type="submit"
              className="bg-sky-500 p-3 rounded-2xl text-black hover:bg-sky-400 transition-all active:scale-90"
            >
              <HiPaperAirplane size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
