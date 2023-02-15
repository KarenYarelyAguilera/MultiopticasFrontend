import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({activo,children}) =>{
    if (activo!=="Activo") {
        return <Navigate to='/'/>
    }
    return children
}