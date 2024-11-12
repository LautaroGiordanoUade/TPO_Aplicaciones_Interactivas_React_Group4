import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastMessage = ({ show, setShow, message, variant }) => {
  return (
    <ToastContainer
          className="p-3"
          position="top-center"
          style={{ zIndex: 99999999 }}
        >
    <Toast bg={variant} onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Body className="text-white">{message}</Toast.Body>
    </Toast></ToastContainer>
  );
}

export default ToastMessage;