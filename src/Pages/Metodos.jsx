import { useNavigate } from "react-router"

export const Metodos = (props)=>{
    const navegate = useNavigate()

   

    const PreguntasCorreo = () =>{
        let correo = document.getElementById("correo").value
        props.correo(correo)

        navegate("/recuperacion/preguntas")
    }

    return <>
    <input type="text" id="correo" />
    <button >Correo de verificacion</button>
    <button onClick={PreguntasCorreo}>Preguntas de seguridad</button>
    </>
}