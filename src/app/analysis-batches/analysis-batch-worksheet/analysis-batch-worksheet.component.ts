import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { AnalysisBatchService } from '../../analysis-batches/analysis-batch.service';
import { Iabworksheet } from '../../analysis-batches/analysis-batch-worksheet/ab-worksheet';

declare let jsPDF: any;
//declare let html2pdf: any;

var splitRegex = /\r\n|\r|\n/g;
jsPDF.API.textEx = function (text: any, x: number, y: number, hAlign?: string, vAlign?: string) {
    var fontSize = this.internal.getFontSize()
        / this.internal.scaleFactor;

    // As defined in jsPDF source code
    var lineHeightProportion = 1.15;

    var splittedText: string[];
    var lineCount: number = 1;
    if (vAlign === 'middle' || vAlign === 'bottom'
        || hAlign === 'center' || hAlign === 'right') {

        splittedText = typeof text === 'string'
        ? text.split(splitRegex)
        : text;

        lineCount = splittedText.length || 1;
    }

    // Align the top
    y += fontSize * (2 - lineHeightProportion);

    if (vAlign === 'middle') y -= (lineCount / 2) * fontSize;
    else if (vAlign === 'bottom') y -= lineCount * fontSize;


    if (hAlign === 'center'
        || hAlign === 'right') {

        var alignSize = fontSize;
        if (hAlign === 'center') alignSize *= 0.5;

        if (lineCount > 1) {
            for (var iLine = 0; iLine < splittedText.length; iLine++) {
                this.text(splittedText[iLine],
                    x - this.getStringUnitWidth(splittedText[iLine]) * alignSize,
                    y);
                y += fontSize;
            }
            return this;
        }
        x -= this.getStringUnitWidth(text) * alignSize;
    }

    this.text(text, x, y);
    return this;
};

@Component({
	selector: 'analysis-batch-worksheet',
	templateUrl: './analysis-batch-worksheet.component.html',
	styleUrls: ['./analysis-batch-worksheet.component.scss']
})
export class AnalysisBatchWorksheetComponent implements OnInit {

	@ViewChild('batchWorksheet') pdfWorksheet;
	@ViewChild('sampleTable') sampleTable: ElementRef;
	@ViewChild('targetTable') targetTable: ElementRef;

	public worksheetElement: any;
	public nowDate: Date;
	public batchId: number;
	public abWorksheet: Iabworksheet;
	constructor(private _batchServices: AnalysisBatchService) {
	}

