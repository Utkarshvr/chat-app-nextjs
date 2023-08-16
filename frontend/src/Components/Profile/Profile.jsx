import { useAuthUser } from "../../context/AuthProvider";
import { useUserById } from "../../hooks/rtq/auth/auth.rtq";

export default function Profile() {
  // const token = useAuthToken();
  const user = useAuthUser();
  // console.log(token);

  const { data, isLoading, isError, error } = useUserById(user?._id);

  if (isLoading) return <h3>LOADING...</h3>;

  if (isError) {
    const statusCode = error?.response?.status;
    if (statusCode !== 403 && statusCode !== 401)
      return (
        <div class="container mt-5 text-center">
          <h1 class="display-1 text-danger">Oops!</h1>
          <h2 class="mb-4">
            <p>{error?.response?.message}</p>
          </h2>
          <p class="lead">
            We apologize for the inconvenience. Please try again later.
          </p>
        </div>
      );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <h5 className="card-title">{data?.data?.username}</h5>
              <p className="card-text">User Id: {data?.data?._id}</p>
              {/* <p className="card-text">Email: {data?.data?.email}</p> */}
              <p className="card-text">Role: User</p>
              <p className="card-text">
                Created At: {new Date(data?.data?.createdAt).toDateString()}
                {/* {formatDistanceToNow(new Date(data?.data?.createdAt), {
                  addSuffix: true,
                })} */}
              </p>
            </div>
            <img
              src="https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png"
              alt="Profile"
              className="rounded-circle"
              width="100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
