import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminCustomers from './AdminCustomers';
import AdminReports from './AdminReports';
import './Admin.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊', end: true },
    { path: '/admin/products', label: 'Products', icon: '📡' },
    { path: '/admin/orders', label: 'Orders', icon: '🛒' },
    { path: '/admin/customers', label: 'Customers', icon: '👥' },
    { path: '/admin/reports', label: 'Reports', icon: '📈' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? '' : ' collapsed'}`}>
        <div className="admin-sidebar__header">
          <img src={logo} alt="Dev Infosystem" className="admin-sidebar__logo" />
          {sidebarOpen && <span className="admin-sidebar__brand">Dev Infosystem</span>}
        </div>
        <nav className="admin-sidebar__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `admin-sidebar__link${isActive ? ' active' : ''}`
              }
            >
              <span className="admin-sidebar__icon">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <button
          className="admin-sidebar__toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? 'Collapse' : 'Expand'}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <h1 className="admin-topbar__title">Admin Panel</h1>
          <div className="admin-topbar__right">
            <button className="admin-topbar__home" onClick={() => navigate('/')}>
              ← Back to Website
            </button>
            <div className="admin-topbar__user">
              <span className="admin-topbar__avatar">A</span>
              <span>Admin</span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="reports" element={<AdminReports />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
