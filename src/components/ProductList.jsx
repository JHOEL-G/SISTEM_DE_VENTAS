import axios from "axios";
import { API_URL } from "../services/auth";

function ProductList({
  products,
  setCurrentProduct,
  setProducto,
  setShowProductForm,
  fetchProducts,
  token,
}) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/producto/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Error al eliminar el producto. Por favor, intente de nuevo.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 sm:p-5 rounded-lg shadow-md flex flex-col"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
              {product.nombre}
            </h3>

            <p className="text-sm text-gray-600 mb-1 line-clamp-2">
              Descripción: {product.descripcion}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Código:{" "}
              <span className="font-medium text-gray-700">
                {product.codigo}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Stock:{" "}
              <span className="font-medium text-gray-700">
                {product.stockActual}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Precio:{" "}
              <span className="font-medium text-green-600">
                ${product.precioVenta}
              </span>
            </p>

            <div className="mt-auto flex flex-wrap gap-2 justify-start">
              <button
                onClick={() => {
                  setProducto(product);
                  setShowProductForm(true);
                }}
                className="bg-blue-800 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-md transition-colors duration-200 flex-grow sm:flex-grow-0"
              >
                Ver completo
              </button>
              <button
                onClick={() => {
                  setCurrentProduct(product);
                  setShowProductForm(true);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-2 rounded-md transition-colors duration-200 flex-grow sm:flex-grow-0"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-md transition-colors duration-200 flex-grow sm:flex-grow-0"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
