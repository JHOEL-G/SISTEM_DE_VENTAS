import axios from 'axios';
import { API_URL } from '../services/auth';

function ProductList({ products, setCurrentProduct ,setProducto, setShowProductForm, fetchProducts, token }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/producto/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
    } catch  {
      alert('Error al eliminar el producto');
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{product.nombre}</h3>
          <p>Descripción: {product.descripcion}</p>
          <p>Código: {product.codigo}</p>
          <p>Stock: {product.stockActual}</p>
          <p>Precio: ${product.precioVenta}</p>
          <div className="mt-2">
            <button onClick={() => { setProducto(product); setShowProductForm(true); }} className="bg-blue-800 text-white px-2 py-1 rounded mr-2">Ver completo</button>
            <button onClick={() => { setCurrentProduct(product); setShowProductForm(true); }} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Editar</button>
            <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;