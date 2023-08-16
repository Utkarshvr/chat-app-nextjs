import { useNavigate } from "react-router-dom";
import { useAuthAPI } from "../context/AuthProvider";
import { RefreshToken } from "../api/services/api";

export default async function useFetchWithReauth() {
  // Use Hooks
  const navigate = useNavigate();
  const { updateUser_Token } = useAuthAPI();
  const handler = async (err) => {
    console.log("In the HANDLER__HOOK!!!");
    const statusCode = err?.response?.status;
    console.log({ err, statusCode });

    if (statusCode === 403) {
      try {
        const data = await RefreshToken();
        console.log({ data });

        updateUser_Token(data?.data?.access_token, data?.data?.user);
      } catch (error) {
        const refreshStatusCode = error?.response?.status;
        if (refreshStatusCode === 401) {
          console.log("Login Again! Token expired");
          navigate("/auth/login");
        }
        console.log({ error, refreshStatusCode });
      }
    }
  };
  return handler;
}
