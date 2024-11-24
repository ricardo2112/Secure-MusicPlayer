import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useChat } from "../context/ChatContext";

const socket = io("http://localhost:3000");

// Array of possible users
const USERS = [
  { id: 1, username: "User1" },
  { id: 2, username: "User2" },
];

// Select a random user when the page loads
const CURRENT_USER = USERS[Math.floor(Math.random() * USERS.length)];

const Community = () => {
  const [message, setMessage] = useState("");
  const { chatHistory, setChatHistory } = useChat();

  useEffect(() => {
    // Send user data when connected
    socket.emit("setUserData", CURRENT_USER);

    // Listen for chat messages
    socket.on("chatMessage", (msg) => {
      setChatHistory((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [setChatHistory]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#233446] text-[#E0E1D1] font-poppins">
      <div className="bg-[#141D26] p-4">
        <span className="text-[#E0E1D1]">
          Connected as: {CURRENT_USER.username}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-2">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg shadow max-w-xs ${
              msg.userId === CURRENT_USER.id
                ? "bg-[#C41E5C] self-end"
                : "bg-[#141D26] self-start"
            } text-[#E0E1D1]`}
          >
            <div className="text-sm opacity-75 mb-1">{msg.username}</div>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#141D26] shadow flex">
        <input
          type="text"
          className="flex-1 border border-[#E0E1D1] rounded p-2 bg-[#233446] text-[#E0E1D1]"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-[#C41E5C] text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Community;