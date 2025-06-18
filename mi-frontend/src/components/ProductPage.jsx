import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/auth';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [producto, setProducto] = useState ([null]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/producto`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  },[]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Listado de Productos</h2>
        <button
          onClick={() => {
            setCurrentProduct(null);
            setProducto(null);
            setShowProductForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Agregar Producto
        </button>
      </div>

      <ProductList
        products={products}
        fetchProducts={fetchProducts}
        setProducto={setProducto}
        token={token}
        setCurrentProduct={setCurrentProduct}
        setShowProductForm={setShowProductForm}
      />

      {showProductForm && (
        <ProductForm
          setShowProductForm={setShowProductForm}
          fetchProducts={fetchProducts}
          Producto={producto}
          setProducto={setProducto}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
          token={token}
        />
      )}
    </div>
  );
};

export default ProductPage;
