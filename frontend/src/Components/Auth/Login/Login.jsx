import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/rtq/auth/auth.rtq";
import { useAuthAPI } from "../../../context/AuthProvider";

const initialState = {
  username: "",
  password: "",
};
export default function Login() {
  const [credentials, setCredentials] = useState(initialState);
  const { onLoginSuccess } = useAuthAPI();

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // RTQ
  const {
    isLoading,
    isSuccess,
    isError,
    mutate,
    error: rtqError,
    data,
  } = useLogin();
  useEffect(() => {
    if (isSuccess) {
      setError(null);
      console.log(data);

      onLoginSuccess({
        user: data?.data?.user,
        token: data?.data?.access_token,
      });
      navigate("/profile");
    }
    if (isError) {
      setError(rtqError?.response?.data?.message);
    }
  }, [isLoading, isError, isSuccess]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);

    mutate(credentials);
  };
  return (
    <div style={{ maxWidth: "500px" }} className="mt-5 container-sm">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            value={credentials.username}
            type={"text"}
            name={"username"}
            placeholder={"Enter Username"}
            onChange={(e) => handleChange(e)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={credentials.password}
            type={"password"}
            name={"password"}
            placeholder={"Enter Password"}
            onChange={(e) => handleChange(e)}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{ width: "100%" }}
          className="btn btn-primary"
          aria-label="Close"
        >
          Login
        </button>
        {error && (
          <h6 className="error_text mt-2" style={{ textAlign: "center" }}>
            {error}
          </h6>
        )}
      </form>
    </div>
  );
}
