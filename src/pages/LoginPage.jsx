import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      navigate('/chat');
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
            <h1 className="text-3xl font-bold text-white mb-2">Добро пожаловать</h1>
            <p className="text-white/80">Войдите в свой аккаунт</p>
          </div>
          
          {error && (
            <div className="glass-input p-3 border-red-400 bg-red-50/20">
              <p className="text-sm text-red-200">{error}</p>
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
          </div>
          
          <button 
            disabled={loading} 
            className="w-full btn-primary py-3 text-white font-semibold"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
          
          <div className="text-center pt-4">
            <span className="text-white/80">Нет аккаунта? </span>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-white font-semibold hover:underline transition-all duration-300 hover:text-white/90"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
