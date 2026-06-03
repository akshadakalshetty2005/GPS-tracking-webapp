import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Loader2, AlertCircle, CheckCircle2, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import BuyNowModal from '../components/BuyNowModal';
import heroImg from '../assets/images/gps_advance.png';
import logo from '../assets/images/logo.png';
import './Home.css';

/* ── Data ────────────────────────────────── */
// (Static products removed to fetch from API)

const features = [
  { icon: '📍', title: 'Real-Time Tracking', desc: 'Monitor your entire fleet live on a single map with second-by-second position updates.' },
  { icon: '🛡️', title: 'Geo-Fencing', desc: 'Set virtual boundaries and receive instant alerts whenever a vehicle enters or exits.' },
  { icon: '⚡', title: 'Instant Alerts', desc: 'Get SMS & app notifications for speeding, ignition events, and route deviations.' },
  { icon: '📊', title: 'Detailed Reports', desc: 'Access comprehensive trip history, mileage, fuel, and driver-behaviour reports.' },
  { icon: '📱', title: 'Mobile Access', desc: 'Manage your fleet from anywhere with our Android & iOS mobile applications.' },
  { icon: '🔒', title: 'Data Security', desc: 'All your data is encrypted and stored safely on our secure cloud infrastructure.' },
];

const steps = [
  { num: '01', title: 'Install Device', desc: 'Our technician installs the GPS tracker in your vehicle — quick and non-invasive.' },
  { num: '02', title: 'Activate SIM', desc: 'A dedicated data SIM is activated inside the device to begin transmitting location data.' },
  { num: '03', title: 'Connect Platform', desc: 'Log in to our web or mobile platform and see your vehicle on the live map instantly.' },
  { num: '04', title: 'Track & Manage', desc: 'Set alerts, view reports, and manage your entire fleet from one powerful dashboard.' },
];

