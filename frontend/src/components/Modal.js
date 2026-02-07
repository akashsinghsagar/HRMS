import React from 'react';
import './Modal.css';

function Modal({ title, children, show, onClose }) {
  if (!show) return null;

  return (
    <>
      <div
        className="modal-overlay active"
        onClick={onClose}
      />
      <div className="modal-overlay active" style={{ display: 'flex' }}>
        <div
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <button
              className="modal-close"
              onClick={onClose}
              type="button"
            >
              ✕
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
