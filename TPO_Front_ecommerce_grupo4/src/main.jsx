import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import AppRoutes from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      
      <AppRoutes/>
   </BrowserRouter>
 
);