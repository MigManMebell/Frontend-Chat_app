import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch messages from the backend
  }, []);

  const sendMessage = () => {
    if (!content.trim()) return;
    // Send message to the backend via WebSocket
    console.log('Sending message:', content);
    setContent('');
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
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-white/60 text-lg">Сообщений пока нет. Начните общение!</p>
              </div>
            ) : (
              messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className="glass-button p-4 animate-slideInFromLeft"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white text-sm">
                      {m.sender}
                    </span>
                    <span className="text-white/60 text-xs">
                      {m.time}
                    </span>
                  </div>
                  <div className="text-white/90 text-sm leading-relaxed">
                    {m.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass p-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex gap-3">
            <input
              className="flex-1 glass-input px-4 py-3 text-white placeholder:text-white/70"
              placeholder="Введите сообщение..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button 
              onClick={sendMessage} 
              className="btn-primary px-6 py-3 font-semibold"
              disabled={!content.trim()}
            >
              ✈️ Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
