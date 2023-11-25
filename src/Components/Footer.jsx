import React from 'react'
import logoM from '../IMG/MultiopticaBlanco.png'
import { TextCustom } from './TextCustom'

export const Footer = () => {
  return (
    <div className='contFooter' style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/*   <div className="sectInfoFoot">
            <img src={logoM} className='logoFoot' alt="Imagen no encontrada" />
            <div className="sectInfoContact">
                <div className="infoContact">
                    <TextCustom text="Correo" className="titleFooter" />
                    <TextCustom text="multiopticas2023@gmail.com" className="infoFooter"/>
                </div>

                <div className="infoContact">
                    <TextCustom text="Teléfono" className="titleFooter" />
                    <TextCustom text="9809-1176" className="infoFooter"/>
                </div>
            </div>
        </div> */}

        <h1 style={{alignContent:'center', color:'blue',  margin: '0'}}>DERECHOS RESERVADOS ©UNAH2023</h1>
    </div>
  )
}
