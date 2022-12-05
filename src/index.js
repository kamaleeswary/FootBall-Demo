import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/AuthContext";
import { TableContextProvider } from "./store/TableContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <TableContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TableContextProvider>
  </AuthContextProvider>
);
