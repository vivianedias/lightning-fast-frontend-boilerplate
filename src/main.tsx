import { render } from 'preact'
import { SWRConfig } from "swr";
import App from "./app.tsx";
import fetcher from "./utils/fetcher.ts";
import "./index.css";

render(
  <SWRConfig
    value={{
      fetcher,
    }}
  >
    <App />
  </SWRConfig>,
  document.getElementById("app")!
);
