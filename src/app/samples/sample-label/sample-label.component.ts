import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { SampleService } from '../../samples/sample.service';

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
	public labelAliquots: Array<any>;
	private labelSkips: number;

	constructor(private _sampleServices: SampleService) {
	}

	ngOnInit() {		
		this.labelAliquots = [];
		this.labelSkips = 0;
		this._sampleServices.LabelParts.subscribe(lp => {
			this.labelAliquots = [];
			this.labelSkips = lp[0];
			let x = 0;
			while (x < this.labelSkips) {
				this.labelAliquots.push({"aliquot_string": "", "collaborator_sample_id": ""});
				x++;
			}
/*			this.labelAliquots = this.fakeLabelArray();*/
			lp[1].forEach(element => {
				if (element.include)
					this.labelAliquots.push(element);
			});
		});
	}
	
	public printLabelPDF() {
		let pdf = new jsPDF('p', 'pt', 'a4', true);		
		pdf.setFontSize(8);
		pdf.setFontType("normal");
		// depending on where we start (labelSkips = number of labels down to skip)
		/*pdf.text(10, 20, new Date().toLocaleDateString());

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
	private fakeLabelArray(): Array<any> {		
		let fakeLabelArr: Array<any> = [];
		let x = 0;
		while (x < this.labelSkips) {
			fakeLabelArr.push({"aliquot_string": "", "collaborator_sample_id": ""});
			x++;
		}
		let i = 0;
		while (i < 85) {
			fakeLabelArr.push({"aliquot_string": `test ${i+1}`, "collaborator_sample_id": i+1 });
			i++;
		}
			
		return fakeLabelArr;
	}

}
