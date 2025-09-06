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
    } catch (err) => {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex rounded-2xl shadow-2xl overflow-hidden glass animate-fadeInUp">
        {/* Left Panel */}
        <div className="w-1/2 p-12 text-white hidden md:flex flex-col justify-center bg-black/20">
          <h1 className="text-4xl font-bold mb-3">С возвращением!</h1>
          <p className="text-white/80">
            Войдите в свой аккаунт, чтобы продолжить общение.
          </p>
        </div>

        {/* Right Panel (Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="text-center md:text-left mb-6">
              <h2 className="text-3xl font-bold text-white">Вход в аккаунт</h2>
            </div>
            
            {error && (
              <div className="error-box">
                <p>{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <input 
                className="w-full glass-input" 
                placeholder="Email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <input 
                className="w-full glass-input" 
                placeholder="Пароль" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            
            <button 
              disabled={loading} 
              className="w-full btn-primary"
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
            
            <div className="text-center pt-4">
              <span className="text-white/80">Нет аккаунта? </span>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="btn-link"
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
