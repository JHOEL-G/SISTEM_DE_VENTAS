// src/components/Reportes.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../services/auth';

function Reportes({ token }) {
  const [movimientos, setMovimientos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({
    productoId: '',
    tipo: '',
    fechaDesde: '',
    fechaHasta: ''
  });

  useEffect(() => {
    fetchMovimientos();
    fetchProductos();
  }, []);

  const fetchMovimientos = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`${API_URL}/stock`, config);
      setMovimientos(response.data);
    } catch (error) {
      console.error('Error cargando movimientos', error);
    }
  };

  const fetchProductos = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`${API_URL}/producto`, config);
      setProductos(res.data);
    } catch (error) {
      console.error('Error cargando productos', error);
    }
  };

  const filtrarMovimientos = () => {
    return movimientos.filter((m) => {
      const fecha = new Date(m.fecha);
      const desde = filtros.fechaDesde ? new Date(filtros.fechaDesde) : null;
      const hasta = filtros.fechaHasta ? new Date(filtros.fechaHasta) : null;

      return (
        (!filtros.productoId || m.productoId === filtros.productoId) &&
        (!filtros.tipo || m.type === filtros.tipo) &&
        (!desde || fecha >= desde) &&
        (!hasta || fecha <= hasta)
      );
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reportes de Movimientos</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={filtros.productoId}
          onChange={(e) => setFiltros({ ...filtros, productoId: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">Todos los productos</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>

        <select
          value={filtros.tipo}
          onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">Todos los tipos</option>
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>

        <input
          type="date"
          value={filtros.fechaDesde}
          onChange={(e) => setFiltros({ ...filtros, fechaDesde: e.target.value })}
          className="p-2 border rounded"
        />

        <input
          type="date"
          value={filtros.fechaHasta}
          onChange={(e) => setFiltros({ ...filtros, fechaHasta: e.target.value })}
          className="p-2 border rounded"
        />
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Producto</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Cantidad</th>
            <th className="border p-2">Motivo</th>
            <th className="border p-2">Comentarios</th>
          </tr>
        </thead>
        <tbody>
          {filtrarMovimientos().map((m) => (
            <tr key={m.id}>
              <td className="border p-2">{new Date(m.fecha).toLocaleDateString()}</td>
              <td className="border p-2">{m.productoName}</td>
              <td className="border p-2 capitalize">{m.type}</td>
              <td className="border p-2">{m.cantidad}</td>
              <td className="border p-2">{m.motivo}</td>
              <td className="border p-2">{m.comentarios}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reportes;
