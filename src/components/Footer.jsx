import logo from '../assets/images/logo.png';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer__top container">

        {/* Col 1 – Brand */}
        <div className="footer__col footer__brand">
          <div className="navbar__logo-text" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={logo} alt="Logo" style={{ height: '40px' }} />
          </div>
          <p className="footer__desc">
            We are a leading provider of professional vehicle tracking
            solutions in India — helping businesses protect their assets,
            reduce costs, and stay in control 24/7.
          </p>
        </div>

        {/* Col 2 – Quick Links */}
        <div className="footer__col">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__list">
            {['hero', 'features', 'how-it-works', 'why-us'].map((id) => (
              <li key={id}>
                <button onClick={() => scrollToSection(id)} className="footer__link">
                  {id === 'hero' && 'Home'}
                  {id === 'features' && 'Features'}
                  {id === 'how-it-works' && 'How It Works'}
                  {id === 'why-us' && 'Why Choose Us'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 – Products */}
        <div className="footer__col">
          <h4 className="footer__heading">Our Products</h4>
          <ul className="footer__list">
            <li><span className="footer__product-link">Dev Infosystem Basic Tracker</span></li>
            <li><span className="footer__product-link">Dev Infosystem OBD Device</span></li>
            <li><span className="footer__product-link">Dev Infosystem Pro Tracker</span></li>
            <li><span className="footer__product-link">Dev Infosystem Personal GPS</span></li>
          </ul>
        </div>

        {/* Col 4 – Contact & Hours */}
        <div className="footer__col">
          <h4 className="footer__heading">Contact Us</h4>
          <ul className="footer__contact-list">
            <li>
              <span className="footer__contact-icon">📍</span>
              <span>Second floor, Flat No 203 Kai Arunatai Skharam Devkar Nagar, Pimple Gurav, Pimpri-Chinchwad</span>
            </li>
            <li>
              <span className="footer__contact-icon">📞</span>
              <a href="tel:+919999999999">+91 90750 78484</a>
            </li>
            <li>
              <span className="footer__contact-icon">✉️</span>
              <a href="mailto:devinfosystem11@gmail.com">devinfosystem11@gmail.com</a>
            </li>
          </ul>
          <h4 className="footer__heading footer__heading--mt">Business Hours</h4>
          <ul className="footer__contact-list">
            <li>
              <span className="footer__contact-icon">🕙</span>
              <span>Mon – Sat: 10:00 AM – 7:00 PM</span>
            </li>
            <li>
              <span className="footer__contact-icon">🚫</span>
              <span>Sunday – Closed</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom container">
        <p>© {currentYear} Professional GPS Solutions. All rights reserved.</p>
        <p>Premium Vehicle Tracking Systems</p>
      </div>
    </footer>
  );
};

export default Footer;
