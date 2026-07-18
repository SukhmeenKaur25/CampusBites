import { Outlet , useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { useEffect } from "react";
import AuthServices from "../../services/AuthServices";
import { toast } from "react-toastify";


export default function AdminLayout(){

    let UserType=AuthServices.getUserType()
    const nav=useNavigate()

    useEffect(()=>{
        if(UserType!=1){
            toast.warning("You are not allowed in this pannel")
            nav("/login")
        }
    })
    return (
        <>
        <AdminHeader/>
        <Outlet/>
        <AdminFooter/>


        </>
    )
}