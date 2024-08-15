import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer, Blog, Features, Possibility, WhatGPT3, Header, Login, Signup, Sidebar, Chat } from './containers';
import { CTA, Brand, Navbar } from './components';
import './App.css';

import PrivateRoute from "./privateroute/PrivateRoute";
import { ChatProvider, useChat } from './context/ChatContext';

const ChatLayout = () => {
  const { state, dispatch } = useChat();
  const username = state.user?.username;

  return (
    <div className="chat-layout">
      <div className="sidebar">
        <Sidebar chats={state.chats} currentChatId={state.currentChatId} dispatch={dispatch} />
      </div>
      <div className="chat">
        <Chat chat={state.chats.find(chat => chat.id === state.currentChatId)} dispatch={dispatch} username={username} />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ChatProvider>
      <Router>
        <div className='App'>
          <div className='gradient__bg'>
          </div>
          <Routes>
            <Route path='/' element={
              <>
              <Navbar />
                <Header />
                <Brand />
                <WhatGPT3 />
                <Features />
                <Possibility />
                <CTA />
                <Blog />
                <Footer />
              </>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/chat' element={
              <PrivateRoute element={<ChatLayout />} />
            } />
          </Routes>
        </div>
      </Router>
    </ChatProvider>
  );
};

export default App;
