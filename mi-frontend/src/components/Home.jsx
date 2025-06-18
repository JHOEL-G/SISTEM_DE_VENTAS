import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdShoppingBag,
  MdLowPriority,
  MdAttachMoney
} from 'react-icons/md';

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Bienvenido a tu Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="p-4 bg-blue-100 rounded-full mr-4">
            <MdShoppingBag className="text-blue-600 text-3xl" />
          </div>
          <div>
            <p className="text-gray-500 text-lg">Total de Productos</p>
            <p className="text-4xl font-bold text-blue-800">0</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="p-4 bg-yellow-100 rounded-full mr-4">
            <MdLowPriority className="text-yellow-600 text-3xl" />
          </div>
          <div>
            <p className="text-gray-500 text-lg">Productos Bajos en Stock</p>
            <p className="text-4xl font-bold text-yellow-800">0</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="p-4 bg-green-100 rounded-full mr-4">
            <MdAttachMoney className="text-green-600 text-3xl" />
          </div>
          <div>
            <p className="text-gray-500 text-lg">Ventas Hoy (Próximamente)</p>
            <p className="text-4xl font-bold text-green-800">$0.00</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Métricas Rápidas</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Este es el panel principal de tu aplicación de gestión de inventario. Aquí podrás ver un resumen rápido de la información más importante de tu tienda.
          Explora las secciones de <Link to="/product-list" className="text-blue-600 hover:underline font-semibold">Productos</Link>, <Link to="/stock-form" className="text-blue-600 hover:underline font-semibold">Movimientos de Stock</Link>, y <Link to="/reports" className="text-blue-600 hover:underline font-semibold">Reportes</Link>.
        </p>
      </div>
    </div>
  );
};

export default Home;
