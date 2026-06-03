import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import Home from './pages/Home';
import Products from './pages/Products';
import Success from './pages/Success';
import EnquiryPage from './pages/EnquiryPage';
import AdminLayout from './pages/Admin/AdminLayout';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Site */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main style={{ paddingTop: 'var(--navbar-height)' }}>
                <Home />
              </main>
              <Footer />
            </>
          }
        />

        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <main style={{ paddingTop: 'var(--navbar-height)' }}>
                <Products />
              </main>
              <Footer />
            </>
          }
        />

        <Route path="/success" element={<Success />} />
        
        <Route 
          path="/enquire/:productName" 
          element={
            <>
              <Navbar />
              <EnquiryPage />
              <Footer />
            </>
          } 
        />

        {/* Admin Panel — no public navbar/footer */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
      <WhatsAppWidget />
    </Router>
  );
}

export default App;
