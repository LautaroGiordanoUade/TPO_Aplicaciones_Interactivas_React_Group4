import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import AppRoutes from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById('root')).render(
   <div className="container-fluid">
    <BrowserRouter>
      <AppRoutes/>
   </BrowserRouter>
 </div>
);