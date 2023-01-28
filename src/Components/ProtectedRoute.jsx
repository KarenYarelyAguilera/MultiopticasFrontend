import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({activo,children}) =>{
    if (activo!=="activo") {
        return <Navigate to='/'/>
    }
    return children
}