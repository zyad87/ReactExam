import React, { useEffect, useState } from 'react';

function AlertToast({ text, duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-5 z-50">
      <div className="alert alert-info bg-accent text-white p-4 shadow-lg rounded flex items-center">
        <span>{text}</span>
      </div>
    </div>
  );
}

export default AlertToast;
