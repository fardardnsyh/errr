import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chat.css";
import { FaEdit, FaUserCircle, FaPaperPlane, FaSignOutAlt } from "react-icons/fa";
import logo from '../../assets/logo.svg';
import logo1 from "../../assets/logo.png"
import { useChat } from '../../context/ChatContext';

function Chat({ chat, dispatch, username }) {
  const [prompt, setPrompt] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showBuiltInPrompts, setShowBuiltInPrompts] = useState(true);
  const [builtInPrompts] = useState([
    "Help me plan a game night with my 5 best friends for under $100.",
    "What are the best tips to improve my public speaking skills?",
    "Can you help me find the latest news on web development?",
    "Write JavaScript code to sum all elements in an array.",
  ]);

  const [typingResponseId, setTypingResponseId] = useState(null); // New state to track typing effect
  const [typingResponses, setTypingResponses] = useState([]); // Array to hold typing responses

  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  const { state, dispatch: chatDispatch } = useChat();

  const formatResponse = (response) => {
    const formatted = response
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br />");
    return formatted;
  };

  const handleSend = async () => {
    if (prompt.trim() === "") return;

    let response = "Error: Unable to fetch response";
    try {
      const result = await axios.post(
        "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
        {
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
        }
      );

      if (
        result.data &&
        result.data.candidates &&
        result.data.candidates[0] &&
        result.data.candidates[0].content &&
        result.data.candidates[0].content.parts &&
        result.data.candidates[0].content.parts[0] &&
        result.data.candidates[0].content.parts[0].text
      ) {
        response = result.data.candidates[0].content.parts[0].text;
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    const formattedResponse = formatResponse(response);
    const responseId = new Date().getTime(); // Unique identifier for each response
    setTypingResponseId(responseId);
    setTypingResponses(prev => [
      ...prev,
      { id: responseId, response: formattedResponse, currentText: '', currentWordIndex: 0 }
    ]);

    const newMessage = { prompt, response: formattedResponse };

    const updatedChat = {
      ...chat,
      messages: editMode
        ? chat.messages.map((msg, index) =>
            index === editIndex ? newMessage : msg
          )
        : [...chat.messages, newMessage],
      lastUsed: new Date().toLocaleDateString(),
    };

    chatDispatch({ type: "UPDATE_CHAT", payload: updatedChat });

    setPrompt("");
    setEditMode(false);
    setEditIndex(null);
    setShowBuiltInPrompts(false);
  };

  const handleLogout = () => {
    chatDispatch({ type: 'LOGOUT' });
    // Redirect to login page or perform any additional logout actions
    window.location.href = '/';
  };

  useEffect(() => {
    if (chat) {
      setPrompt("");
      setEditMode(false);
      setEditIndex(null);
      setShowBuiltInPrompts(chat.messages.length === 0);
    }
  }, [chat]);

  useEffect(() => {
    typingResponses.forEach(({ id, response, currentText, currentWordIndex }) => {
      if (id === typingResponseId) {
        const timer = setTimeout(() => {
          if (currentWordIndex < response.length) {
            setTypingResponses(prev => prev.map(r =>
              r.id === id
                ? { ...r, currentText: currentText + response[currentWordIndex], currentWordIndex: currentWordIndex + 1 }
                : r
            ));
          } else {
            clearTimeout(timer);
          }
        }, 50); // Adjust the delay to control typing speed

        return () => clearTimeout(timer);
      }
    });
  }, [typingResponses, typingResponseId]);


  if (!chat)
    return (

                <div className="built-in-prompts" style={{marginTop:'100px'}}>
                <img src={logo1} style={{ backgroundColor: 'white', borderRadius: '200px' }} width={'100px'} height={'auto'} />
                <h3>Built-in Prompts</h3>
                <ul>
                  {builtInPrompts.map((prompt, index) => (
                    <li key={index} onClick={() => setPrompt(prompt)}>
                      {prompt}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: "50px", textAlign: "center", marginTop: "100px" }}>
        Please select a chat to start
      </p>
              </div>
    );

  return (
    <div className="chat-container">
      <header className="profile-header">
      <div className="gpt3__navbar-links_logo">
        <img src={logo} alt="logo" />
      </div>
        <h2 className="title">ChatMinds</h2>
        <div className="profile-info">
          <FaUserCircle size={30} className="profile-icon" />
          <h2 className="username">{username}</h2>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt size={20} />
          </button>
        </div>
      </header>

      <div className="chat-content">
        {showBuiltInPrompts && (
          <div className="built-in-prompts">
            <img src={logo} style={{ backgroundColor: 'white', borderRadius: '200px' }} width={'100px'} height={'auto'} />
            <h3>Built-in Prompts</h3>
            <ul>
              {builtInPrompts.map((prompt, index) => (
                <li key={index} onClick={() => setPrompt(prompt)}>
                  {prompt}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="chat-messages-container">
          <div className="chat-card">
            <div className="chat-messages">
              {chat.messages.map((msg, index) => (
                <div key={index} className="message-item">
                  <div className="user-prompt">
                    <span>{msg.prompt}</span>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setPrompt(msg.prompt);
                        setEditMode(true);
                        setEditIndex(index);
                      }}
                    >
                      <FaEdit />
                    </button>
                  </div>
                  <div
                    className="ai-response"
                    dangerouslySetInnerHTML={{ __html: typingResponses.find(r => r.id === msg.responseId)?.currentText || msg.response }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="chat-input-container">
        <textarea
          className="chat-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={!prompt.trim()}
        >
          <FaPaperPlane  color="black" className="send-icon"/>
        </button>
      </div>
    </div>
  );
}

export default Chat;
