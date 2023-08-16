import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../../hooks/rtq/auth/auth.rtq";

const initialState = {
  username: "",
  password: "",
};

export default function Signup() {
  const [credentials, setCredentials] = useState(initialState);
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
  } = useSignup();

  useEffect(() => {
    if (isSuccess) {
      setError(null);
      console.log(data);
      navigate("/auth/login");
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
          Signup
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
