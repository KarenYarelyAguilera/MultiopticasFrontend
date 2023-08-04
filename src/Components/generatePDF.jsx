import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import logoImg  from "../IMG/MultiopticaBlanco.png";
import fondoPDF from "../IMG/fondoPDF.jpg";


export const generatePDF = (formatDataForPDF, urlPDF, subTitulo) => {

    const dataForPDF = formatDataForPDF();
    const documento = new jsPDF('landscape');
    const columns = Object.keys(dataForPDF[0]);
    const rows = dataForPDF.map((row) => Object.values(row));
    
    // Definir estilos para la tabla
    const styles = {
      cellPadding: 2,
      fontSize: 10,
      // fillColor: [38, 103, 177],
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
      startY: 45,
      theme: 'striped',
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
    
    documento.setFont('helvetica', "bold");
    documento.setFontSize(20);
    documento.text("Multi Opticas", 125, 20);
    documento.setFontSize(10);
    documento.setFont('helvetica', "bold");
    documento.text(`${subTitulo}`, 125, 30);
    documento.setFontSize(10);
    documento.setFont('helvetica', "bold");
    documento.text(`Fecha: ${fechaSinSlash}`, 10, 30);
    documento.addImage(logoImg, 'PNG', imgX, imgY, imgWidth, imgHeight); // Ajusta las coordenadas y el tamaño según tus necesidades

    documento.save(urlPDF);
  };
