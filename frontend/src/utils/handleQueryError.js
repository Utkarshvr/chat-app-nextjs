// utils.js
import { toast } from "react-toastify";
import { RefreshToken } from "../api/services/api"; // Import your fetchers

export async function handleQueryError(
  err,
  queryClient,
  navigate,
  updateUser_Token,
  userId
) {
  const statusCode = err?.response?.status;
  // console.log({ err, statusCode });

  if (statusCode === 403) {
    try {
      const data = await RefreshToken();
      console.log("5s past!\n Token Re-generated: 😄", { data });

      updateUser_Token(data?.data?.access_token, data?.data?.user);
      toast.info("5s past!\n Token Re-generated");

      // Invalidate the query to trigger a re-fetch with the new token
      // console.log("Reseted Query!!!");
      // queryClient.resetQueries(["user", userId]); // Replace with the appropriate query key
    } catch (error) {
      const refreshStatusCode = error?.response?.status;
      if (refreshStatusCode === 401) {
        console.log("15s past!\n Login expired! 🙂");
        toast.error("15s past!\n Login expired! 🙂");
        // navigate("/auth/login");
      }
      // console.log({ error, refreshStatusCode });
    }
  }
}

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   // console.log(args) // request url, method, body
//   // console.log(api) // signal, dispatch, getState()
//   // console.log(extraOptions) //custom like {shout: true}

//   let result = await baseQuery(args, api, extraOptions);

//   // If you want, handle other status codes, too
//   if (result?.error?.status === 403) {
//     console.log("sending refresh token");

//     // send refresh token to get new access token
//     const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

//     if (refreshResult?.data) {
//       // store the new token
//       api.dispatch(setCredentials({ ...refreshResult.data }));

//       // retry original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       if (refreshResult?.error?.status === 403) {
//         refreshResult.error.data.message = "Your login has expired. ";
//       }
//       return refreshResult;
//     }
//   }

//   return result;
// };
