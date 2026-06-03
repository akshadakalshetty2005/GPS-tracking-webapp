const monthlyData = [
  { month: 'Oct', revenue: 180000, orders: 42 },
  { month: 'Nov', revenue: 240000, orders: 58 },
  { month: 'Dec', revenue: 310000, orders: 74 },
  { month: 'Jan', revenue: 275000, orders: 66 },
  { month: 'Feb', revenue: 360000, orders: 86 },
  { month: 'Mar', revenue: 428500, orders: 102 },
];

const productSales = [
  { name: 'Basic GPS Tracker', units: 180, revenue: 630000, color: '#0B3A6F' },
  { name: 'OBD GPS Device', units: 120, revenue: 480000, color: '#1565C0' },
  { name: 'Advance GPS Tracker', units: 90, revenue: 405000, color: '#0d7c3d' },
  { name: 'Personal GPS Tracker', units: 44, revenue: 286000, color: '#c2770a' },
];

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

const AdminReports = () => (
  <div>
    <div className="admin-page-header">
      <h2>Reports & Analytics</h2>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Last 6 months</span>
    </div>

    {/* Summary Cards */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 28 }}>
      {[
        { label: 'Total Revenue', value: '₹18,01,500', icon: '💰', color: '#0d7c3d' },
        { label: 'Total Orders', value: '428', icon: '🛒', color: '#0B3A6F' },
        { label: 'Avg Order Value', value: '₹4,209', icon: '📊', color: '#1565C0' },
      ].map((s, i) => (
        <div key={i} className="admin-card" style={{ borderLeft: `4px solid ${s.color}` }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</p>
          <p style={{ fontSize: '1.7rem', fontWeight: 800, color: s.color }}>{s.value}</p>
          <p style={{ fontSize: '1.8rem', marginTop: 4 }}>{s.icon}</p>
        </div>
      ))}
    </div>

    {/* Revenue Chart (CSS-only bar chart) */}
    <div className="admin-card" style={{ marginBottom: 28 }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: 24 }}>Monthly Revenue</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 200, padding: '0 8px' }}>
        {monthlyData.map((d, i) => {
          const pct = (d.revenue / maxRevenue) * 100;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 600 }}>
                ₹{(d.revenue / 1000).toFixed(0)}K
              </span>
              <div
                title={`₹${d.revenue.toLocaleString('en-IN')} — ${d.orders} orders`}
                style={{
                  width: '100%',
                  height: `${pct}%`,
                  background: 'linear-gradient(180deg, #1565C0, #0B3A6F)',
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.6s ease',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 500 }}>{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>

    {/* Product Sales Table */}
    <div className="admin-card">
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: 20 }}>Product-wise Sales</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Units Sold</th>
            <th>Revenue</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {productSales.map((p, i) => {
            const totalRevenue = productSales.reduce((acc, x) => acc + x.revenue, 0);
            const pct = ((p.revenue / totalRevenue) * 100).toFixed(1);
            return (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>
                  <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: p.color, marginRight: 8 }} />
                  {p.name}
                </td>
                <td>{p.units} units</td>
                <td style={{ fontWeight: 700, color: 'var(--secondary-color)' }}>₹{p.revenue.toLocaleString('en-IN')}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: p.color, borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)', minWidth: 36 }}>{pct}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminReports;
