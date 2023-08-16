const baseQueryWithReauth = async (args) => {
  // Implement your authentication logic here before making the actual request
  // For example, you can check if the user is authenticated and refresh tokens if needed.
  console.log("The query is going through the base query");

  // Get the original query function from args and call it
  const originalQueryFn = args.queryFn;
  console.log({ originalQueryFn, args });
  const result = await originalQueryFn(args);

  console.log("The original query is made");
  return result;
};

export default baseQueryWithReauth;
