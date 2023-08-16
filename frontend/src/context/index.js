import AuthProvider from "./AuthProvider";
import ModalProvider from "./ModalProvider";

export default function Store({ children }) {
  return (
    <AuthProvider>
      <ModalProvider>{children}</ModalProvider>
    </AuthProvider>
  );
}