	ngOnInit() {
		this.worksheetElement = this.pdfWorksheet.nativeElement;
		this.nowDate = new Date();

		this._batchServices.WorksheetObject.subscribe((values) => {
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

		let pdf = new jsPDF('p', 'pt', 'a4', true);
		/*pdf.internal.scaleFactor = 1.25;
		pdf.addHTML(this.worksheetElement, 0, 0, options, () => {
		  pdf.save("worksheet.pdf");
		});*/
		pdf.setFontSize(8);
		pdf.setFontType("normal");
		pdf.text(10, 20, new Date().toLocaleDateString());

		pdf.setFontSize(10);
		pdf.setFontType("bold");
		if (this.abWorksheet.isReprint) {
			pdf.text(200, 20, 'Analysis Batch Worksheet Reprint');
		} else {
			pdf.text(200, 20, 'Analysis Batch Worksheet');
		}
		pdf.setFontSize(8);
		pdf.setFontType("normal");
		// .textEx(string, over, down, )
		// Top left Table /////////////////////////////
		pdf.textEx('Analysis Batch:', 70, 50, 'right', 'middle'); 
		pdf.textEx(this.abWorksheet.analysis_batch.toString(), 75, 50, 'left', 'middle');

		pdf.textEx('Creation Date:', 70, 60, 'right', 'middle');
		pdf.textEx(this.abWorksheet.creation_date, 75, 60, 'left', 'middle');
		
		let studySplit = pdf.splitTextToSize(this.abWorksheet.str_studies, 160);
		let studyRows = studySplit.length;

		if (studyRows > 1){
			pdf.textEx('Studies:', 70, 70, 'right', 'middle');
			pdf.text(75, 72, studySplit);

			pdf.textEx('Description:', 70, 85+studyRows, 'right', 'middle');
			pdf.textEx(this.abWorksheet.description, 75, 85+studyRows, 'left', 'middle');
		} else {
			pdf.textEx('Studies:', 70, 70, 'right', 'middle');
			pdf.textEx(studySplit[0], 75, 70, 'left', 'middle');

			pdf.textEx('Description:', 70, 80, 'right', 'middle');
			pdf.textEx(this.abWorksheet.description, 75, 80, 'left', 'middle');
		}
		// END Top left Table /////////////////////////////

		// Top right Table /////////////////////////////
		pdf.textEx('Extraction No.:', 380, 50, 'right', 'middle'); 
		pdf.textEx(this.abWorksheet.extraction_no.toString(), 385, 50, 'left', 'middle');

		pdf.textEx('Extraction date:', 380, 60, 'right', 'middle');
		pdf.textEx(this.abWorksheet.extraction_date, 385, 60, 'left', 'middle');
		pdf.textEx('Extraction sample volume:', 540, 60, 'right', 'middle');
		pdf.textEx(this.abWorksheet.extraction_sample_volume.toString(), 545, 60, 'left', 'middle');

		pdf.textEx('Extraction method:', 380, 70, 'right', 'middle');
		pdf.textEx(this.abWorksheet.extraction_method["name"], 385, 70, 'left', 'middle');
		pdf.textEx('Eluted extracted volume:', 540, 70, 'right', 'middle');
		pdf.textEx(this.abWorksheet.eluted_extraction_volume.toString(), 545, 70, 'left', 'middle');
		// END Top right Table /////////////////////////////


	/*	let specialElementHandlers = {
			'#bypassme': (element, renderer) => {
				return true;
			}
		}*/
		// Sample middle Table /////////////////////////////
		let SampleColumns = [ 
			{title: "Index", dataKey: "index"}, 
			{title: "Sample (LIMS ID-aliquot #)", dataKey: "Sample (LIMS ID-aliquot #)"}, 
			{title: "Rack", dataKey: "Rack"}, 
			{title: "Box", dataKey: "Box"}, 
			{title: "Row", dataKey: "Row"}, 
			{title: "Spot", dataKey: "Spot"}, 
			{title: "Inhibition", dataKey: "Inhibition"}
		];
		let SampleRows = this.tableToJson(this.sampleTable.nativeElement);
		SampleRows.forEach((r, i) => {
			r['index'] = i+1;
		});
		if (this.abWorksheet.isReprint) {
			pdf.text("This is a reprint. Aliquot listed is first aliquot of sample.", 20, 115);
		}
		pdf.autoTable(SampleColumns, SampleRows, {
			startY: 120, 
			margin: 20,
			theme: 'grid', 
			tableWidth: 300,
			headerStyles: {
				fillColor:[211,211,211], 
				fontSize: 8, 
				textColor: [0,0,0]
			},
			columnStyles: {
				1: {columnWidth: 10},
				2: {columnWidth: 120},
				3: {columnWidth: 30},
				4: {columnWidth: 30},
				5: {columnWidth: 30},
				6: {columnWidth: 30},
				7: {columnWidth: 30}
			}
		});
		// END Sample middle Table //////////////////////////////////
		
		// Target middle Table /////////////////////////////
		let TargetColumns = [ 
			{title: "Target", dataKey: "Target"}, 
			{title: "Date", dataKey: "Date"}, 
			{title: "Positive Cq", dataKey: "Positive Cq"}, 
			{title: "Detections", dataKey: "Detections"}
		];
		let TargetRows = this.tableToJson(this.targetTable.nativeElement);
		
		pdf.autoTable(TargetColumns, TargetRows, {
			startY: 120, 
			margin: 340,
			theme: 'grid', 
			tableWidth: 240,
			headerStyles: {
				fillColor:[211,211,211], 
				fontSize: 8, 
				textColor: [0,0,0]
			},
			columnStyles: {
				1: {columnWidth: 40},
				2: {columnWidth: 40},
				3: {columnWidth: 120},
				4: {columnWidth: 80}
			}
		});
		// END Target middle Table //////////////////////////////////
		

		pdf.save("worksheet.pdf");
	}

	private tableToJson(table) {
		var data = [];

		// first row needs to be headers
		var headers = [];
		for (var i = 0; i < table.rows[0].cells.length; i++) {
			headers[i] = table.rows[0].cells[i].innerHTML;
		}

		// go through cells
		for (var i = 1; i < table.rows.length; i++) {

			var tableRow = table.rows[i];
			var rowData = {};

			for (var j = 0; j < tableRow.cells.length; j++) {

				rowData[headers[j]] = tableRow.cells[j].innerHTML;

			}

			data.push(rowData);
		}

		return data;
	}
	
}
