import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import logoImg  from "../IMG/MultiopticaBlanco.png";

export const generatePDF = (formatDataForPDF, urlPDF, subTitulo, orientation, fondoPDF) => {

    const dataForPDF = formatDataForPDF();
    const documento = new jsPDF(`${orientation}`);
    const columns = Object.keys(dataForPDF[0]);
    const rows = dataForPDF.map((row) => Object.values(row));

    documento.addFont("Rubik-SemiBold.ttf", "Rubik", "bold");
    
    // Definir estilos para la tabla
    const styles = {
      cellPadding: 2,
      fontSize: 10,
      // fillColor: [98, 98, 98],
      fontStyle: 'bold',
      lineWidth: 0.1,
      valign: 'middle', // Alineación vertical de las celdas
      halign: 'center', // Alineación horizontal de las celdas
      cellWidth: 'wrap', // Ancho de celda ajustado al contenido
      columnWidth : "auto",
    };

    // Agregar la imagen de fondo primero
    documento.addImage(fondoPDF, 'JPG', 0, 0, documento.internal.pageSize.getWidth(), documento.internal.pageSize.getHeight());
  
    documento.autoTable({
      head: [columns],
      body: rows,
      startY: 80,
      theme: 'plain',
      tableWidth: 'auto', // Ancho de la tabla ajustado al contenido
      styles,
      didDrawCell: (data) => {
        // Aplicar estilos personalizados a las celdas del cuerpo
        if (data.cell.section === 'body') {
          documento.setFillColor(238, 238, 238); // Color de fondo en RGB
            documento.setTextColor(0, 0, 0); // Establecer el color de texto en Rojo (RGB: 255, 0, 0)
        }
      },
    });
    
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2,'0');
    const dia = String(fecha.getDate()).padStart(2,'0');
    
    const fechaSinSlash = dia + "/" + mes + "/" + año;
    
    const pdfWidth = documento.internal.pageSize.getWidth(); // Obtener el ancho del PDF
    const imgWidth = 40; // Ancho deseado de la imagen
    const imgHeight = 15; // Alto deseado de la imagen
    const imgX = pdfWidth - imgWidth - 10; // Calcular la posición x de la imagen para que esté en el lado derecho
    const imgY = 20; // Posición y deseada de la imagen
    
    documento.setFontSize(30);
    documento.setTextColor(98,98,98);
    documento.setFont('Rubik', "bold");
    documento.text(`${subTitulo}`, 92, 66);
    documento.setFontSize(16);
    documento.setFont('Rubik', "bold");
    documento.setTextColor(255,255,255);
    documento.text(`${fechaSinSlash}`, 243, 44);

    documento.save(urlPDF);
  };
