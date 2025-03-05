'use client';

import { useState, useRef, useEffect } from 'react';
import './Chat.css';
import socket from "../../socket";

export default function ChatApp() {
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState<string[]>([]);
    useEffect(() => {
        // Escuchar mensajes del servidor
        socket.on("mensaje", (data: string) => {
          setMensajes((prev) => [...prev, data]);
        });
    
        return () => {
          socket.off("mensaje"); // Limpiar eventos al desmontar el componente
        };
      }, []);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot", time: "10:00 AM" },
    { id: 2, text: "I have a question about your services.", sender: "user", time: "10:01 AM" },
    { id: 3, text: "Sure, I'd be happy to answer any questions you have about our services. What would you like to know?", sender: "bot", time: "10:02 AM" },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChatId, setActiveChatId] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const contacts = [
    { id: 1, name: "AI Assistant", status: "online", lastMessage: "Sure, I'd be happy to answer any questions..." },
    { id: 2, name: "John Doe", status: "offline", lastMessage: "See you tomorrow!" },
    { id: 3, name: "Jane Smith", status: "online", lastMessage: "Thanks for the update." },
  ];

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const newId = messages.length + 1;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages([...messages, { id: newId, text: newMessage, sender: "user", time: timeString }]);
    setNewMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const responseId = messages.length + 2;
      setMessages(prev => [...prev, { 
        id: responseId, 
        text: "Thanks for your message! This is a simulated response.", 
        sender: "bot", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 1000);
  };

  // Auto scroll to bottom when new messages arrive


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Chats</h2>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="close-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="contacts-list">
          {contacts.map(contact => (
            <div 
              key={contact.id} 
              className={`contact-item ${activeChatId === contact.id ? 'active' : ''}`}
              onClick={() => setActiveChatId(contact.id)}
            >
              <div className="contact-avatar-container">
                <div className="contact-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span className={`status-indicator ${contact.status}`}></span>
              </div>
              <div className="contact-info">
                <div className="contact-header">
                  <h3>{contact.name}</h3>
                  <span className="time">12:30 PM</span>
                </div>
                <p className="last-message">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="chat-area">
        {/* Chat Header */}
        <div className="chat-header">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="menu-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="active-contact">
            <div className="contact-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="contact-details">
              <h3>{contacts.find(c => c.id === activeChatId)?.name || 'Chat'}</h3>
              <p className="status">
                {contacts.find(c => c.id === activeChatId)?.status === 'online' ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="messages-container">
          <div className="messages">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`message-wrapper ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message">
                  <p className="message-text">{message.text}</p>
                  <p className="message-time">{message.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input Area */}
        <div className="input-area">
          <form onSubmit={handleSendMessage} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="message-input"
            />
            <button type="submit" className="send-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
