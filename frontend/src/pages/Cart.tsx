import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/notice', { state: { message: 'Please log in to view your cart.' } });
      return;
    }

    // GET /api/cart
    fetch('http://localhost/api/cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch cart');
        return res.json();
      })
      .then(data => setCartItems(data))
      .catch(err => setError(err.message));
  }, [navigate]);

  const handleUpdateQuantity = (cartItemId: number, newQty: number) => {
    if (newQty < 1) return; // Evitar 0 o negativo
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/notice', { state: { message: 'Please log in to update your cart.' } });
      return;
    }

    fetch(`http://localhost/api/cart/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity: newQty })
    })
      .then(res => {
        if (!res.ok) throw new Error('Update quantity failed');
        return res.json();
      })
      .then(() => {
        // Actualiza estado local
        setCartItems(prev =>
          prev.map(item =>
            item.id === cartItemId ? { ...item, quantity: newQty } : item
          )
        );
      })
      .catch(err => setError(err.message));
  };

  const handleRemoveItem = (cartItemId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/notice', { state: { message: 'Please log in to remove items from your cart.' } });
      return;
    }

    fetch(`http://localhost/api/cart/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Remove item failed');
        return res.json();
      })
      .then(() => {
        setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      })
      .catch(err => setError(err.message));
  };

  const handleClearCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/notice', { state: { message: 'Please log in to clear your cart.' } });
      return;
    }

    fetch('http://localhost/api/cart/clear', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Clear cart failed');
        return res.json();
      })
      .then(() => {
        setCartItems([]);
      })
      .catch(err => setError(err.message));
  };

  // Calcular total
  const total = cartItems.reduce((acc, item) => {
    const price = item.product.price;
    return acc + (price * item.quantity);
  }, 0);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-header">Comrade's Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td data-label="Product">
                    <div
                      className="product-cell"
                      onClick={() => navigate(`/menu/${item.product.id}`)}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="cart-item-image"
                      />
                      <span className="product-name">{item.product.name}</span>
                    </div>
                  </td>
                  <td data-label="Price">${item.product.price.toFixed(2)}</td>
                  <td data-label="Quantity">
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                    />
                  </td>
                  <td data-label="Subtotal">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </td>
                  <td data-label="Actions">
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="cart-total">
            Total: ${total.toFixed(2)}
          </h3>

          <button className="clear-cart-button" onClick={handleClearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
