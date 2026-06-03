import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', stock: '', status: 'Active', features: '', image: '' });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = () => {
    setForm({ name: '', price: '', stock: '', status: 'Active', features: '', image: '' });
    setEditItem(null);
    setShowForm(true);
    setConfirmDeleteId(null);
  };

  const openEdit = (p) => {
    setForm({ 
      name: p.name, 
      price: p.price, 
      stock: p.stock || 0, 
      status: p.status || 'Active', 
      features: p.features || '', 
      image: p.image || '' 
    });
    setEditItem(p.id);
    setShowForm(true);
    setConfirmDeleteId(null);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    setIsProcessing(true);
    try {
      const url = editItem 
        ? `/api/products/${editItem}` 
        : '/api/products';
      
      const method = editItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock)
        })
      });

      if (!response.ok) throw new Error('Failed to save product');
      
      await fetchProducts();
      setShowForm(false);
      setEditItem(null);
      showNotification(`Product ${editItem ? 'updated' : 'added'} successfully!`);
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const requestDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/products/${confirmDeleteId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete product');
      
      await fetchProducts();
      setConfirmDeleteId(null);
      showNotification('Product deleted successfully!');
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 1000,
          background: toast.type === 'error' ? '#ef4444' : '#10b981',
          color: '#fff', padding: '12px 24px', borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          animation: 'slideIn 0.3s ease-out'
        }}>
          {toast.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          <span style={{ fontWeight: 600 }}>{toast.message}</span>
        </div>
      )}

      <div className="admin-page-header">
        <h2>Product Management</h2>
        <button
          className="btn btn-primary"
          style={{ fontSize: '0.88rem', padding: '9px 20px' }}
          onClick={openAdd}
        >
          + Add Product
        </button>
      </div>

      {/* ── Add / Edit Modal ── */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="admin-card" style={{ width: 480, maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontWeight: 700, color: 'var(--primary-color)', marginBottom: 20 }}>
              {editItem ? 'Edit Product' : 'Add New Product'}
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ marginBottom: 14, gridColumn: 'span 2' }}>
                <label className="admin-form-label">Product Name</label>
                <input
                  className="contact-form__input"
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Basic GPS Tracker"
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label className="admin-form-label">Price (₹)</label>
                <input
                  className="contact-form__input"
                  type="number"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  placeholder="3500"
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label className="admin-form-label">Stock Units</label>
                <input
                  className="contact-form__input"
                  type="number"
                  value={form.stock}
                  onChange={e => setForm({ ...form, stock: e.target.value })}
                  placeholder="50"
                />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label className="admin-form-label">Features (comma separated)</label>
              <textarea
                className="contact-form__input"
                value={form.features}
                onChange={e => setForm({ ...form, features: e.target.value })}
                placeholder="Real-time tracking, Geo-fencing..."
                rows={3}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label className="admin-form-label">Image Path</label>
              <input
                className="contact-form__input"
                type="text"
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                placeholder="/assets/images/gps_basic.png"
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="admin-form-label">Status</label>
              <select
                className="contact-form__input contact-form__select"
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} 
                onClick={handleSave}
                disabled={isProcessing}
              >
                {isProcessing ? <Loader2 size={18} className="animate-spin" /> : null}
                {editItem ? 'Update' : 'Save'}
              </button>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {confirmDeleteId !== null && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(2px)'
        }}>
          <div className="admin-card" style={{ width: 380, maxWidth: '90vw', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontWeight: 700, color: '#dc2626', marginBottom: 10 }}>Delete Product?</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: 24 }}>
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={confirmDelete}
                disabled={isProcessing}
                style={{
                  flex: 1, padding: '11px 0', borderRadius: 8,
                  background: '#dc2626', color: '#fff', border: 'none',
                  fontFamily: 'Inter, sans-serif', fontWeight: 600,
                  fontSize: '0.9rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                }}
              >
                {isProcessing ? <Loader2 size={18} className="animate-spin" /> : 'Yes, Delete'}
              </button>
              <button
                onClick={cancelDelete}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Product Table ── */}
      <div className="admin-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <Loader2 className="animate-spin" size={40} style={{ color: 'var(--primary-color)', margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-light)' }}>Loading products...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#dc2626' }}>
            <AlertCircle size={40} style={{ margin: '0 auto 16px' }} />
            <p>Error: {error}</p>
            <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={fetchProducts}>Retry</button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-light)' }}>
                      No products found. Click <strong>+ Add Product</strong> to get started.
                    </td>
                  </tr>
                ) : (
                  products.map((p, i) => (
                    <tr key={p.id}>
                      <td style={{ color: 'var(--text-light)' }}>{i + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {p.image && <img src={p.image} alt="" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 4, background: '#f8fafc' }} />}
                          <span style={{ fontWeight: 600 }}>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--secondary-color)' }}>
                        ₹{Number(p.price).toLocaleString('en-IN')}
                      </td>
                      <td>{p.stock || 0} units</td>
                      <td>
                        <span className={p.status === 'Inactive' ? 'badge badge--red' : 'badge badge--green'}>
                          {p.status || 'Active'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            className="btn btn-outline"
                            style={{ fontSize: '0.78rem', padding: '5px 14px' }}
                            onClick={() => openEdit(p)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => requestDelete(p.id)}
                            style={{
                              fontSize: '0.78rem', padding: '5px 14px',
                              background: '#fee2e2', color: '#dc2626',
                              border: '1.5px solid #fca5a5', borderRadius: 6,
                              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                              fontWeight: 600, transition: 'all 0.2s',
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .admin-form-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-light);
          display: block;
          margin-bottom: 6px;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AdminProducts;
