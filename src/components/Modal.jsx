import React from 'react';

export default function Modal({ isOpen, title, value, onChange, onConfirm, onCancel, placeholder = "Enter name..." }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
        </div>
        <div className="modal-body">
          <input 
            autoFocus
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder={placeholder}
            onKeyPress={(e) => e.key === 'Enter' && onConfirm()}
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
