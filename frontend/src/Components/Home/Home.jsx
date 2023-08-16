// import { useFakeData } from "../../hooks/rtq/auth/fakeData.rtq";
// export default function Home() {
//   const { data, isError, error, isLoading } = useFakeData();
//   if (isLoading) return <h3>LOADING...</h3>;
//   if (isError) return <h3>ERROR: {error?.response?.message}</h3>;

//   return (
//     <>
//       <div>
//         {data?.data?.map((item) => (
//           <h5 key={item?.id}>{item?.name}</h5>
//         ))}
//       </div>
//     </>
//   );
// }
import { useNoteById } from "../../hooks/rtq/auth/auth.rtq";

export default function Home() {
  const { data, isLoading, isError, error } = useNoteById(123);

  if (isLoading) {
    return <h3>LOADING...</h3>;
  }

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
      <h4>User Note: </h4>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <h5 className="card-title">{data?.data?.note?.title}</h5>
              <p className="card-text">{data?.data?.note?.description}</p>
              {/* <p className="card-text">
                Created At: {new Date(data?.data?.createdAt).toDateString()}
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
