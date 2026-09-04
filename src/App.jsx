import About from "./components/user/About";
import Home from "./components/user/Home";
import Dashboard from "./components/admin/Dashboard";
import AdminFooter from "./layout/admin/AdminFooter";
import AdminHeader from "./layout/admin/AdminHeader";
import AdminLayout from "./layout/admin/AdminLayout";
import UserLayout from "./layout/user/UserLayout";
import UserHeader from "./layout/user/UserHeader";
import UserFooter from "./layout/user/UserFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Contact from "./components/user/Contact";
import Login from "./components/user/Login";
import { ToastContainer } from "react-toastify";
import AddCategory from "./components/admin/category/AddCategory";
import ManageCategory from "./components/admin/category/ManageCategory";
import UpdateCategory from "./components/admin/category/UpdateCategory";
import Register from "./components/user/Register";
import AddMenu from "./components/admin/menu/AddMenu";
import ManageMenu from "./components/admin/menu/ManageMenu";
import ViewCategory from "./components/user/ViewCategory";
import UpdateMenu from "./components/admin/menu/UpdateMenu";
import ViewMenu from "./components/user/ViewMenu";
import AddToCart from "./components/user/AddToCart";
import Orders from "./components/user/Orders";
import AllOrders from "./components/admin/orders/AllOrders";
import ChatBotComponent from "./components/user/ChatBot";


export default function App(){
    return(
        <>
        
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UserLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/menu" element={<ViewMenu />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/viewCategory" element={<ViewCategory/>}></Route>
                        <Route path="/orders" element={<Orders/>}></Route>
                        
                        <Route path="/viewMenu/:id" element={<ViewMenu/>}></Route>

                        <Route path="/addToCart" element={<AddToCart/>}></Route>
                    </Route>

                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />}></Route>
                        <Route path="addCategory" element={<AddCategory />}></Route>
                        <Route path="manageCategory" element={<ManageCategory />}></Route>
                        <Route path="updateCategory/:id" element={<UpdateCategory />}></Route>
                        <Route path="addMenu" element={<AddMenu />}></Route>
                        <Route path="manageMenu" element={<ManageMenu />}></Route>
                        <Route path="updateMenu/:id" element={<UpdateMenu />}></Route>
                        <Route path="allOrders" element={<AllOrders />}></Route>

                        
                    </Route>

                </Routes>
            </BrowserRouter>

        <ToastContainer/>
<ChatBotComponent />
        </>
    )
}