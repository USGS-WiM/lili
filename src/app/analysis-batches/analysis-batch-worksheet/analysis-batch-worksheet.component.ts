import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnalysisBatchService } from '../../analysis-batches/analysis-batch.service';

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
  public batchId: number;
  public abWorksheet: any;
  constructor(private _router: Router, private _route: ActivatedRoute, private _batchServices: AnalysisBatchService) {    
   }

  ngOnInit() {
    this.worksheetElement = this.pdfWorksheet.nativeElement;
    this.nowDate = new Date();
    this._route.params.subscribe((x)=> {
      this.batchId = x.id;
    });
    this._batchServices.WorksheetObject.subscribe((values) =>{
      this.abWorksheet = values;
      let studyArray = []
      values.studies.forEach(study => {
        studyArray.push(study.name);
      });
      this.abWorksheet.studies = studyArray.join(", ");
    });

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
    let pdf = new jsPDF('p', 'pt', 'a4');  
 /*   pdf.text()*/
    pdf.internal.scaleFactor = 1.25;
    pdf.addHTML(this.worksheetElement, 0, 0, options, () => {
      pdf.save("worksheet.pdf");
    });
  }
}
