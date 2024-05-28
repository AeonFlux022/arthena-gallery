import { useState, useEffect } from "react";

function AlertNotification({ alert, closeAlert }) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timer;
    if (alert) {
      setShowAlert(true);
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [alert]);

  return (
    showAlert &&
    alert && (
      <div
        className={`fixed top-4 right-4 z-50 alert ${
          alert.type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        } rounded-md p-4 w-80 shadow-md flex justify-between items-center`}
        role="alert"
      >
        {alert.message}
        <button
          type="button"
          className="btn-close text-white hover:text-gray-300"
          onClick={() => {
            setShowAlert(false);
            closeAlert();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    )
  );
}

export default AlertNotification;
