import Login from './components/Login.jsx';
import Registro from './components/Registro.jsx';
import Home from './components/Home.jsx';
import ProductForm from './components/ProductForm.jsx';
import StockList from './components/StockList.jsx';
import MainLayout from './home_capas/MainLayout.jsx';
import { ToastContainer } from 'react-toastify';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './components/ProductPage.jsx';
import StockPage from './components/StockPage.jsx';
import Reportes from './components/Reportes.jsx';

function App() {
  return (
    <Router>
      <ToastContainer position='top-right' theme='colored'/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/home/product-form" element={<ProductForm />} />
          <Route path="/home/product-list" element={<ProductPage />} />
          <Route path="/home/stock-list" element={<StockList />} />
          <Route path="/home/stock" element={<StockPage />} />
          <Route path="/home/reportes" element={<Reportes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;