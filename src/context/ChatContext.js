import React, { createContext, useReducer, useContext, useEffect } from 'react';

const ChatContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  chats: [],
  currentChatId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      const userChats = JSON.parse(localStorage.getItem(`chats_${action.payload.id}`)) || [];
      return { 
        ...state, 
        user: action.payload, 
        chats: userChats,
        currentChatId: userChats.length > 0 ? userChats[0].id : null
      };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...state, user: null, chats: [], currentChatId: null };
    case 'SET_CURRENT_CHAT':
      return { ...state, currentChatId: action.payload };
    case 'ADD_CHAT':
      const addedChats = [...state.chats, action.payload];
      if (state.user) {
        localStorage.setItem(`chats_${state.user.id}`, JSON.stringify(addedChats));
      }
      return { ...state, chats: addedChats };
    case 'UPDATE_CHAT':
      const updatedChats = state.chats.map(chat => chat.id === action.payload.id ? action.payload : chat);
      if (state.user) {
        localStorage.setItem(`chats_${state.user.id}`, JSON.stringify(updatedChats));
      }
      return { ...state, chats: updatedChats };
    case 'DELETE_CHAT':
      const remainingChats = state.chats.filter(chat => chat.id !== action.payload);
      if (state.user) {
        localStorage.setItem(`chats_${state.user.id}`, JSON.stringify(remainingChats));
      }
      return { 
        ...state, 
        chats: remainingChats,
        currentChatId: remainingChats.length > 0 ? remainingChats[0].id : null
      };
    default:
      return state;
  }
}

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      const userChats = JSON.parse(localStorage.getItem(`chats_${storedUser.id}`)) || [];
      dispatch({ type: 'SET_USER', payload: storedUser });
    }
  }, []);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
