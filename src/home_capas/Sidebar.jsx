import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Importamos useLocation
import {
  MdDashboard,
  MdProductionQuantityLimits,
  MdSwapHoriz,
  MdOutlineAssessment,
  MdSettings, 
} from 'react-icons/md'; 

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/home',
      icon: <MdDashboard className="mr-3 text-2xl" />,
    },
    {
      name: 'Productos',
      path: '/home/product-list',
      icon: <MdProductionQuantityLimits className="mr-3 text-2xl" />,
    },
    {
      name: 'Movimientos de Stock',
      path: '/home/stock',
      icon: <MdSwapHoriz className="mr-3 text-2xl" />,
    },
    {
      name: 'Reportes',
      path: '/home/reportes',
      icon: <MdOutlineAssessment className="mr-3 text-2xl" />,
    },
  ];

  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col min-h-screen shadow-lg">
      <div className="p-6 text-2xl font-bold text-center border-b border-blue-700">
        Sistema de Inventario
      </div>
      <nav className="flex-grow mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center py-3 px-6 text-lg font-medium transition-colors duration-200
                  ${location.pathname === item.path
                    ? 'bg-blue-600 border-l-4 border-blue-400 text-white' // Estilo para activo
                    : 'hover:bg-blue-700'
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 text-sm text-gray-300 border-t border-blue-700">
        <p className="mb-1">Bienvenido : </p>
        <p className="font-mono break-all">{usuario?.nombre} {usuario?.apellido}</p>
        <p className="text-xs mt-1 text-gray-400 break-all">{usuario?.email}</p>
      </div>
      <div className="p-6">
        <button
          onClick={cerrarSesion}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-colors duration-200"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;