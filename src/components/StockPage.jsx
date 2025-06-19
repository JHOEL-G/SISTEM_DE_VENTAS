import { useState, useEffect } from 'react';
import StockForm from './StockForm';
import StockList from './StockList';
import axios from 'axios';
import { API_URL } from '../services/auth';

function StockPage({ token }) {
  const [showStockForm, setShowStockForm] = useState(false);
  const [stockMovements, setStockMovements] = useState([]);
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const config = {headers: {Authorization: `Bearer ${token}` }}
      const res = await axios.get(`${API_URL}/producto`, config)
      setProducts(res.data)
    } catch (error) {
      console.error('Error al obtener productos', error)
    }
  }

  const fetchStockMovements = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`${API_URL}/stock`, config);
      setStockMovements(res.data);
    } catch (error) {
      console.error('Error al obtener movimientos de stock:', error);
    }
  };

  useEffect(() => {
    fetchStockMovements();
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <button
        onClick={() => setShowStockForm(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Nuevos Movimientos
      </button>

      {showStockForm && (
        <StockForm
          setShowStockForm={setShowStockForm}
          fetchStockMovements={fetchStockMovements}
          products={products}
          token={token}
        />
      )}

      <StockList stockMovements={stockMovements} />
    </div>
  );
}

export default StockPage;
