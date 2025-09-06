import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Polling every 3 seconds to simulate real-time chat
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!content.trim()) return;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setContent('');
      await fetchMessages(); // Refetch messages after sending
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen gradient-bg p-4">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        <div className="glass p-6 mb-4 animate-fadeInUp">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Общий чат</h1>
              <p className="text-white/80 text-sm mt-1">Общайтесь в реальном времени</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/profile')} 
                className="glass-button px-4 py-2 text-white font-medium"
              >
                Профиль
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 glass p-4 mb-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="h-full overflow-y-auto space-y-4 pr-2">
            {error && <p className="text-red-400">{error}</p>}
            {messages.length === 0 && !error ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-white/60 text-lg">Сообщений пока нет. Начните общение!</p>
              </div>
            ) : (
              messages.map((m) => (
                <div 
                  key={m.id} 
                  className="glass-button p-3 animate-fadeInUp"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-purple-300 text-sm">
                      {m.sender.nickname}
                    </span>
                    <span className="text-white/60 text-xs">
                      {new Date(m.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-white/90 text-sm leading-relaxed">
                    {m.content}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="glass p-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-3">
            <input
              className="flex-1 glass-input"
              placeholder="Введите сообщение..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button 
              type="submit"
              className="btn-primary px-6 py-3 font-semibold"
              disabled={!content.trim()}
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
