import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft, Send, MapPin, Phone, Mail } from 'lucide-react';
import './Home.css'; // Reusing established styles for consistency

const EnquiryPage = () => {
  const { productName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Auto-scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product: productName })
      });

      if (!response.ok) throw new Error('Failed to submit enquiry. Please try again.');
      
      setIsSubmitted(true);
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const seoTitle = `Enquire about ${productName} - Dev Infosystem GPS`;
  const seoDesc = `Interested in ${productName}? Get a free quote and professional consultation for premium GPS tracking solutions by Dev Infosystem. Leading fleet management in India.`;
  const canonicalUrl = `https://devinfosystem.in/enquire/${productName}`;

  return (
    <div className="enquiry-page" style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: '100px', paddingBottom: '80px' }}>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": seoTitle,
            "description": seoDesc,
            "url": canonicalUrl,
            "mainEntity": {
              "@type": "Service",
              "name": productName,
              "provider": {
                "@type": "Organization",
                "name": "Dev Infosystem",
                "logo": "https://devinfosystem.in/assets/images/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="container">
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            display: 'flex', alignItems: 'center', gap: 8, 
            background: 'none', border: 'none', color: 'var(--primary-color)', 
            fontWeight: 600, cursor: 'pointer', marginBottom: 32, fontSize: '0.95rem'
          }}
        >
          <ArrowLeft size={18} /> Back to Products
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
          {/* Left Side: Info */}
          <div>
            <span className="hero-section__tag" style={{ color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>
              Product Enquiry
            </span>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--primary-color)', marginBottom: 20, lineHeight: 1.1 }}>
              Get a Quote for <br />
              <span style={{ color: 'var(--secondary-color)' }}>{productName}</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 40 }}>
              Our technical experts are ready to help you implement the best GPS tracking solution for your fleet. Fill out the form, and we'll get back to you within 2 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <Phone size={24} color="var(--primary-color)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>Call Experts</h4>
                  <p style={{ color: 'var(--text-light)' }}>+91 90750 78484</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <Mail size={24} color="var(--primary-color)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>Email Us</h4>
                  <p style={{ color: 'var(--text-light)' }}>devinfosystem11@gmail.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <MapPin size={24} color="var(--primary-color)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>Our Office</h4>
                  <p style={{ color: 'var(--text-light)' }}>Second floor, Flat No 203 Kai Arunatai Skharam Devkar Nagar, Pimple Gurav, Pimpri-Chinchwad</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="contact-form" style={{ padding: '40px' }}>
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ background: '#f0fdf4', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <CheckCircle2 size={48} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: 12 }}>Submission Successful!</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: 32 }}>
                  Thank you for your interest in <strong>{productName}</strong>. Our team will contact you shortly with the best pricing options.
                </p>
                <button className="btn btn-primary" onClick={() => setIsSubmitted(false)}>
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="contact-form__title" style={{ marginBottom: 24 }}>Enquiry Form</h3>
                
                {error && (
                  <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: '0.9rem', display: 'flex', gap: 10, alignItems: 'center' }}>
                    <AlertCircle size={18} /> {error}
                  </div>
                )}

                <div className="contact-form__group">
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="contact-form__input" 
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                </div>
                <div className="contact-form__group">
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    className="contact-form__input" 
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <div className="contact-form__group">
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Email Address</label>
                  <input 
                    type="email" 
                    className="contact-form__input" 
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
                <div className="contact-form__group">
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Additional Message</label>
                  <textarea 
                    className="contact-form__input contact-form__textarea" 
                    rows={4} 
                    placeholder="Tell us about your fleet tracking requirements..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                  ></textarea>
                </div>

                <div style={{ marginTop: 12, marginBottom: 20, fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle2 size={14} color="#10b981" /> You are enquiring for the <strong>{productName}</strong>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary contact-form__submit"
                  disabled={isProcessing}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .enquiry-page {
            padding-top: 80px;
          }
          .enquiry-page .container > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .enquiry-page h1 {
            font-size: 2.2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EnquiryPage;