const reasons = [
  { icon: '🏆', title: '10+ Years Experience', desc: 'Trusted by thousands of businesses across India since over a decade.' },
  { icon: '🛠️', title: '24/7 Support', desc: 'Round-the-clock technical support to keep your fleet running without interruption.' },
  { icon: '💰', title: 'Affordable Pricing', desc: 'Competitive pricing with no hidden charges — flexible plans for every business size.' },
  { icon: '🔧', title: 'Easy Installation', desc: 'Professional installation team available across major Indian cities.' },
  { icon: '☁️', title: 'Cloud Platform', desc: 'Scalable, reliable cloud infrastructure that grows with your fleet.' },
  { icon: '📈', title: 'Proven ROI', desc: 'Our clients report 20–30% reduction in fuel costs and improved driver discipline.' },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    company: 'RK Logistics, Delhi',
    rating: 5,
    text: "Dev Infosystem's GPS solution has transformed our fleet management. We can now track all 40 trucks in real time and cut fuel costs significantly.",
  },
  {
    name: 'Priya Sharma',
    company: 'Sharma Transport, Mumbai',
    rating: 5,
    text: 'The installation was quick and the support team is excellent. Geo-fencing alerts have helped us prevent vehicle misuse completely.',
  },
  {
    name: 'Anil Mehta',
    company: 'Mehta Couriers, Pune',
    rating: 5,
    text: 'Affordable pricing and a very easy-to-use platform. Our delivery efficiency has improved by 35% since we deployed Dev Infosystem GPS.',
  },
];

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/* ── Component ───────────────────────────── */
const Home = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Basic GPS Tracker',
      price: 3500,
      features: ['Real-time location tracking', 'Geo-fencing alerts', 'Ignition on/off alerts', 'Overspeed alerts', 'Web & mobile app access'],
      image: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      name: 'OBD GPS Device',
      price: 4000,
      features: ['Plug & play OBD2 port', 'Engine diagnostics', 'Trip history & reports', 'Fuel monitoring', 'Easy installation'],
      image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      name: 'Advance GPS Tracker',
      price: 4500,
      features: ['Advanced route analytics', 'Driver behaviour analysis', 'Temperature monitoring', 'Panic / SOS button', 'Cloud-based dashboard'],
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      name: 'Personal GPS Tracker',
      price: 6500,
      features: ['Compact wearable design', 'SOS emergency alert', 'Two-way voice call', 'Live location sharing', 'Long battery life'],
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'
    }
  ]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', product: '', message: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error("API not ready");
        const data = await response.json();
        if (data && data.length > 0) {
          const parsedProducts = data.map(p => ({
            ...p,
            features: p.features ? p.features.split(',').map(f => f.trim()) : []
          }));
          setProducts(parsedProducts);
        }
      } catch (err) {
        console.warn("Using fallback products due to API error:", err.message);
      }
    };

    fetchProducts();
  }, []);


  // Buy Now Store
  const [buyProduct, setBuyProduct] = useState(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // Toast Helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, product: enquiryProduct || formData.product })
      });
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', product: '', message: '' });
      setEnquiryProduct(null);
    } catch (err) {
      alert("Error submitting form. Is the backend running?");
    }
  };

  const handleBuyNow = (product) => {
    setBuyProduct(product);
    setIsBuyModalOpen(true);
  };

  const handleProceedToPayment = async (customerData) => {
    try {
      // Simulate API processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Bypass Razorpay for demonstration and show success page directly
      setIsBuyModalOpen(false);
      navigate(`/success?order_id=TEST_ORD_${Math.floor(Math.random() * 10000)}`);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)}><X size={16} /></button>
        </div>
      )}

      {/* ── 1. Hero ──────────────────────────── */}
      <section id="hero" className="hero-section">
        <div className="hero-bg"></div>
        <div className="container hero-section__inner">
          <div className="hero-section__text">
            <span className="hero-section__tag">🇮🇳 India's Trusted GPS Partner</span>
            <h1 className="hero-section__heading">
              Professional GPS Tracking<br />
              <span className="hero-section__highlight">For Every Vehicle</span>
            </h1>
            <p className="hero-section__sub">
              Real-time fleet tracking, geo-fencing, fuel monitoring &amp; driver
              analytics — all in one powerful, affordable platform.
            </p>
            <div className="hero-section__cta-group">
              <button
                className="btn btn-primary hero-section__btn"
                onClick={() => scrollToSection('products')}
              >
                Explore Products
              </button>
              <button
                className="btn btn-outline hero-section__btn hero-section__btn--light"
                onClick={() => scrollToSection('contact')}
              >
                Get Free Demo
              </button>
            </div>
            <div className="hero-section__stats">
              <div className="hero-stat">
                <strong>5000+</strong><span>Vehicles Tracked</span>
              </div>
              <div className="hero-stat">
                <strong>500+</strong><span>Happy Clients</span>
              </div>
              <div className="hero-stat">
                <strong>10+</strong><span>Years Experience</span>
              </div>
            </div>
          </div>
          <div className="hero-section__image">
            <div className="hero-section__img-wrap">
              <img src={heroImg} alt="GPS Tracking Dashboard" />
              <div className="hero-section__floating-card hero-section__floating-card--1">
                <span>📍</span> Live Tracking Active
              </div>
              <div className="hero-section__floating-card hero-section__floating-card--2">
                <span>✅</span> All vehicles safe
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Features ──────────────────────── */}
      <section id="features" className="section">
        <div className="container">
          <h2 className="section-title">Powerful Tracking Features</h2>
          <p className="section-subtitle">
            Everything you need to keep your fleet productive, safe, and cost-efficient.
          </p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Products ──────────────────────── */}
      <section id="products" className="section section-light">
        <div className="container">
          <h2 className="section-title">Our GPS Products</h2>
          <p className="section-subtitle">
            Choose the perfect GPS tracking solution for your needs and budget.
          </p>
          <div className="products-grid">
            {loadingProducts ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px' }}>
                <Loader2 className="animate-spin" size={40} style={{ color: 'var(--primary-color)', margin: '0 auto 16px' }} />
                <p style={{ color: 'var(--text-light)' }}>Fetching premium products...</p>
              </div>
            ) : products.length > 0 ? (
              products.map((p) => (
                <ProductCard
                  key={p.id}
                  {...p}
                  onBuy={() => handleBuyNow(p)}
                  onEnquiry={() => navigate(`/enquire/${encodeURIComponent(p.name)}`)}
                />
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-light)' }}>No products available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. How It Works ──────────────────── */}
      <section id="how-it-works" className="section how-section">
        <div className="container">
          <h2 className="section-title">How GPS Tracking Works</h2>
          <p className="section-subtitle">
            Get your vehicles tracked in 4 simple steps — we handle everything.
          </p>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-card__num">{s.num}</div>
                <h3 className="step-card__title">{s.title}</h3>
                <p className="step-card__desc">{s.desc}</p>
                {i < steps.length - 1 && <div className="step-card__arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Why Choose Us ─────────────────── */}
      <section id="why-us" className="section section-light">
        <div className="container">
          <h2 className="section-title">Why Choose Our Solution?</h2>
          <p className="section-subtitle">
            Trusted by 500+ businesses across India for reliable GPS solutions.
          </p>
          <div className="reasons-grid">
            {reasons.map((r, i) => (
              <div key={i} className="reason-card">
                <div className="reason-card__icon">{r.icon}</div>
                <h3 className="reason-card__title">{r.title}</h3>
                <p className="reason-card__desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Testimonials ──────────────────── */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Real feedback from businesses who trust our GPS tracking every day.
          </p>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {'⭐'.repeat(t.rating)}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Contact / CTA ─────────────────── */}
      <section id="contact" className="section cta-section">
        <div className="container cta-section__inner">
          <div className="cta-section__text">
            <h2>Get Started Today</h2>
            <p>
              Contact us today for a free consultation and demo. Our team will
              help you choose the right GPS solution for your business.
            </p>
            <div className="cta-section__contact-info">
              <p>📞 <a href="tel:+919999999999">+91 90750 78484</a></p>
              <p>✉️ <a href="mailto:devinfosystem11@gmail.com">devinfosystem11@gmail.com</a></p>
              <p>🕙 Mon–Sat: 10:00 AM – 7:00 PM</p>
            </div>
          </div>
          {isSubmitted ? (
            <div className="contact-form" style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>Thank You!</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>Your enquiry has been successfully submitted. Our team will contact you shortly.</p>
              <button className="btn btn-outline" onClick={() => setIsSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleEnquirySubmit}>
              <h3 className="contact-form__title">Get a Free Quote</h3>
              {enquiryProduct && (
                <p className="contact-form__enquiry-note">
                  Enquiry for: <strong>{enquiryProduct}</strong>
                </p>
              )}
              <div className="contact-form__group">
                <input type="text" placeholder="Your Name" required className="contact-form__input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="contact-form__group">
                <input type="tel" placeholder="Phone Number" required className="contact-form__input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div className="contact-form__group">
                <input type="email" placeholder="Email Address" className="contact-form__input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              {!enquiryProduct && (
                <div className="contact-form__group">
                  <select className="contact-form__input contact-form__select" value={formData.product} onChange={e => setFormData({ ...formData, product: e.target.value })}>
                    <option value="">Select Product</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>{p.name} – ₹{p.price.toLocaleString('en-IN')}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="contact-form__group">
                <textarea placeholder="Your Message (optional)" className="contact-form__input contact-form__textarea" rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
              </div>
              <button type="submit" className="btn btn-primary contact-form__submit">
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Checkout Modal */}
      {buyProduct && (
        <BuyNowModal
          product={buyProduct}
          isOpen={isBuyModalOpen}
          onClose={() => setIsBuyModalOpen(false)}
          onProceed={handleProceedToPayment}
        />
      )}

    </div>
  );
};

export default Home;
