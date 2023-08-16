import { useEffect } from "react";
import { useRefresh } from "../../hooks/rtq/auth/auth.rtq";
import { useNavigate } from "react-router-dom";
import { useAuthAPI, useAuthToken } from "../../context/AuthProvider";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  // console.log("In the PR");
  const { updateUser_Token } = useAuthAPI();
  const token = useAuthToken();
  const {
    mutate: refreshToken,
    data,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useRefresh();
  const navigate = useNavigate();

  // console.log({ data, error, isLoading, isError, isSuccess });

  useEffect(() => {
    if (isError) navigate("/auth/login");
    if (isSuccess) updateUser_Token(data?.data?.access_token, data?.data?.user);
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!!!token) {
      console.log("Trying to refresh token");
      // toast.info("Refreshing Access Token");
      refreshToken();
    } else {
      console.log("No need to refresh");
    }
  }, []);

  if (isError) {
    return <>Error {`:)`}</>;
  }

  if (isSuccess || token) {
    return <>{children}</>;
  }
}
