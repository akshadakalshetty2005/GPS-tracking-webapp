import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Success = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="success-page" style={{ 
        paddingTop: 'calc(var(--navbar-height) + 60px)',
        paddingBottom: '100px',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-light)'
      }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="success-card" style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
            border: '1px solid var(--border-color)'
          }}>
            <div className="success-icon" style={{ 
              width: '80px', 
              height: '80px', 
              background: 'var(--primary-light)', 
              color: 'var(--primary-color)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <CheckCircle size={48} />
            </div>
            
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-color)', marginBottom: '16px' }}>
              Payment Successful!
            </h1>
            
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: '1.6' }}>
              Thank you for choosing our GPS solution. Your order has been placed successfully and our team will contact you shortly for installation.
            </p>

            {orderId && (
              <div className="order-info" style={{ 
                background: 'var(--bg-light)', 
                padding: '16px', 
                borderRadius: '12px', 
                marginBottom: '32px',
                border: '1px dashed var(--border-color)'
              }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>ORDER ID</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--primary-color)', fontFamily: 'monospace' }}>{orderId}</strong>
              </div>
            )}

            <div className="success-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link to="/" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Home size={18} /> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Success;
