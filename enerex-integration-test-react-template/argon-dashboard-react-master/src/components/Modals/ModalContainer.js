import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Modal, ModalBody, ModalHeader, Button,ModalFooter } from "reactstrap";
import {Row, Col} from "reactstrap";

// import "bootstrap-icons/font/bootstrap-icons.css";


export function ModalContainer({  handleModal, children }) {
  // // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const modal = (
    <Modal
      isOpen={true}
      // toggle={handleModal}
      centered
      backdrop="static" // evita cierre al hacer clic fuera; puedes cambiar a `true` si quieres permitirlo
      className="modal-auto-width gap-0"
      style={{ zIndex: 9999 }}
    >
    <ModalHeader
    toggle={handleModal}
    >
    </ModalHeader>

      {/* <ModalBody className="d-flex flex-column align-items-center justify-content-center gap-4"> */}
      <ModalBody className="p-0">
        {children}
      </ModalBody>
    </Modal>
  );

  // Usamos createPortal para insertar el modal en <body>
  return createPortal(modal, document.body);
}

export default ModalContainer;
