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
    <div className="flex flex-col items-center w-full h-screen pt-20 bg-gray-100">
      <h1 className="mb-10 text-xl font-bold text-center text-primary sm:text-2xl md:text-3xl lg:text-3xl">
        Academic Assistance
      </h1>

      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 w-full max-w-4xl px-4 space-y-4 overflow-y-auto sm:px-10 lg:px-32 pb-28"
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-xl text-sm whitespace-pre-wrap shadow-sm ${
                msg.type === "user"
                  ? "bg-yellow-200 text-gray-900 font-semibold"
                  : "bg-gray-300 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 flex justify-center w-full bg-gray-100">
        <div className="flex items-center w-full max-w-4xl gap-2 px-4 py-4 sm:px-10 lg:px-32">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 text-white transition rounded-full bg-primary hover:opacity-90"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
