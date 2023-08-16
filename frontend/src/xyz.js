// wrapper((userId, token)=>wrappedFunc(userId, token))
function wrapper(wrappedFunc) {
  const result = wrappedFunc(1, 5);
  console.log({ result });
  return result;
}

function add(num1, num2, num3) {
  return num1 + num2 + num3;
}

function innerFunc(num1, num2) {
  return add(2, num1, num2);
}

// wrapper(innerFunc);

// Trying to build the fetchWithReauth functionality
let isTokenExpired = false;
const token = "old_token";

function refreshToken() {
  return "new_token";
}

function fetchWithReauth(
  originalQuery,
  orginalToken,
  updateUser_Token,
  navigate
) {
  let data = isTokenExpired ? null : originalQuery(orginalToken);
//   console.log({ initialData: data, isData: !!data });
  // If token is valid & data is available then return it
  if (!!data) return data;

  // Else if token is invalid
  // Regenrate new token
  const newToken = refreshToken();
//   console.log({ newToken });
  // Update the token after 2s: setTimeout(() => updateUser_Token(newToken),2000)

  //   Retry the original request with the new token
  data = originalQuery(newToken);
//   console.log({ data, isDat: !!data });
  if (!!data) return data;
}

const getUserById = (id, param_token) => ({
  _id: id,
  name: "Utkarsh",
  token: param_token,
});

console.log(
  fetchWithReauth(
    (token) => getUserById(46, token),
    token,
    "updateAuthFunciton",
    "navigate-function"
  )
);
