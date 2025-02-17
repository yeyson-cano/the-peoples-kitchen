import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { ReactComponent as CartIcon } from '../assets/images/cart-icon.svg';
import '../styles/Menu.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image: string;
  category: string;
  active: boolean;
}

const Menu: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // Ensure price is treated as a number
        const formattedProducts = data.map((product: Product) => ({
          ...product,
          price: Number(product.price),
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    if (localStorage.getItem('showWelcomeAlert')) {
      setShowWelcome(true);
      localStorage.removeItem('showWelcomeAlert'); // Remove flag after showing the alert
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserName(null);
    navigate('/menu');
  };

  return (
    <div className="menu-container">
      {showWelcome && <Alert message="Welcome, Comrade! The revolution welcomes you!" type="success" />}

      <div className="menu-header">
        <span className="store-title">The People's Kitchen</span>

        <div className="header-right">
          {userName ? (
            <>
              <div className="user-controls">
                <button className="user-button" title={userName}>
                  {userName.length > 12 ? `${userName.substring(0, 12)}...` : userName}
                </button>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>

              <button className="cart-button" onClick={() => navigate('/cart')}>
                <CartIcon className="cart-icon" />
              </button>
            </>
          ) : (
            <div className="menu-buttons">
              <button onClick={() => navigate('/login')} className="nav-button login-btn">Login</button>
              <button onClick={() => navigate('/register')} className="nav-button register-btn">Register</button>
            </div>
          )}
        </div>
      </div>

      <h2>Menu</h2>
      <div className="menu-grid">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="menu-item"
            onClick={() => navigate(`/menu/${product.id}`)} 
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={product.image} 
              alt={`${product.name}`} 
              className="menu-item-image" 
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="menu-item-price">${Number(product.price).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
