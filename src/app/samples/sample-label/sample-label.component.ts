import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { AnalysisBatchService } from '../../analysis-batches/analysis-batch.service';
import { Iabworksheet } from '../../analysis-batches/analysis-batch-worksheet/ab-worksheet';
import { fakeAsync } from '@angular/core/testing';

declare let jsPDF: any;
//declare let html2pdf: any;

// used for right-aligning the text added to pdf
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
	selector: 'sample-label',
	templateUrl: './sample-label.component.html',
	styleUrls: ['./sample-label.component.scss']
})
export class SampleLabelComponent implements OnInit {
	public worksheetElement: any;
	public abWorksheet: Iabworksheet;
	private headerStyle: Object;
	public sampleColumns: Object[];
	public sampleRows: any[];
	public targetColumns: Object[];
	public targetRows: any[];
	private sampleEndingY: number; //used to track starting position after dynamic table is added
	private targetEndingY: number; //used to track starting position after dynamic table is added

	constructor(private _batchServices: AnalysisBatchService) {
	}

	ngOnInit() {		
	}
	
	public printPDF() {		
		/*let pdf = new jsPDF('p', 'pt', 'a4', true);		
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
		pdf.setFontType("bold");

		// .textEx(string, over, down, )
		// Top left Table /////////////////////////////
		pdf.textEx('Analysis batch:', 70, 50, 'right', 'middle');
		pdf.setFontType("normal");
		pdf.textEx(this.abWorksheet.analysis_batch.toString(), 75, 50, 'left', 'middle');
		pdf.setFontType("bold");
		pdf.textEx('Creation date:', 70, 60, 'right', 'middle');
		pdf.setFontType("normal");
		pdf.textEx(this.abWorksheet.creation_date, 75, 60, 'left', 'middle');

		// split the studies comma separated string in case too long.
		let studySplit = pdf.splitTextToSize(this.abWorksheet.str_studies, 240);
		let studyRows = studySplit.length;

		if (studyRows > 1) {
			// multiple rows, bump down more
			pdf.setFontType("bold");
			pdf.textEx('Studies:', 70, 70, 'right', 'middle');
			pdf.setFontType("normal");
			pdf.text(75, 72, studySplit);

			pdf.setFontType("bold");
			pdf.textEx('Description:', 70, 85 + studyRows, 'right', 'middle');
			pdf.setFontType("normal");
			pdf.textEx(this.abWorksheet.description, 75, 85 + studyRows, 'left', 'middle');
		} else {
			// only 1 row, proceed as normal
			pdf.setFontType("bold");
			pdf.textEx('Studies:', 70, 70, 'right', 'middle');
			pdf.setFontType("normal");
			pdf.textEx(studySplit[0], 75, 70, 'left', 'middle');

			pdf.setFontType("bold");
			pdf.textEx('Description:', 70, 80, 'right', 'middle');
			pdf.setFontType("normal");
			pdf.textEx(this.abWorksheet.description, 75, 80, 'left', 'middle');
		}
		// END Top left Table /////////////////////////////

		// Top right Table /////////////////////////////
		pdf.setFontType("bold");
		pdf.textEx('Extraction No.:', 405, 50, 'right', 'middle');
		pdf.setFontType("normal");
		pdf.textEx(this.abWorksheet.extraction_no.toString(), 410, 50, 'left', 'middle');

		pdf.setFontType("bold");
		pdf.textEx('Extraction date:', 405, 60, 'right', 'middle');
		pdf.setFontType("normal");
		pdf.textEx(this.abWorksheet.extraction_date, 410, 60, 'left', 'middle');
		pdf.setFontType("bold");
		pdf.textEx('Extraction sample volume:', 560, 60, 'right', 'middle');
		pdf.setFontType("normal");
		pdf.textEx(this.abWorksheet.extraction_sample_volume.toString(), 565, 60, 'left', 'middle');

		pdf.setFontType("bold");
		pdf.textEx('Extraction method:', 405, 70, 'right', 'middle');
		pdf.setFontType("normal");
		pdf.textEx(this.abWorksheet.extraction_method["name"], 410, 70, 'left', 'middle');
		pdf.setFontType("bold");
		pdf.textEx('Eluted extracted volume:', 560, 70, 'right', 'middle');
		pdf.setFontType("normal");
		pdf.textEx(this.abWorksheet.eluted_extraction_volume.toString(), 565, 70, 'left', 'middle');
		// END Top right Table /////////////////////////////
	
		// Sample middle Table /////////////////////////////
		this.sampleRows = this.tableToJson(this.sampleTable.nativeElement);
		
		this.sampleRows.forEach((r, i) => {
			r['index'] = i + 1;
		});
		if (this.abWorksheet.isReprint) {
			pdf.text("This is a reprint. Aliquot listed is first aliquot of sample.", 20, 115);
		}
		pdf.autoTable(this.sampleColumns, this.sampleRows, {
			startY: 120,
			margin: 10,
			theme: 'grid',
			tableWidth: 315,
			headerStyles: this.headerStyle
		
		});
		pdf.text('Ext Neg:', 20 ,pdf.autoTable.previous.finalY + 10);
		pdf.text('Ext Pos:', 20 ,pdf.autoTable.previous.finalY + 20);
		this.sampleEndingY = pdf.autoTable.previous.finalY+20;
		// END Sample middle Table //////////////////////////////////

		// Target middle Table /////////////////////////////
		this.targetRows = this.tableToJson(this.targetTable.nativeElement);
		
		pdf.autoTable(this.targetColumns, this.targetRows, {			
			startY: 120,
			margin: {left: 338},
			theme: 'grid',
			tableWidth: 245,
			headerStyles: this.headerStyle,
			columnStyles: {
				Target: { columnWidth: 70 },
				Date: { columnWidth: 60 },
				'Positive ID': { columnWidth: 42 },
				Cq: { columnWidth: 24 },
				Detections: { columnWidth: 51 }
			}
		});
		this.targetEndingY = pdf.autoTable.previous.finalY+20;
		// END Target middle Table //////////////////////////////////

		// Lower section //////////////////////////////////////
		let nextNewStartingY = 0;
		// which table is longer, need this info to go under both middle tables
		if (this.targetEndingY > this.sampleEndingY) {
			nextNewStartingY = this.targetEndingY;
		} else {
			nextNewStartingY = this.sampleEndingY;
		}
		
		pdf.textEx('Reverse transcription No.:', 110, nextNewStartingY + 20, 'right', 'middle');
		pdf.textEx(this.abWorksheet.reverse_extraction_no.toString(), 115, nextNewStartingY + 20, 'left', 'middle');

		pdf.textEx('RT reaction volume:', 110, nextNewStartingY + 30, 'right', 'middle');
		pdf.textEx(this.abWorksheet.rt_reaction_volume.toString(), 115, nextNewStartingY + 30, 'left', 'middle');

		/*pdf.textEx('qPCR replicates:', 110, nextNewStartingY + 40, 'right', 'middle');
		pdf.textEx('---', 115, nextNewStartingY + 40, 'left', 'middle');*

		pdf.text('Notes:', 20, nextNewStartingY + 70);
		pdf.line(15, nextNewStartingY + 75, 580, nextNewStartingY + 75);
				
		pdf.save("worksheet.pdf");*/
	}

