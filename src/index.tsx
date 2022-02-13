import { MuiThemeProvider } from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { theme } from "./shared/theme";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* <StylesProvider injectFirst> */}
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
          {/* </StylesProvider> */}
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </QueryClientProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
