import { useState, useEffect } from 'react';

const statusClass = (s) => {
  if (s === 'Delivered') return 'badge badge--green';
  if (s === 'Shipped') return 'badge badge--blue';
  if (s === 'Processing') return 'badge badge--yellow';
  return 'badge badge--red';
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    { id: '#ORD-001', customer: 'Rajesh Kumar', product: 'Basic GPS Tracker', amount: '₹3,500', status: 'Delivered', date: 'Oct 24, 2023' },
    { id: '#ORD-002', customer: 'Priya Sharma', product: 'OBD GPS Device', amount: '₹4,000', status: 'Processing', date: 'Oct 25, 2023' },
    { id: '#ORD-003', customer: 'Anil Mehta', product: 'Advance GPS Tracker', amount: '₹4,500', status: 'Shipped', date: 'Oct 26, 2023' },
    { id: '#ORD-004', customer: 'Sunita Verma', product: 'Personal GPS Tracker', amount: '₹6,500', status: 'Processing', date: 'Oct 27, 2023' },
    { id: '#ORD-005', customer: 'Vikram Singh', product: 'Basic GPS Tracker', amount: '₹3,500', status: 'Delivered', date: 'Oct 28, 2023' },
    { id: '#ORD-006', customer: 'Neha Gupta', product: 'Fleet Management Software', amount: '₹9,999', status: 'Shipped', date: 'Oct 29, 2023' }
  ]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/orders');
        if (!res.ok) throw new Error('API not ready');
        const data = await res.json();
        if (data && data.length > 0) {
          setOrders(data.map(o => ({
            ...o,
            id: `#ORD-${String(o.id).padStart(3, '0')}`,
            amount: `₹${o.amount.toLocaleString('en-IN')}`,
            date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          })));
        }
      } catch (err) {
        console.warn('Using dummy data for orders due to API error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];
  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  const updateStatus = async (orderId, newStatus) => {
    // Note: Backend might need a status update endpoint. For now, we update local state.
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    // TODO: Implement fetch('/api/orders/status', ...)
  };

  return (
    <div>
      <div className="admin-page-header">
        <h2>Orders Management</h2>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{filtered.length} orders</span>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '7px 18px',
              borderRadius: 20,
              border: '1.5px solid',
              borderColor: filter === s ? 'var(--primary-color)' : 'var(--border-color)',
              background: filter === s ? 'var(--primary-color)' : '#fff',
              color: filter === s ? '#fff' : 'var(--text-light)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="admin-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.product}</td>
                  <td style={{ fontWeight: 700 }}>₹{o.amount.toLocaleString('en-IN')}</td>
                  <td style={{ color: 'var(--text-light)' }}>{o.date}</td>
                  <td><span className={statusClass(o.status)}>{o.status}</span></td>
                  <td>
                    <select
                      value={o.status}
                      onChange={e => updateStatus(o.id, e.target.value)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 6,
                        border: '1.5px solid var(--border-color)',
                        fontSize: '0.78rem',
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                        color: 'var(--text-dark)',
                      }}
                    >
                      {['Pending', 'Processing', 'Shipped', 'Delivered'].map(s => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
