import { Container, Grid } from "@mui/material";
import "../Styles/Home.css";
import "../Styles/Contacto.css"
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

import '../Styles/Contacto.css';

export const Contacto = () => {
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_dqwto0g', 'template_3lvkb65', form.current, 'rUDGabTkj5oOb4GXL')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

    return (
        <form ref={form} onSubmit={sendEmail} className="field">
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>

    );
}