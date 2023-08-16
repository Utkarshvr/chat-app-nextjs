import { useNavigate } from "react-router-dom";
import { useModalAPI, useModalData } from "../../context/ModalProvider";

export default function LoginExpiredModal() {
  const { onClose } = useModalAPI();
  const { showModal } = useModalData();

  //   useNavigate
  const navigate = useNavigate();

  //   APIS
  // const closeModal = () => {
  //   onClose();
  // };
  const redirectToLogin = () => {
    navigate("/auth/login");
    onClose();
  };

  return (
    <div className="container mt-5">
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        // tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login Expired</h5>
              {/* <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              ></button> */}
            </div>
            <div className="modal-body">
              Your login has expired. Please log in again to continue.
            </div>
            <div
              className="modal-footer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button> */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={redirectToLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      ></div>
    </div>
  );
}
