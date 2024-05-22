import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';


// This Component Is not used AnyWhere This for Testing 
function Test() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
    <Button variant="primary" onClick={handleShow}>
      Open Vertical Centered Modal
    </Button>

    <Modal centered show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Vertical Centered Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This is a vertically centered React Bootstrap modal.
        You can add your content here.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </div>

  );
}

export default Test;
