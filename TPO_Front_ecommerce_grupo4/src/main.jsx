import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import ConnectionWrapper from './context/ConnectionWrapper';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>
      <ConnectionWrapper>
         <AppRoutes/>
      </ConnectionWrapper>
      </AuthProvider>
   </BrowserRouter>
);