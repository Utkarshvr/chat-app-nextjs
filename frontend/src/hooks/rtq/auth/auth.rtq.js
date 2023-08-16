import { useMutation, useQuery } from "react-query";
import {
  fetchUserById,
  fetchWithReauth,
  loginUser,
  RefreshToken,
  SignupUser,
  fetchNoteById,
} from "../../../api/services/api";
// import { useNavigate } from "react-router-dom";
import { useAuthAPI, useAuthToken } from "../../../context/AuthProvider";
import { useModalAPI } from "../../../context/ModalProvider";
// import { handleQueryError } from "../../../utils/handleQueryError";
import { toast } from "react-toastify";
// import useFetchWithReauth from "../../useFetchWithReauth";

// export function useUserById(userId, token) {
//   const hanlder = useFetchWithReauth();

//   return useQuery(["user", userId], () => fetchUserById(userId, token), {
//     onError: hanlder,
//     retry: 1,
//   });
// }

// export function useUserById(userId, token) {
//   const navigate = useNavigate();
//   const { updateUser_Token } = useAuthAPI();
//   const queryClient = useQueryClient(); // Get the query client

//   return useQuery(["user", userId], () => fetchUserById(userId, token), {
//     onError: (err) =>
//       handleQueryError(err, queryClient, navigate, updateUser_Token, userId),
//     retry: 0,
//     enabled: !!userId || !!token,
//   });
// }

/* Custom hook for fetching data with reauthentication logic */
export function useFetchWithReauth(queryKey, fetchFunction) {
  const { updateUser_Token } = useAuthAPI();
  const { onOpen } = useModalAPI();
  const originalToken = useAuthToken();

  return useQuery(
    queryKey,
    () =>
      fetchWithReauth(fetchFunction, originalToken, updateUser_Token, onOpen),
    {
      retry: 0,
      enabled: !!originalToken,
    }
  );
}

export function useUserById(userId) {
  return useFetchWithReauth(["user", userId], (param_token) =>
    fetchUserById(userId, param_token)
  );
}
// Using the custom hook for fetching note data
export function useNoteById(noteId) {
  return useFetchWithReauth(["note", noteId], (param_token) =>
    fetchNoteById(noteId, param_token)
  );
}
// export function useUserById(userId) {
//   const { updateUser_Token } = useAuthAPI();
//   const { onOpen } = useModalAPI();

//   return useQuery(
//     ["user", userId],
//     () =>
//       fetchWithReauth(
//         (param_token) => fetchUserById(userId, param_token),
//         originalToken,
//         updateUser_Token,
//         onOpen
//       ),
//     {
//       // onError: (err) =>
//       //   handleQueryError(err, queryClient, navigate, updateUser_Token, userId),
//       retry: 0,
//       enabled: !!userId && !!originalToken,
//     }
//   );
// }

// export function useUserById(userId, originalToken) {
//   const { updateUser_Token } = useAuthAPI();
//   const { onOpen } = useModalAPI();

//   return useQuery(["user", userId], () =>
//     fetchWithReauth(
//       (param_token) => fetchUserById(userId, param_token),
//       originalToken,
//       updateUser_Token,
//       onOpen
//     )
//   );
// }

// export function useNoteById(noteId, originalToken) {
//   const { updateUser_Token } = useAuthAPI();
//   const { onOpen } = useModalAPI();

//   return useQuery(["user", userId], () =>
//     fetchWithReauth(
//       (param_token) => fetchNoteById(noteId, param_token),
//       originalToken,
//       updateUser_Token,
//       onOpen
//     )
//   );
// }

export function useLogin() {
  return useMutation("login-user", loginUser, {
    onSuccess: () => {
      toast.success("Login successfull");
    },
  });
}

export function useRefresh() {
  return useMutation("refresh-token", RefreshToken, {
    onSuccess: () => {
      toast.info("Access Token is renewed");
    },
    onError: () => {
      toast.error("Login Expired! ⚡️");
    },
  });
}

export function useSignup() {
  return useMutation("signup-user", SignupUser, {
    onSuccess: () => {
      toast.success("Signup successfull");
    },
  });
}
