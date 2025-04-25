import React, { useState } from "react";

const Suggestion = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    try {
      const res = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.reply);
      } else {
        setResponse(data.error || "Something went wrong!");
      }
    } catch (error) {
      setResponse("Failed to connect to the server.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Ask the Academic Assistant</h2>
      <input
        type="text"
        placeholder="Type your question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />
      <button
        onClick={handleSend}
        style={{ marginLeft: "10px", padding: "8px 16px" }}
      >
        Send
      </button>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Suggestion;
