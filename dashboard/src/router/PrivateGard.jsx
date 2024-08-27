import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateGard = () => {

    const { profile } = useSelector((state) => state.admin);

    return profile ? <Outlet /> : <Navigate to={"login"}/>
    
}

export default PrivateGard;
