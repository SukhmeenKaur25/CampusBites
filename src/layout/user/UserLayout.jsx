import {Outlet} from "react-router-dom"
import UserHeader from "./UserHeader"
import UserFooter from "./UserFooter"

export default function UserLayout(){
    return(
        <>
            <UserHeader/>
             <Outlet/>
            <UserFooter/>
        
        </>
    )
}


