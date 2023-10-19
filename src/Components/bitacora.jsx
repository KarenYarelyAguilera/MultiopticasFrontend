import axios from "axios";

export const Bitacora = async ({activo,urlB,dataB}) =>{
    if (activo!=="no") {
      await axios.post(urlB,dataB)
    }   
}