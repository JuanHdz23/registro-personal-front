import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as logoFile from '../../../assets/images/logo.js';
@Injectable({
  providedIn: 'root'
})
export class ExcelserviceService {

  constructor() { }

  generateExcel(data: any[], titulo, encabezados: any[], subtitulo: any) {

    //Excel Title, Header, Data
    const title = titulo;
    const header = encabezados;
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(titulo);

    // Add Image
    let logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
      // filename: 'Seguridad.jpg',
      // extension: 'jpeg',
    });
    worksheet.addImage(logo, 'A1:C6');
      //Add Row and formatting
      let titleRow = worksheet.addRow([title]);
      titleRow.font = { name: 'Arial Black', size: 14, bold: true }

    worksheet.mergeCells('A1:H8');
  
   // let subTitleRow = worksheet.addRow(['Vehículos que se encuentran actualmente en el depósito'])
  //  let subTitleRow = worksheet.addRow([subtitulo])
  //   //Blank Row
    worksheet.addRow([]);
    worksheet.addRow([]);
    //Add Header Row
    let headerRow = worksheet.addRow(header);
    worksheet.getRow(4).alignment = { wrapText: true };

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '000000' },
        bgColor: { argb: '000000' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    headerRow.font = { size: 12, bold: true, color: { argb: 'ffffff'} }
    // Add Data and Conditional Formatting
    data.forEach((elemento) => {
      let valorArray = [];
      valorArray = Object.values(elemento);
      worksheet.addRow(valorArray);
    })



    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 25;
    worksheet.getColumn(3).width = 10;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;
     worksheet.getColumn(7).width = 14;
     worksheet.getColumn(8).width = 20;
    // worksheet.getColumn(9).width = 20;
    // worksheet.getColumn(10).width = 15;
    // worksheet.getColumn(11).width = 30;
    // worksheet.getColumn(12).width = 15;
    // worksheet.getColumn(13).width = 15;
    // worksheet.getColumn(14).width = 15;
    // worksheet.getColumn(15).width = 15;
    // worksheet.getColumn(16).width = 10;
    // worksheet.getColumn(17).width = 15;
    // worksheet.getColumn(18).width = 30;
    // worksheet.getColumn(19).width = 30;
    // worksheet.getColumn(20).width = 30;
    // worksheet.getColumn(21).width = 15;
    // worksheet.getColumn(22).width = 30;
    // worksheet.getColumn(23).width = 30;
    // worksheet.getColumn(24).width = 45;
    // worksheet.getColumn(25).width = 30;
    worksheet.addRow([]);
    // //Footer Row
    // let footerRow = worksheet.addRow(['Este es un excel generado por el sistema.']);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFCCFFE5' }
    // };
    // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    // //Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: EXCEL_TYPE });
      FileSaver.saveAs(blob, titulo + new Date().getTime() + EXCEL_EXTENSION);
    })
  }

  generateExcelEncabezados(data: any[], titulo, encabezados: any[], encabezadosWidth: any[], subtitulo: any) {

  //Excel Title, Header, Data
  const title = titulo;
  const header = encabezados;
  //Create workbook and worksheet
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet(titulo);

  // Add Image
  let logo = workbook.addImage({
    base64: logoFile.logoBase64,
    extension: 'png',
    // filename: 'Seguridad.jpg',
    // extension: 'jpeg',
  });
  worksheet.addImage(logo, 'A1:C6');
    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Arial Black', size: 14, bold: true }

  worksheet.mergeCells('A1:H8');

 // let subTitleRow = worksheet.addRow(['Vehículos que se encuentran actualmente en el depósito'])
//  let subTitleRow = worksheet.addRow([subtitulo])
//   //Blank Row
  worksheet.addRow([]);
  worksheet.addRow([]);
  //Add Header Row
  let headerRow = worksheet.addRow(header);
  worksheet.getRow(4).alignment = { wrapText: true };

  // Cell Style : Fill and Border
  headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '000000' },
      bgColor: { argb: '000000' }
    }
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  })
  headerRow.font = { size: 12, bold: true, color: { argb: 'ffffff'} }
  // Add Data and Conditional Formatting
  data.forEach((elemento) => {
    let valorArray = [];
    valorArray = Object.values(elemento);
    worksheet.addRow(valorArray);
  })

   
    for (let index = 0; index < encabezadosWidth.length; index++) {
      const element = encabezadosWidth[index];
      console.log('element :>> ', element);
      console.log('index :>> ', index+1);
      worksheet.getColumn(index+1).width = element;
    }
    // encabezadosWidth.forEach(element => {
    //   worksheet.getColumn(element.index).width = element;
    // });

    worksheet.addRow([]);
    // //Footer Row
    // let footerRow = worksheet.addRow(['Este es un excel generado por el sistema.']);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFCCFFE5' }
    // };
    // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    // //Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: EXCEL_TYPE });
      FileSaver.saveAs(blob, titulo + new Date().getTime() + EXCEL_EXTENSION);
    })
  }

  generateExcelFull(data: any[], titulo, encabezados: any[], encabezadosWidth: any[], subtitulo: any, pImages1: any, pImages2: any, margeCell1: any , margeCell2: any) {

    //Excel Title, Header, Data
    const title = titulo;
    const header = encabezados;
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(titulo);
  
    // Add Image
    let logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
      // filename: 'Seguridad.jpg',
      // extension: 'jpeg',
    });
    worksheet.addImage(logo, pImages1+':'+pImages2);
      //Add Row and formatting
      let titleRow = worksheet.addRow([title]);
      titleRow.font = { name: 'Arial Black', size: 14, bold: true }
  
    worksheet.mergeCells(margeCell1+':'+margeCell2);
  
   // let subTitleRow = worksheet.addRow(['Vehículos que se encuentran actualmente en el depósito'])
   let subTitleRow = worksheet.addRow([subtitulo])
  //   //Blank Row
    worksheet.addRow([]);
    worksheet.addRow([]);
    //Add Header Row
    let headerRow = worksheet.addRow(header);
    worksheet.getRow(4).alignment = { wrapText: true };
  
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '000000' },
        bgColor: { argb: '000000' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    headerRow.font = { size: 12, bold: true, color: { argb: 'ffffff'} }
    // Add Data and Conditional Formatting
    data.forEach((elemento) => {
      let valorArray = [];
      valorArray = Object.values(elemento);
      worksheet.addRow(valorArray);
    })
  
     
      for (let index = 0; index < encabezadosWidth.length; index++) {
        const element = encabezadosWidth[index];
        console.log('element :>> ', element);
        console.log('index :>> ', index+1);
        worksheet.getColumn(index+1).width = element;
      }
      // encabezadosWidth.forEach(element => {
      //   worksheet.getColumn(element.index).width = element;
      // });
  
      worksheet.addRow([]);
      // //Footer Row
      // let footerRow = worksheet.addRow(['Este es un excel generado por el sistema.']);
      // footerRow.getCell(1).fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: 'FFCCFFE5' }
      // };
      // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // //Merge Cells
      // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
      //Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: EXCEL_TYPE });
        FileSaver.saveAs(blob, titulo + new Date().getTime() + EXCEL_EXTENSION);
      })
    }


    generateExcelFullDoble(data: any[], data2: any[], titulo, encabezados: any[], encabezadosWidth: any[], subtitulo: any,subtitulo2: any, pImages1: any, pImages2: any, margeCell1: any , margeCell2: any) {

      //Excel Title, Header, Data
      const title = titulo;
      const header = encabezados;
      //Create workbook and worksheet
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet(titulo);
    
      // Add Image
      let logo = workbook.addImage({
        base64: logoFile.logoBase64,
        extension: 'png',
        // filename: 'Seguridad.jpg',
        // extension: 'jpeg',
      });
      worksheet.addImage(logo, pImages1+':'+pImages2);
        //Add Row and formatting
        let titleRow = worksheet.addRow([title]);
        titleRow.font = { name: 'Arial Black', size: 14, bold: true }
    
      worksheet.mergeCells(margeCell1+':'+margeCell2);

     
     // let subTitleRow = worksheet.addRow(['Vehículos que se encuentran actualmente en el depósito'])
 
    //   //Blank Row
      worksheet.addRow([]);
      let subTitleRow = worksheet.addRow([subtitulo])
      subTitleRow.font = { name: 'Arial Black', size: 14, bold: true }
      worksheet.mergeCells('A10:N10');
      worksheet.addRow([]);
      //Add Header Row
      let headerRow = worksheet.addRow(header);
      worksheet.getRow(4).alignment = { wrapText: true };
    
      // Cell Style : Fill and Border
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '000000' },
          bgColor: { argb: '000000' }
        }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      })
      headerRow.font = { size: 12, bold: true, color: { argb: 'ffffff'} }
      // Add Data and Conditional Formatting
      data.forEach((elemento) => {
        let valorArray = [];
        valorArray = Object.values(elemento);
        worksheet.addRow(valorArray);
      })
    
      worksheet.addRow([]);
      let subTitleRow2 = worksheet.addRow([subtitulo2])
      subTitleRow2.font = { name: 'Arial Black', size: 14, bold: true }
      worksheet.mergeCells('A21:N21');
      worksheet.addRow([]);

      let headerRow2 = worksheet.addRow(header);
      worksheet.getRow(4).alignment = { wrapText: true };
    
      // Cell Style : Fill and Border
      headerRow2.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '000000' },
          bgColor: { argb: '000000' }
        }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      })
      headerRow2.font = { size: 12, bold: true, color: { argb: 'ffffff'} }

      data2.forEach((elemento) => {
        let valorArray = [];
        valorArray = Object.values(elemento);
        worksheet.addRow(valorArray);
      })
        for (let index = 0; index < encabezadosWidth.length; index++) {
          const element = encabezadosWidth[index];
          console.log('element :>> ', element);
          console.log('index :>> ', index+1);
          worksheet.getColumn(index+1).width = element;
        }
        // encabezadosWidth.forEach(element => {
        //   worksheet.getColumn(element.index).width = element;
        // });
    
        worksheet.addRow([]);
        // //Footer Row
        // let footerRow = worksheet.addRow(['Este es un excel generado por el sistema.']);
        // footerRow.getCell(1).fill = {
        //   type: 'pattern',
        //   pattern: 'solid',
        //   fgColor: { argb: 'FFCCFFE5' }
        // };
        // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        // //Merge Cells
        // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
        //Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: EXCEL_TYPE });
          FileSaver.saveAs(blob, titulo + new Date().getTime() + EXCEL_EXTENSION);
        })
      }
}
