import {
    createBrowserRouter, RouterProvider, } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../Shop/Shop";
import Blog from "../components/Blog";
import About from "../components/About";
import SingleBook from "../Shop/SingleBooks";
import DashBoardLayout from "../dashboard/DashBoardLayout";
import DashBoard from "../dashboard/DashBoard";
import UploadBook from "../dashboard/UploadBook";
import ManageBook from "../dashboard/ManageBook";
import EditBook from "../dashboard/EditBook";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path:'/',
            element:<Home/>
        }, 
        {
            path:'/shop',
            element:<Shop/>
        },
        {
            path:'/blog',
            element:<Blog/>
        },
        {
            path:'/about',
            element:<About/>
        },
        {
            path:'/books/:id',
            element:<SingleBook/>,
            loader: ({params}) => fetch(`http://localhost:4000/books/${params.id}`)
        },
           
      ]
    },
    {
        path : "/admin/dashboard",
        element: <DashBoardLayout/>,
        children: [
            {
                path:"/admin/dashboard",
                element:<PrivateRoute><DashBoard/></PrivateRoute>
            },
            {
                path: "/admin/dashboard/upload",
                element: <UploadBook/>
            },
            {
                path:"/admin/dashboard/manage",
                element:<ManageBook/>
            },
            {
                path: "/admin/dashboard/edit-books/:id",
                element: <EditBook/>,
                loader: ({params}) => fetch(`http://localhost:4000/books/${params.id}`)

            },

        ]
    },
    {
        path:"sign-up",
        element:<SignUp/>
    },
    {
        path:"login",
        element: <Login />
    },
    {
       path:"logout",
       element:<Logout/>
    }

  ]);

  export default router;