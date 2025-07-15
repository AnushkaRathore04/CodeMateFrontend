import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
    return(
        <div>
            <NavBar/>
            <Outlet/>{/* any children-routs of body will render over here*/}
            <Footer/>
        </div>
    )
}
export default Body;