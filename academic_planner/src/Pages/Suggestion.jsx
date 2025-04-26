import React, { useState, useEffect, useRef } from "react";

const Suggestion = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newChat = { type: "user", text: message };
    setChatHistory((prev) => [...prev, newChat]);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      const botReply = {
        type: "bot",
        text: res.ok ? data.reply : data.error || "Something went wrong!",
      };

      setChatHistory((prev) => [...prev, botReply]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", text: "Failed to connect to the server." },
      ]);
    }
  };

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="flex flex-col items-center w-full h-screen pt-20 bg-gradient-to-b from-gray-100 to-gray-200">
      <h1 className="mb-6 text-3xl font-bold text-primary">
        Academic Assistance
      </h1>

      {/* Chat Section */}
      <div
        ref={chatContainerRef}
        className="flex-1 w-full max-w-4xl p-6 pb-32 space-y-4 overflow-y-auto" // <== added pb-32 here
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-5 py-3 max-w-[75%] text-sm rounded-3xl shadow-md whitespace-pre-wrap ${
                msg.type === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-white text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 flex justify-center w-full bg-transparent">
        <div className="flex items-center w-full max-w-4xl gap-3 p-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-5 py-3 text-sm bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 text-sm font-semibold text-white transition-all rounded-full shadow-md bg-primary hover:bg-primary-dark"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
