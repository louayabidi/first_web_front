import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css'; // You can keep or remove if not needed
import logo from '../assets/logo.png';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.email || !form.password || (!isLogin && !form.name)) {
      setStatus('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus('Format d’email invalide.');
      return;
    }

    if (form.password.length < 6) {
      setStatus('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setStatus('Traitement en cours...');

    try {
      if (isLogin) {
        await login(form.email, form.password);
        navigate(form.email === process.env.REACT_APP_ADMIN_EMAIL ? '/admin' : '/');
      } else {
        await signup(form.name, form.email, form.password);
        setIsLogin(true);
      }

      setForm({ name: '', email: '', password: '' });
      setStatus('Succès !');
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Une erreur s’est produite.';
      setStatus(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-amber-200">
          <div className="text-center mb-8">
            <img src={logo} alt="Logo" className="h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-amber-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {isLogin && (
              <div className="text-right">
                <span
                  onClick={() => navigate('/forgot')}
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium cursor-pointer"
                >
                  Mot de passe oublié ?
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition shadow-lg"
            >
              {isLogin ? 'Se connecter' : 'Créer un compte'}
            </button>
          </form>

          {status && (
            <p className={`mt-4 text-center font-medium ${status.includes('Succès') ? 'text-green-600' : 'text-red-600'}`}>
              `}>
              {status}
            </p>
          )}

          <p className="text-center mt-6 text-gray-600">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{' '}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-600 font-bold cursor-pointer hover:underline"
            >
              {isLogin ? 'S’inscrire' : 'Se connecter'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;