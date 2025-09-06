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
          <h1 className="text-4xl font-bold mb-3">Присоединяйтесь</h1>
          <p className="text-white/80">
            Создайте аккаунт и начните общаться в нашем сообществе.
          </p>
        </div>

        {/* Right Panel (Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="text-center md:text-left mb-6">
              <h2 className="text-3xl font-bold text-white">Создать аккаунт</h2>
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
                placeholder="Никнейм" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)} 
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
              {loading ? 'Создание...' : 'Зарегистрироваться'}
            </button>
            
            <div className="text-center pt-4">
              <span className="text-white/80">Уже есть аккаунт? </span>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="btn-link"
              >
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
