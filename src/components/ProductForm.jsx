import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/auth';

function ProductForm({ setShowProductForm, fetchProducts, currentProduct, setCurrentProduct, Producto, setProducto, token }) {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    precioCompre: 0,
    precioVenta: 0,
    stockActual: 0,
    stockMinimo: 0,
    stockMaximo: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  useEffect(() => {
    if (currentProduct) {
      setFormData({ ...currentProduct });
    } else if (Producto) {
      setFormData({ ...Producto})
    }
  }, [currentProduct, Producto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (currentProduct) {
        await axios.put(`${API_URL}/productos/${currentProduct.id}`, formData, config);
      } else {
        await axios.post(`${API_URL}/productos`, formData, config);
      }

      fetchProducts();
      setShowProductForm(false);
      setCurrentProduct(null);
      setProducto(true);
    } catch (error) {
      alert(error.response?.data.message || 'Error al guardar el producto');
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">
          {currentProduct ? 'Editar Producto' : Producto  ? 'Completo Producto' : "Agregar Producto"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Código', name: 'codigo', type: 'text' },
            { label: 'Nombre', name: 'nombre', type: 'text' },
            { label: 'Descripción', name: 'descripcion', type: 'text' },
            { label: 'Categoría', name: 'categoria', type: 'text' },
            { label: 'Precio Compra', name: 'precioCompre', type: 'number' },
            { label: 'Precio Venta', name: 'precioVenta', type: 'number' },
            { label: 'Stock Actual', name: 'stockActual', type: 'number' },
            { label: 'Stock Mínimo', name: 'stockMinimo', type: 'number' },
            { label: 'Stock Máximo', name: 'stockMaximo', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                readOnly={!!Producto && !currentProduct}
              />
            </div>
          ))}
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="button"
              onClick={() => {
                setShowProductForm(false);
                setCurrentProduct(null);
                setProducto(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            {Producto  && !currentProduct && (
              <div className='md:col-span-2 flex gap-4'>
              <div className='w-1/2'>
                <label className='block text-sm font-medium mb-1'>FECHA DE CREACION</label>
                <input type="text" value={new Date(formData.createdAt).toLocaleString()} readOnly className='w-full p-2 border rounded bg-gray-100'/>
              </div>
              <div className='w-1/2'>
                <label className='block text-sm font-medium mb-1'>ULTIMA ACTUALIZACION</label>
                <input type="text" value={new Date(formData.updatedAt).toLocaleString()} readOnly className='w-full p-2 border bg-gray-100'/>
              </div>
              </div>
            )}

            {!Producto && (
               <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
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
