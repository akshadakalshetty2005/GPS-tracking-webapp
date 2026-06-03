import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import BuyNowModal from '../components/BuyNowModal';
import './Products.css';

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        
        const parsedProducts = data.map(p => ({
          ...p,
          features: p.features ? p.features.split(',').map(f => f.trim()) : []
        }));
        
        setProducts(parsedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleProceedToPayment = async (customerData) => {
    try {
      // Simulate API processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Bypass Razorpay for demonstration and show success page directly
      setIsModalOpen(false);
      navigate(`/success?order_id=TEST_ORD_${Math.floor(Math.random() * 10000)}`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="products-page">
      <div className="container">
        <header className="products-header">
          <h1>Our GPS Solutions</h1>
          <p>Choose the perfect tracking device for your business or personal needs.</p>
        </header>

        {loading ? (
          <div className="loading-state">
            <Loader2 className="animate-spin" size={48} />
            <p>Loading premium products...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <AlertCircle size={48} />
            <p>{error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onBuy={() => handleBuyNow(product)}
                onEnquiry={() => navigate(`/enquire/${encodeURIComponent(product.name)}`)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <BuyNowModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onProceed={handleProceedToPayment}
        />
      )}
    </div>
  );
};

export default Products;
