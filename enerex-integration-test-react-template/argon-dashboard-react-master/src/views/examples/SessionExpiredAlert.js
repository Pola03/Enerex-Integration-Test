import React, { useState, useEffect } from "react";
import { Alert } from "reactstrap";
import { useNavigate } from "react-router-dom";

const SessionExpiredAlert = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/auth/login");
    }, 5000); // Redirige después de 3 segundos

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="p-4">
      <Alert
        color="warning"
        isOpen={visible}
        toggle={() => setVisible(false)}
      >
        ⚠️ Tu sesión ha expirado. Serás redirigido al login.
      </Alert>
    </div>
  );
};

export default SessionExpiredAlert;
