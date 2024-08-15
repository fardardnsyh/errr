import React from 'react';
import { FaComments, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import './Sidebar.css'; // Import custom CSS for styling
import { useChat } from '../../context/ChatContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const { state, dispatch } = useChat(); // Access state and dispatch from context
  const navigate = useNavigate();

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `Chat ${state.chats.length + 1}`,
      messages: [],
      lastUsed: new Date().toLocaleDateString(),
    };
    dispatch({ type: 'ADD_CHAT', payload: newChat });
    dispatch({ type: 'SET_CURRENT_CHAT', payload: newChat.id });
  };

  const deleteChat = (chatId) => {
    dispatch({ type: 'DELETE_CHAT', payload: chatId });
  };

  return (
    <div className="sidebar-container">
      <button onClick={createNewChat} className="new-chat-button">
        New Chat <FaPlusCircle className="plus-icon" />
      </button>
      <div className="chat-list">
        {state.chats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${chat.id === state.currentChatId ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_CURRENT_CHAT', payload: chat.id })}
          >
            <FaComments className="chat-icon" />
            <span className="chat-title">{chat.title}</span>
            <span className="chat-date">{chat.lastUsed}</span>
            <button className="delete-button" onClick={() => deleteChat(chat.id)}>
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
      <Button 
        className="back-button1" 
        onClick={() => navigate('/')}
      >
        <i className="fas fa-home"></i>
      </Button>
    </div>
  );
}

export default Sidebar;