	// convert table element to json for the .autoTable()
	private tableToJson(table) {
		let data = [];

		// first row needs to be headers
		let headers = [];
		for (let i = 0; i < table.rows[0].cells.length; i++) {
			headers[i] = table.rows[0].cells[i].innerHTML;
		}

		// go through cells
		for (let i = 1; i < table.rows.length; i++) {
			let tableRow = table.rows[i];
			let rowData = {};
			for (let j = 0; j < tableRow.cells.length; j++) {
				rowData[headers[j]] = tableRow.cells[j].innerHTML;
			}
			data.push(rowData);
		}
		return data;
	}

	// for testing only
	private fakeObject(): Iabworksheet {
		let fakeObj: Iabworksheet = {
			analysis_batch: 14,
			creation_date: "2017-11-03",
			description: "test AB",
			eluted_extraction_volume: 4000,
			extraction_date: "2017-12-27",
			extraction_method: { id: 1, name: "Manual" },
			extraction_no: 12,
			extraction_sample_volume: 5000,
			extraction_submission: [
				{ aliquot_string: "7-1", box: 1, rack: 1, row: 1, sample: 7, spot: 5 },// 1
				{ aliquot_string: "7-1", box: 1, rack: 1, row: 1, sample: 7, spot: 5 },// 2
				{aliquot_string:"7-1", box:1, rack:1, row:1, sample:7, spot:5},// 3
				{aliquot_string:"7-1", box:1, rack:1, row:1, sample:7, spot:5},// 4
				{aliquot_string:"7-1", box:1, rack:1, row:1, sample:7, spot:5},// 5
			/*	{aliquot_string:"7-1", box:1, rack:1, row:1, sample:7, spot:5},// 6
				{aliquot_string:"7-1", box:1, rack:1, row:1, sample:7, spot:5},// 7 
				{aliquot_string:"7-1", box:1, rack:1, row:1, sample:7, spot:5},// 8
				{aliquot_string:"7-1", box:1, rack:1, row:1, sample:7, spot:5},// 9 
				{aliquot_string:"7-1", box:1, rack:1, row:1, sample:7, spot:5},// 10 
				{aliquot_string:"7-1", box:1, rack:1, row:1, sample:7, spot:5},// 11
				{aliquot_string:"7-1", box:1, rack:1, row:1, sample:7, spot:5}*/// 12
			],
			isReprint: true,
			reverse_extraction_no: 12,
			rt_date: "",
			rt_reaction_volume: "20",
			studies: [
				{ id: 4, description: "Minnesota urban runoff study test", name: "Minnesota urban runoff study" },
				{ id: 3, description: "With MDH and U of MN.  First samples Oct 2016", name: "MDH Storm Water Irrigation" }
			],
			targetNames: [
				"Enterovirus", //1
				"G1 Norovirus", //2
				"A", //3
				"AA",//4
				"E",//5
				"G1",//6
				"G2",//7
				"HP",//8
				"PV",//9
				"RVA",//10
				"S",//11
				"TTR",//12
				"A", //13
				"AA",//14
				"E",//15
				"G1",//16
				"G2",//17
				"HP"//18
			/*	"PV",//19
				"RVA"//20*/
			]
		}
		return fakeObj;
	}

}
