import { useState } from "react";
import axios from "axios";
import { API_URL } from "../services/auth";

function StockForm({ setShowStockForm, fetchStockMovements, products, token }) {
  const [formData, setFormData] = useState({
    productoId: "",
    cantidad: 0,
    type: "entrada",
    fecha: new Date().toISOString().split("T")[0],
    motivo: "",
    comentarios: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedProduct = products.find(
        (p) => p.id === formData.productoId
      );
      if (!selectedProduct) {
        alert("Por favor, selecciona un producto válido.");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const dataToSend = {
        productoId: formData.productoId,
        productoName: selectedProduct?.nombre || "",
        cantidad: formData.cantidad,
        fecha: formData.fecha,
        motivo: formData.motivo,
        comentarios: formData.comentarios,
        type: formData.type,
      };

      await axios.post(`${API_URL}/stock/${formData.type}`, dataToSend, config);

      fetchStockMovements();
      setShowStockForm(false);
    } catch (error) {
      console.error("Error al registrar movimiento:", error);
      alert(
        error.response?.data?.message ||
          "Error al registrar el movimiento. Asegúrate de que la cantidad y el producto sean válidos."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-sm w-full max-h-[90vh] overflow-y-auto transform scale-95 md:scale-100 transition-transform duration-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Registrar Movimiento de Stock
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          <div>
            <label
              htmlFor="productoId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Producto
            </label>
            <select
              id="productoId"
              name="productoId"
              value={formData.productoId}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
            >
              <option value="">Seleccionar Producto</option>
              {(products || []).map((product) => (
                <option key={product.id} value={product.id}>
                  {product.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="cantidad"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cantidad
            </label>
            <input
              id="cantidad"
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
              min="1"
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de Movimiento
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="fecha"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Fecha
            </label>
            <input
              id="fecha"
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="motivo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Motivo
            </label>
            <input
              id="motivo"
              type="text"
              name="motivo"
              placeholder="Motivo (ej: Venta, Compra, Ajuste)"
              value={formData.motivo}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="comentarios"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Comentarios (Opcional)
            </label>
            <textarea
              id="comentarios"
              name="comentarios"
              placeholder="Añadir comentarios adicionales aquí..."
              value={formData.comentarios}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              rows={3}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end mt-6 gap-3">
            <button
              type="button"
              onClick={() => setShowStockForm(false)}
              className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded-md transition-colors duration-200 order-2 sm:order-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition-colors duration-200 order-1 sm:order-2"
            >
              Registrar Movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StockForm;
