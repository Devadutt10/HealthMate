import { useState } from "react";
import "./ChatBot.css";
import { Send } from "lucide-react";

const API_KEY = "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";

const systemMessage = {
  role: "system",
  content: "You should only answer medical related questions.",
};

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "ChatGPT", message: "Hello! How can I help you today?", sentTime: "just now" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = async (message) => {
    if (message === "") {
      alert("Please enter a text or ask a question!");
      return 0;
    }

    const newMessage = {
      message: message,
      direction: "outgoing",
      sender: "user",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    await processMessageToAPI(newMessages);
  };

  async function processMessageToAPI(chatMessages) {
    // Reformat the user message to the API

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY, // Corrected Authorization header
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-v3-base:free",
        messages: apiRequestBody.messages,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.choices && data.choices.length > 0) {
          setMessages([
            ...chatMessages,
            {
              message: data.choices[0].message.content,
              sender: "ChatGPT",
            },
          ]);
        } else {
          console.error("API response missing choices or content.");
        }
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }


  return (
    <div className="mainContainerChatBot">  
      <div className="chat-container">
        <div className="headerContainer">
        <h1>Ask ChatBOT</h1>
      </div>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.message}
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if(e.key == "Enter"){
                handleSend(input);
                setInput("")
              }
            }}
          />
          <button onClick={() => {
            handleSend(input); setInput("")
          }}>
            <Send size={20} />
          </button>
        </div>
      </div>  
    </div>
  );
}