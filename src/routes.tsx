import * as React from "react";

import {
  createBrowserRouter,
} from "react-router-dom";
import { CalendarToWhatsapp } from "./components/CalendarToWhatsApp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CalendarToWhatsapp logo={""} />
  }
]);


export default router;