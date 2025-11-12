import { createBrowserRouter } from "react-router-dom";

import MyServices from "../pages/MyServices";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Home from "../pages/Home";
import ServiceList from "../pages/ServiceList";
import ServiceDetails from "../pages/ServiceDetails";
import PrivateRoute from "./PrivateRoute";
import AddService from "../pages/AddService";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/Profile";
import EditService from "../components/EditService";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
  path: "/",
  element: <MainLayout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/services", element: <ServiceList /> },
    { path: "/service/:id", element: <ServiceDetails /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/profile", element: <PrivateRoute><Profile /></PrivateRoute> },
    { path: "/add-service", element: <PrivateRoute><AddService /></PrivateRoute> },
    { path: "/my-services", element: <PrivateRoute><MyServices /></PrivateRoute> },
    { path: "/my-bookings", element: <PrivateRoute><MyBookings /></PrivateRoute> },
    { path: "/edit-service/:id", element: <PrivateRoute><EditService /></PrivateRoute> },
    { path: "*", element: <NotFound></NotFound> },
  ]
}
]);
