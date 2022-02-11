import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* <StylesProvider injectFirst> */}
          <App />
          {/* </StylesProvider> */}
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </QueryClientProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
