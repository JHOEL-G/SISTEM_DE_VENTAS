import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../services/auth';

function StockForm({ setShowStockForm, fetchStockMovements, products, token }) {
  const [formData, setFormData] = useState({
    productoId: '',
    cantidad: 0,
    type: 'entrada',
    fecha: new Date().toISOString().split('T')[0],
    motivo: '',
    comentarios: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const selectProducto = products.find(p => p.id === formData.productoId)
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const dataTo = {
        ProductoId: formData.productoId,
        ProductoName: selectProducto?.nombre || '',
        Cantidad: formData.cantidad,
        Fecha: formData.fecha,
        Motivo: formData.motivo,
        Comentarios: formData.comentarios,
        Type: formData.type
      }

      await axios.post(`${API_URL}/stock/${formData.type}`, dataTo , config);

      fetchStockMovements();
      setShowStockForm(false);
    } catch (error) {
      console.error('Error al registrar movimiento:', error);
      alert(error.response?.data?.message || 'Error al registrar el movimiento');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Movimiento de Stock</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={formData.productoId}
            onChange={(e) => setFormData({ ...formData, productoId: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
            required
          >
            <option value="">Seleccionar Producto</option>
            {(products || []).map((product) => (
              <option key={product.id} value={product.id}>
                {product.nombre}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Cantidad"
            value={formData.cantidad}
            onChange={(e) =>
              setFormData({ ...formData, cantidad: parseInt(e.target.value) || 0 })
            }
            className="w-full p-2 mb-2 border rounded"
            required
          />

          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
          </select>

          <input
            type="date"
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Motivo"
            value={formData.motivo}
            onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
            required
          />

          <textarea
            placeholder="Comentarios"
            value={formData.comentarios}
            onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
            rows={3}
          />


          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowStockForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StockForm;
