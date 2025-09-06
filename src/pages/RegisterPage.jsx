import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nickname }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeInUp">
        <form onSubmit={onSubmit} className="glass p-8 space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Создать аккаунт</h1>
            <p className="text-white/80">Присоединяйтесь к нашему сообществу</p>
          </div>
          
          {error && (
            <div className="error-box">
              <p>{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <input 
              className="w-full glass-input px-4 py-3 text-white placeholder:text-white/70" 
              placeholder="Email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              className="w-full glass-input px-4 py-3 text-white placeholder:text-white/70" 
              placeholder="Пароль" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <input 
              className="w-full glass-input px-4 py-3 text-white placeholder:text-white/70" 
              placeholder="Никнейм" 
              value={nickname} 
              onChange={(e) => setNickname(e.target.value)} 
              required 
            />
          </div>
          
          <button 
            disabled={loading} 
            className="w-full btn-primary py-3 text-white font-semibold"
          >
            {loading ? 'Создание...' : 'Зарегистрироваться'}
          </button>
          
          <div className="text-center pt-4">
            <span className="text-white/80">Уже есть аккаунт? </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-white font-semibold hover:underline transition-all duration-300 hover:text-white/90"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
