import { createBrowserRouter } from "react-router";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Home from "../../pages/Home/Home";
import Admin from "../../components/Admin/Admin";
import Blogs from "../../components/Blogs/Blogs";
import Blog from "../../components/Blog/Blog";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import ProtectedRouteAdmin from "../../components/ProtectedRouteAdmin/ProtectedRouteAdmin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: "/blogs",
                element: <Blogs></Blogs>
            },
            {
                path: "/blog/:id",
                element: <Blog></Blog>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/mrd-admin",
                element: <ProtectedRouteAdmin>
                    <Admin></Admin>
                </ProtectedRouteAdmin>
            }
        ]
        
    }
])

export default router;