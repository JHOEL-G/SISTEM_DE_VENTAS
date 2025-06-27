import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../services/auth";

function Reportes({ token }) {
  const [movimientos, setMovimientos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({
    productoId: "",
    tipo: "",
    fechaDesde: "",
    fechaHasta: "",
  });

  useEffect(() => {
    fetchMovimientos();
    fetchProductos();
  }, [token]);

  const fetchMovimientos = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`${API_URL}/stock`, config);
      setMovimientos(response.data);
    } catch (error) {
      console.error("Error cargando movimientos:", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`${API_URL}/producto`, config);
      setProductos(res.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  const filtrarMovimientos = () => {
    return movimientos.filter((m) => {
      const fecha = new Date(m.fecha);
      const desde = filtros.fechaDesde
        ? new Date(filtros.fechaDesde + "T00:00:00Z")
        : null;
      const hasta = filtros.fechaHasta
        ? new Date(filtros.fechaHasta + "T23:59:59Z")
        : null;

      return (
        (!filtros.productoId || m.productoId === filtros.productoId) &&
        (!filtros.tipo || m.type === filtros.tipo) &&
        (!desde || fecha >= desde) &&
        (!hasta || fecha <= hasta)
      );
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Reportes de Movimientos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <select
          value={filtros.productoId}
          onChange={(e) =>
            setFiltros({ ...filtros, productoId: e.target.value })
          }
          className="p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
        >
          <option value="">Todos los productos</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <select
          value={filtros.tipo}
          onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
          className="p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
        >
          <option value="">Todos los tipos</option>
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>

        <input
          type="date"
          value={filtros.fechaDesde}
          onChange={(e) =>
            setFiltros({ ...filtros, fechaDesde: e.target.value })
          }
          className="p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
        />

        <input
          type="date"
          value={filtros.fechaHasta}
          onChange={(e) =>
            setFiltros({ ...filtros, fechaHasta: e.target.value })
          }
          className="p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        {" "}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Fecha
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Producto
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Tipo
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Cantidad
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Motivo
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Comentarios
              </th>
            </tr>
          </thead>
          <tbody>
            {filtrarMovimientos().length > 0 ? (
              filtrarMovimientos().map((m) => (
                <tr
                  key={m.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(m.fecha).toLocaleDateString("es-ES")}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {productos.find((p) => p.id === m.productoId)?.nombre ||
                      "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap capitalize">
                    {m.type}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{m.cantidad}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {m.motivo || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap max-w-[200px] truncate">
                    {m.comentarios || "N/A"}
                  </td>{" "}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No se encontraron movimientos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reportes;
