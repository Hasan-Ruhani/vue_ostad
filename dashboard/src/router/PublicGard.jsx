import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const PublicGard = () => {
  
    const { profile } = useSelector(state => state.admin);

    if(localStorage.getItem("profile")){
        return profile ? <Navigate to={"/"}/> : <Outlet/>;
    }
    return <Outlet />;

}

export default PublicGard;
