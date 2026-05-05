import React, { useState, useEffect } from 'react';

export default function Modal({ isOpen, title, fields = [], onConfirm, onCancel }) {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (isOpen) {
      const initialValues = {};
      fields.forEach(f => {
        initialValues[f.key] = f.initialValue || "";
      });
      setValues(initialValues);
    }
  }, [isOpen, fields]);

  if (!isOpen) return null;

  const handleChange = (key, val) => {
    setValues(prev => ({ ...prev, [key]: val }));
  };

  const handleConfirm = () => {
    onConfirm(values);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
        </div>
        <div className="modal-body">
          {fields.map(f => (
            <div key={f.key} style={{ marginBottom: "1rem" }}>
              <label className="label" style={{ fontSize: "0.75rem" }}>{f.label}</label>
              <input 
                type={f.type || "text"}
                autoFocus={f.autoFocus}
                value={values[f.key] || ""} 
                onChange={(e) => handleChange(f.key, e.target.value)} 
                placeholder={f.placeholder}
                onKeyPress={(e) => e.key === 'Enter' && handleConfirm()}
              />
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={handleConfirm}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
