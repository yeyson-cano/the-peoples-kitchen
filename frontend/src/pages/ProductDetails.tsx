import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import '../styles/ProductDetails.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showCartSuccess, setShowCartSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details.');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/notice', { state: { message: 'Comrade, please log in to add items to your cart.' } });
      return;
    }

    fetch('http://localhost/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ product_id: product?.id, quantity: 1 })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Add to cart failed');
        }
        return res.json();
      })
      .then(data => {
        if (data.message === 'Product added to cart') {
          setShowCartSuccess(true);

          setTimeout(() => setShowCartSuccess(false), 3000);
        }
      })
      .catch(err => {
        console.error(err);
        setError('An error occurred while adding to cart.');
      });
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/notice', { state: { message: 'Comrade, please log in to make a purchase.' } });
      return;
    }
    // Logic to proceed with checkout (to be implemented later)
    console.log(`Proceeding to buy ${product?.name} now.`);
  };

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!product) return <p className="error-message">No product data available.</p>;

  return (
    <div className="product-details-container">

      {showCartSuccess && (
        <Alert 
          message={`Product "${product.name}" added to your cart!`} 
          type="success" 
          duration={4000}
        />
      )}

      <button className="back-button" onClick={() => navigate('/menu')}>← Back to Menu</button>

      <div className="product-details">
        <img className="product-image" src={product.image} alt={product.name} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="category"><strong>Category:</strong> {product.category}</p>
          <p className="description">{product.description}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
