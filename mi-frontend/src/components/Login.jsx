import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import { API_URL, guardarToken } from "../services/auth.js";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/login`, {
        email, contrasena: contraseña
      });

      const data = res.data;

      guardarToken(data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
      toast.success('Login Exitoso')
      navigate('/home')
    } catch (error) {
      const mensaje = error.response?.message || 'Error al iniciar sesion'
      toast.error(mensaje)
    }
  }
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{
        backgroundImage: 'url(/Designer.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-4xl font-black text-center mb-6">
          MASTER SCHEDULER
        </h2>
        <form onSubmit={manejarLogin} className="space-y-6">
          <h4 className="text-2xl font-semibold text-center mb-4">
            SIGN IN
          </h4>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />

          <button
            type="submit"
            className="w-full bg-black hover:bg-blue-800 transition-colors text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md"
          >
            INICIAR
          </button>

          <p className="text-center text-white">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="text-blue-500 hover:underline font-semibold">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}