import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Menu.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  active: boolean;
}

const Menu: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <button onClick={() => navigate('/login')} className="nav-button">Login</button>
        <button onClick={() => navigate('/register')} className="nav-button">Register</button>
      </div>

      <h2>Menu</h2>
      <div className="menu-grid">
        {products.map((product) => (
          <div key={product.id} className="menu-item">
            <img src={product.image} alt={product.name} className="menu-item-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="menu-item-price">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
