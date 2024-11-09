import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')).render(
   <div className="container-fluid">
    <BrowserRouter>
      <AuthProvider>
      <AppRoutes/>
      </AuthProvider>
   </BrowserRouter>
 </div>
);