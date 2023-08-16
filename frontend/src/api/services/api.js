import axios from "axios";
import {
  BASE_URL,
  Login_Route,
  Signup_Route,
  USER_Route,
  Refresh_Route,
  NOTE_Route,
} from "../routes/api.routes";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Signup_Route
// Login_Route
// USER_Route

// ()=>fetchWithReauth(fetchUserById)

export const fetchUserById = (userId, token) =>
  api.get(`${USER_Route}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchNoteById = (noteId, token) => {
  console.log("fetching notes");
  return api.get(`${NOTE_Route}/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const loginUser = (credentials) => api.post(Login_Route, credentials);

export const SignupUser = (credentials) => api.post(Signup_Route, credentials);

export const RefreshToken = () => api.get(Refresh_Route);

// export const fetchWithReauth = async (
//   originalQuery,
//   updateUser_Token,
//   navigate
// ) => {
//   try {
//     console.log("fetchWithReauth");
//     const data = await originalQuery();
//     return data;
//   } catch (err) {
//     console.log("fetchWithReauth & Error");

//     const statusCode = err?.response?.status;
//     console.log({ err, statusCode });

//     if (statusCode === 403) {
//       try {
//         const data = await RefreshToken();
//         console.log({ data });

//         const newToken = data?.data?.access_token;

//         updateUser_Token(newToken, data?.data?.user);
//       } catch (error) {
//         const refreshStatusCode = error?.response?.status;
//         if (refreshStatusCode === 401) {
//           console.log("Login Again! Token expired");
//           navigate("/auth/login");
//         }
//         console.log({ error, refreshStatusCode });
//       }
//     }
//   }
// };

export async function fetchWithReauth(
  originalQuery,
  orginalToken,
  updateUser_Token,
  onOpen
) {
  try {
    console.log("FETCHING WITH REAUTH");
    // Try the query with the original token passed
    const original_data = await originalQuery(orginalToken);

    // if everything is alright that means the token was still valid
    // Hence we returned the original_data
    return original_data;
  } catch (err) {
    // Error Occured: May be the token was invalid or there were any other type of error

    // Get the status code of the response
    const statusCode = err?.response?.status;
    console.log({ err, statusCode });

    if (statusCode === 403) {
      // Means that token is invalid or expired
      try {
        // Try to get a new refresh token
        console.log("GETTING A NEW TOKEN");

        const refreshData = await RefreshToken();
        console.log({ refreshData });

        const newToken = refreshData?.data?.access_token;
        const user = refreshData?.data?.user;

        // Update the user & token with it
        updateUser_Token(newToken, user);
        toast.info("5s past!\n Token Re-generated");

        try {
          //   Retry the original request with the new token
          console.log("DATA WITH NEW_TOKEN");

          const data = await originalQuery(newToken);
          return data;
        } catch (error) {
          console.log("Ab kuch nahi ho sakta bhai!");
          throw error;
        }
      } catch (error) {
        const refreshStatusCode = error?.response?.status;
        if (refreshStatusCode === 401) {
          console.log("TOKEN EXPIRED!!! LOGIN AGAIN");
          // navigate("/auth/login");
          onOpen();
          console.log({ error });
          // toast.error("15s past!\n Login expired! 🙂");

          throw error;
        }
      }
    }
    throw err;
  }
}
