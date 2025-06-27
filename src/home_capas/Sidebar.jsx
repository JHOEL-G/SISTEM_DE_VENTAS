import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdProductionQuantityLimits,
  MdSwapHoriz,
  MdOutlineAssessment,
  MdSettings,
  MdMenu,
  MdClose,
} from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/home",
      icon: <MdDashboard className="mr-3 text-xl" />,
    },
    {
      name: "Productos",
      path: "/home/product-list",
      icon: <MdProductionQuantityLimits className="mr-3 text-xl" />,
    },
    {
      name: "Movimientos de Stock",
      path: "/home/stock",
      icon: <MdSwapHoriz className="mr-3 text-xl" />,
    },
    {
      name: "Reportes",
      path: "/home/reportes",
      icon: <MdOutlineAssessment className="mr-3 text-xl" />,
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Botón de menú móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-800 text-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Fondo oscuro al abrir menú móvil */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-blue-800 text-white flex flex-col z-50 shadow-lg
        ${
          isMobile
            ? "w-64 transition-transform duration-300 ease-in-out"
            : "w-64"
        }
        ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
        md:relative md:translate-x-0`}
      >
        {/* Encabezado */}
        <div className="p-6 text-2xl font-bold text-center border-b border-blue-700">
          Sistema de Inventario
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-base font-medium transition-colors duration-200
                  ${
                    location.pathname === item.path
                      ? "bg-blue-600 border-l-4 border-blue-400 text-white"
                      : "hover:bg-blue-700"
                  }
                  `}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-6 py-4 border-t border-blue-700 text-sm text-gray-300">
          <p className="mb-1">Bienvenido:</p>
          <p className="font-mono break-words">
            {usuario?.nombre} {usuario?.apellido}
          </p>
          <p className="text-xs text-gray-400 break-words">{usuario?.email}</p>
        </div>

        <div className="p-6">
          <button
            onClick={cerrarSesion}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
