import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', path: '/', id: 'hero' },
    { label: 'Features', path: '/', id: 'features' },
    { label: 'Products', path: '/products' },
    { label: 'How It Works', path: '/', id: 'how-it-works' },
    { label: 'Why Us', path: '/', id: 'why-us' },
    { label: 'Contact', path: '/', id: 'contact' },
  ];

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.path === '/products') {
      navigate('/products');
      window.scrollTo(0, 0);
    } else if (location.pathname === '/') {
      scrollToSection(link.id);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(link.id), 100);
    }
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        {/* Logo */}
        <Link
          className="navbar__logo-btn"
          to="/"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img src={logo} alt="Logo" className="navbar__logo-img" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar__nav" aria-label="Main Navigation">
          <ul className="navbar__links">
            {navLinks.map((link, i) => (
              <li key={i}>
                <button
                  className="navbar__link"
                  onClick={() => handleNavClick(link)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-primary navbar__cta"
            onClick={() => handleNavClick(navLinks[5])}
          >
            Get Quote
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`navbar__mobile${menuOpen ? ' is-open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link, i) => (
            <li key={i}>
              <button
                className="navbar__mobile-link"
                onClick={() => handleNavClick(link)}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              className="btn btn-primary navbar__mobile-cta"
              onClick={() => handleNavClick(navLinks[5])}
            >
              Get Quote
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
