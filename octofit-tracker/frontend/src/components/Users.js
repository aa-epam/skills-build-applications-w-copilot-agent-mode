import React, { useEffect, useState } from 'react';

function DataTable({ items, onView }) {
  if (!items || items.length === 0) return <div className="empty-state">No users found.</div>;
  const keys = Object.keys(items[0] || {}).slice(0, 8);
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {keys.map((k) => (
              <th key={k}>{k}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              {keys.map((k) => (
                <td key={k}>{typeof it[k] === 'object' ? JSON.stringify(it[k]) : String(it[k])}</td>
              ))}
              <td>
                <button className="btn btn-sm btn-outline-primary" onClick={() => onView(it)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const CODESPACE = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = CODESPACE
    ? `https://${CODESPACE}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  const fetchData = () => {
    setLoading(true);
    console.log('Fetching Users from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Users response:', data);
        const results = data && data.results ? data.results : data;
        setItems(Array.isArray(results) ? results : []);
      })
      .catch((err) => {
        console.error('Users fetch error:', err);
        setError(err.message || String(err));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return (
    <div className="card card-table">
      <div className="card-body">
        <div className="data-heading">
          <h3 className="card-title">Users</h3>
          <div>
            <button className="btn btn-sm btn-secondary" onClick={fetchData}>Refresh</button>
          </div>
        </div>

        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {loading ? <div className="mt-3">Loading...</div> : <DataTable items={items} onView={(it) => setModalItem(it)} />}
      </div>

      {modalItem && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Details</h5>
                  <button type="button" className="btn-close" onClick={() => setModalItem(null)}></button>
                </div>
                <div className="modal-body">
                  <pre className="modal-pre">{JSON.stringify(modalItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setModalItem(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}
    </div>
  );
}
