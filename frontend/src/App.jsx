import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from './pages/home/Home'
import Services from './pages/services/Services'
import MyServices from './pages/myServices/MyServices'
import Bookings from './pages/bookings/Bookings'
import Messages from './pages/messages/Messages'
import Message from './pages/message/Message'
import Add from './pages/add/Add'
import Service from './pages/service/Service'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import { Button } from 'flowbite-react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,}  from '@tanstack/react-query'
import Pay from "./pages/pay/pay";
import Success from "./pages/success/Success";


const queryClient = new QueryClient()
function App() {
  const Layout = () => {
    return (
      <div className="app">
         
        <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/myservices",
          element: <MyServices />,
        },
        {
          path: "/bookings",
          element: <Bookings />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/services/single/:id",
          element: <Service />,
        },
        {
          path:'/pay/:id',
          element:<Pay/>
        },
        {
          path: "/success",
          element: <Success/>,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Register />,
        },
      ],
    },
    
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
