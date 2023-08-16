import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { BrowserRouter } from "react-router-dom";
import Store from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

const AppWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
};
root.render(
  <AppWrapper>
    <Store>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Store>
  </AppWrapper>
);
