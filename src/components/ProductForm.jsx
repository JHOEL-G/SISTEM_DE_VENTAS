import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/auth";

function ProductForm({
  setShowProductForm,
  fetchProducts,
  currentProduct,
  setCurrentProduct,
  Producto,
  setProducto,
  token,
}) {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    categoria: "",
    precioCompre: 0,
    precioVenta: 0,
    stockActual: 0,
    stockMinimo: 0,
    stockMaximo: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (currentProduct) {
      setFormData({ ...currentProduct });
    } else if (Producto) {
      setFormData({ ...Producto });
    }
  }, [currentProduct, Producto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (currentProduct) {
        await axios.put(
          `${API_URL}/productos/${currentProduct.id}`,
          formData,
          config
        );
      } else {
        await axios.post(`${API_URL}/productos`, formData, config);
      }

      fetchProducts();
      setShowProductForm(false);
      setCurrentProduct(null);
      setProducto(null);
    } catch (error) {
      alert(error.response?.data.message || "Error al guardar el producto");
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transform scale-95 md:scale-100 transition-transform duration-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {currentProduct
            ? "Editar Producto"
            : Producto
            ? "Detalles del Producto"
            : "Agregar Nuevo Producto"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { label: "Código", name: "codigo", type: "text" },
            { label: "Nombre", name: "nombre", type: "text" },
            { label: "Descripción", name: "descripcion", type: "textarea" },
            { label: "Categoría", name: "categoria", type: "text" },
            { label: "Precio Compra", name: "precioCompre", type: "number" },
            { label: "Precio Venta", name: "precioVenta", type: "number" },
            { label: "Stock Actual", name: "stockActual", type: "number" },
            { label: "Stock Mínimo", name: "stockMinimo", type: "number" },
            { label: "Stock Máximo", name: "stockMaximo", type: "number" },
          ].map(({ label, name, type }) => (
            <div
              key={name}
              className={name === "descripcion" ? "md:col-span-2" : ""}
            >
              {" "}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  rows="3"
                  required={!Producto && !currentProduct}
                  readOnly={!!Producto && !currentProduct}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  required={!Producto && !currentProduct}
                  readOnly={!!Producto && !currentProduct}
                />
              )}
            </div>
          ))}

          {!!Producto && !currentProduct && (
            <>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FECHA DE CREACIÓN
                </label>
                <input
                  type="text"
                  value={new Date(formData.createdAt).toLocaleString()}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ÚLTIMA ACTUALIZACIÓN
                </label>
                <input
                  type="text"
                  value={new Date(formData.updatedAt).toLocaleString()}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>
            </>
          )}

          <div className="md:col-span-2 flex flex-col sm:flex-row justify-end mt-6 gap-3">
            <button
              type="button"
              onClick={() => {
                setShowProductForm(false);
                setCurrentProduct(null);
                setProducto(null);
              }}
              className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded-md transition-colors duration-200"
            >
              {Producto && !currentProduct ? "Cerrar" : "Cancelar"}
            </button>
            {!Producto && (
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition-colors duration-200"
              >
                Guardar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
