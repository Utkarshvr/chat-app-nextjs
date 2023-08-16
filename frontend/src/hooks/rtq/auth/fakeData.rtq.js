import axios from "axios";
import { useQuery } from "react-query";

export function useFakeData() {
  return useQuery("fake-data", () =>
    axios.get("https://jsonplaceholder.typicode.com/users")
  );
}
