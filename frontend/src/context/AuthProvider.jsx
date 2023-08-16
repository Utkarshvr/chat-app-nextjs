import { createContext, useContext, useMemo, useReducer } from "react";

const INITIAL_STATE = {
  user: null,
  loading: true,
  token: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN_START":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: payload.user,
        loading: false,
        token: payload.token,
      };
    case "LOGIN_FAILURE":
      return { ...state, loading: false };
    case "UPDATE_USER_TOKEN":
      return {
        ...state,
        user: payload.user,
        loading: false,
        token: payload.token,
      };
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

const AuthAPIContext = createContext();
const AuthUserContext = createContext(INITIAL_STATE.user);
const AuthLoadingContext = createContext(INITIAL_STATE.loading);
const AuthTokenContext = createContext(INITIAL_STATE.token);

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const api = useMemo(() => {
    const onLoginStart = () => {
      dispatch({ type: "LOGIN_START" });
    };

    const onLoginSuccess = (payload) => {
      dispatch({ type: "LOGIN_SUCCESS", payload });
    };

    const updateUser_Token = (token, user) => {
      // console.log("Provider: ", token, user);
      dispatch({ type: "UPDATE_USER_TOKEN", payload: { token, user } });
    };
    const onLoginFailure = () => {
      dispatch({ type: "LOGIN_FAILURE" });
    };
    const onLogout = () => {
      dispatch({ type: "LOGOUT" });
    };

    return {
      onLoginStart,
      onLoginSuccess,
      onLoginFailure,
      onLogout,
      updateUser_Token,
    };
  }, []);

  return (
    <AuthAPIContext.Provider value={api}>
      <AuthUserContext.Provider value={state.user}>
        <AuthLoadingContext.Provider value={state.loading}>
          <AuthTokenContext.Provider value={state.token}>
            {children}
          </AuthTokenContext.Provider>
        </AuthLoadingContext.Provider>
      </AuthUserContext.Provider>
    </AuthAPIContext.Provider>
  );
}

export const useAuthAPI = () => useContext(AuthAPIContext);
export const useAuthUser = () => useContext(AuthUserContext);
export const useAuthLoading = () => useContext(AuthLoadingContext);
export const useAuthToken = () => useContext(AuthTokenContext);
