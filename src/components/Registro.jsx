import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../services/auth';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [direccion, setDireccion] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, email, celular, direccion, contrasena }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("usuario", JSON.stringify({
          nombre: data.usuario.nombre,
          apellido: data.usuario.apellido,
          email: data.usuario.email,
        }));
        toast.success(`¡Registro exitoso! Bienvenido, ${data.usuario.nombre} ${data.usuario.apellido}`);
        navigate('/home');
      } else {
        toast.error(data.message || 'Error en el registro. Por favor, verifica tus datos e intenta de nuevo.');
      }
    } catch (error) {
      toast.info("Error al conectar con la API de registro:", error);
      toast.warning("No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{
        backgroundImage: 'url(/Designer.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-md  backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-4xl font-black text-center mb-6">
          MASTER SCHEDULER
        </h2>
        <form onSubmit={manejarRegistro} className="space-y-4">
          <h4 className="text-2xl font-semibold text-center mb-4">
            CREAR CUENTA
          </h4>

          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="tel"
            placeholder="Celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />

          <button
            type="submit"
            className="w-full bg-black hover:bg-blue-800 transition-colors text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md"
          >
            REGISTRARSE
          </button>

          <p className="mt-6 text-center text-white">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/" className="text-blue-500 hover:underline font-semibold">
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
