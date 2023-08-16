import { ToastContainer, Slide, Zoom, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const toastOptions = {
//   position: "bottom-right",
//   autoClose: 2000,
//   pauseOnHover: false,
//   draggable: true,
//   theme: "dark",
// };
export default function ToastMsg() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Flip}
    />
  );
}
