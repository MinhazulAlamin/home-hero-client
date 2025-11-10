import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AddService from "../pages/AddService";
import MyServices from "../pages/MyServices";
import ServiceList from "../pages/ServiceList";
import ServiceDetails from "../pages/ServiceDetails";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/services", element: <ServiceList /> },
  { path: "/services/:id", element: <ServiceDetails /> },
  {
    path: "/add-service",
    element: (
      <PrivateRoute>
        <AddService />
      </PrivateRoute>
    ),
  },
  {
    path: "/my-services",
    element: (
      <PrivateRoute>
        <MyServices />
      </PrivateRoute>
    ),
  },
  {
    path: "/my-bookings",
    element: (
      <PrivateRoute>
        <MyBookings />
      </PrivateRoute>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
