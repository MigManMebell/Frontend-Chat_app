import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user data from the backend
  }, []);

  const save = async () => {
    // Update user data in the backend
    setMessage('Сохранено');
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-fadeInUp">
        <div className="glass p-8 space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Ваш профиль</h1>
            <p className="text-white/80">Управляйте своими данными</p>
          </div>
          
          {message && (
            <div className="glass-input p-3 bg-green-500/20">
              <p className="text-sm text-white/90">{message}</p>
            </div>
          )}
          
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/50 flex-shrink-0">
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center">
                  <span className="text-white/50 text-xs">Аватар</span>
                </div>
              )}
            </div>
            <div className="w-full space-y-4">
              <input 
                className="w-full glass-input px-4 py-3 text-white placeholder:text-white/70" 
                placeholder="Никнейм" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)} 
              />
              <input 
                className="w-full glass-input px-4 py-3 text-white placeholder:text-white/70" 
                placeholder="Ссылка на аватар" 
                value={avatarUrl} 
                onChange={(e) => { setAvatarUrl(e.target.value); setPreview(e.target.value || null); }} 
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              onClick={save} 
              className="w-full btn-primary py-3 text-white font-semibold"
            >
              Сохранить
            </button>
            <button 
              onClick={() => navigate('/chat')} 
              className="w-full btn-secondary py-3 text-white font-semibold"
            >
              Вернуться в чат
            </button>
          </div>
          
          <div className="text-center pt-4">
            <button
              onClick={logout}
              className="text-white/70 font-semibold hover:underline transition-all duration-300 hover:text-white"
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
