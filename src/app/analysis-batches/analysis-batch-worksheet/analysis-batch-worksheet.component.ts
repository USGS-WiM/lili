import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

declare let jsPDF: any; // Important
//import * as jsPDF from 'jspdf';
//import * as html2canvas from 'html2canvas';

@Component({
  selector: 'analysis-batch-worksheet',
  templateUrl: './analysis-batch-worksheet.component.html',
  styleUrls: ['./analysis-batch-worksheet.component.scss']
})
export class AnalysisBatchWorksheetComponent implements OnInit {
  @ViewChild('batchWorksheet') pdfWorksheet;
  public worksheetElement: any;
  public nowDate: Date;

  constructor() { }

  ngOnInit() {
    this.worksheetElement = this.pdfWorksheet.nativeElement;
    this.nowDate = new Date();
  }
  public printPDF() {
    let options = {
     pagesplit: true
    };
  /*  html2canvas(this.worksheetElement, <any> {
      onrendered: function(canvas: HTMLCanvasElement) {
        var pdf = new jsPDF('p','pt','a4');    
        var html = canvas.toDataURL("test.pdf"); 
        //pdf.addImage(img, 'PNG', 10, 10, 580, 300);pdf.save('web.pdf');
        pdf.addHTML(canvas, 0,0,options, () => {
          pdf.save("test.pdf");
        })
      }
    });*/
    let pdf = new jsPDF('p', 'pt', 'letter');  
    pdf.internal.scaleFactor = 2.25;
    
    pdf.addHTML(this.worksheetElement, 0, 0, options, () => {
      pdf.save("worksheet.pdf");
    });
  }
}
