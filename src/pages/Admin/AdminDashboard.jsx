import { useState, useEffect } from 'react';

/* Admin Dashboard */

const statusClass = (s) => {
  if (s === 'Delivered') return 'badge badge--green';
  if (s === 'Shipped') return 'badge badge--blue';
  if (s === 'Processing') return 'badge badge--yellow';
  return 'badge badge--red';
};

const AdminDashboard = () => {
  const [statsData, setStatsData] = useState({
    enquiries: 0,
    activeUsers: 45,
    totalOrders: 120,
    revenue: '₹ 4,50,000'
  });
  const [recentOrders, setRecentOrders] = useState([
    { id: '#ORD-001', customer: 'Rajesh Kumar', product: 'Basic GPS Tracker', amount: '₹3,500', status: 'Delivered' },
    { id: '#ORD-002', customer: 'Priya Sharma', product: 'OBD GPS Device', amount: '₹4,000', status: 'Processing' },
    { id: '#ORD-003', customer: 'Anil Mehta', product: 'Advance GPS Tracker', amount: '₹4,500', status: 'Shipped' },
    { id: '#ORD-004', customer: 'Sunita Verma', product: 'Personal GPS Tracker', amount: '₹6,500', status: 'Processing' },
    { id: '#ORD-005', customer: 'Vikram Singh', product: 'Basic GPS Tracker', amount: '₹3,500', status: 'Delivered' }
  ]);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStatsData(data))
      .catch(err => console.error(err));

    fetch('/api/orders')
      .then(res => {
        if (!res.ok) throw new Error("API not ready");
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setRecentOrders(data.slice(0, 5).map(o => ({
            ...o,
            id: `#ORD-${String(o.id).padStart(3, '0')}`,
            amount: `₹${o.amount.toLocaleString('en-IN')}`
          })));
        }
      })
      .catch(err => console.error(err));
  }, []);

  const stats = [
    { label: 'Total Enquiries', value: statsData.enquiries, icon: '📩', color: '#D32F2F' },
    { label: 'Active Users', value: statsData.activeUsers, icon: '👥', color: '#263238' },
    { label: 'Total Orders', value: statsData.totalOrders, icon: '🛒', color: '#D32F2F' },
    { label: 'Revenue', value: statsData.revenue, icon: '💰', color: '#1B5E20' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h2>Dashboard Overview</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} className="admin-card" style={{ borderLeft: `6px solid ${s.color}`, padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{s.label}</p>
                <p style={{ fontSize: '2rem', fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</p>
              </div>
              <span style={{ fontSize: '2.5rem', opacity: 0.8 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="admin-card">
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: 20 }}>Recent Orders</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.product}</td>
                  <td style={{ fontWeight: 600 }}>{o.amount}</td>
                  <td><span className={statusClass(o.status)}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
