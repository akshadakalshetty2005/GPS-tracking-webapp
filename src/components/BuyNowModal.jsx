import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import './BuyNowModal.css';

const BuyNowModal = ({ product, isOpen, onClose, onProceed }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const { name, phone, email } = formData;
      const isPhoneValid = /^\d{10}$/.test(phone);
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setIsValid(name.trim() !== '' && isPhoneValid && isEmailValid);
    };
    validateForm();
  }, [formData]);

  if (!isOpen) return null;

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setIsProcessing(true);
    await onProceed(formData);
    setIsProcessing(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-product-summary">
            <div className="modal-product-details">
              <p className="label">PRODUCT</p>
              <p className="value">{product.name}</p>
            </div>
            <div className="modal-product-details">
              <p className="label">PRICE</p>
              <p className="value">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <button className="modal-close" onClick={handleClose} disabled={isProcessing} title="Close">
            <X size={24} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-form__group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isProcessing}
            />
          </div>
          <div className="modal-form__group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="10-digit mobile number"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={isProcessing}
            />
          </div>
          <div className="modal-form__group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="yourname@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isProcessing}
            />
          </div>

          <div className="modal-payment-methods">
            <div className="method-badge"><span>💳</span> Cards</div>
            <div className="method-badge"><span>📱</span> UPI</div>
            <div className="method-badge"><span>🏦</span> Net Banking</div>
            <div className="method-badge"><span>👛</span> Wallet</div>
            <div className="method-badge"><span>📷</span> QR Code</div>
          </div>

          <button
            type="submit"
            className="btn btn-primary modal-submit"
            disabled={!isValid || isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </button>
        </form>
        
        <p className="modal-footer-note">
          Secure payment integration powered by Razorpay.
        </p>
      </div>
    </div>
  );
};

export default BuyNowModal;
