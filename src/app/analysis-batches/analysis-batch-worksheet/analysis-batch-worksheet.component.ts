import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { AnalysisBatchService } from '../../analysis-batches/analysis-batch.service';
import { Iabworksheet } from '../../analysis-batches/analysis-batch-worksheet/ab-worksheet';

declare let jsPDF: any; 

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
  public abWorksheet: Iabworksheet;
  constructor(private _batchServices: AnalysisBatchService) {    
   }

  ngOnInit() {
    this.worksheetElement = this.pdfWorksheet.nativeElement;
    this.nowDate = new Date();
    
    this._batchServices.WorksheetObject.subscribe((values) =>{
      this.abWorksheet = values;
      let studyArray = []
      values.studies.forEach(study => {
        studyArray.push(study.name);
      });
      this.abWorksheet.str_studies = studyArray.join(", ");
    });

  }

  public printPDF() {
    let options = {
     pagesplit: true
    };
    let pdf = new jsPDF('l', 'pt', 'a4');  
    pdf.internal.scaleFactor = 1.25;
    pdf.addHTML(this.worksheetElement, 0, 0, options, () => {
      pdf.save("worksheet.pdf");
    });
  }
}
