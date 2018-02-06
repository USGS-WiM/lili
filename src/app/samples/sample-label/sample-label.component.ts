import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { SampleService } from '../../samples/sample.service';

declare let jsPDF: any;

@Component({
	selector: 'sample-label',
	templateUrl: './sample-label.component.html',
	styleUrls: ['./sample-label.component.scss']
})
export class SampleLabelComponent implements OnInit {
	@ViewChild('labelTable1') labelTable1: ElementRef;
	@ViewChild('labelTable2') labelTable2: ElementRef;
	@ViewChild('labelTable3') labelTable3: ElementRef;
	public labelAliquots: Array<any>;
	private labelSkips: number;
	public labelTable1Rows: any[];
	public labelTable2Rows: any[];
	public labelTable3Rows: any[];

	constructor(private _sampleServices: SampleService) {
	}

	ngOnInit() {		
		this.labelAliquots = [];
		this.labelSkips = 0;
		this.labelTable1Rows =[];
		this.labelTable2Rows =[];
		this.labelTable3Rows =[];

		// when they click 'createLabelPDF' from Samples, the label parts are stored in the sample.service.ts and subscribed to from here
		this._sampleServices.LabelParts.subscribe(lp => {
			this.labelAliquots = [];
			this.labelSkips = lp[0];

			// account for any skipped cells
	/*		let x = 0;
			while (x < this.labelSkips) {
				this.labelAliquots.push({"aliquot_string": "", "collaborator_sample_id": ""});
				x++;
			}
			
			// if include is ture, add it to the array for this preview table of labels
			lp[1].forEach(element => {
				if (element.include)
					this.labelAliquots.push(element);
			});*/
			this.labelAliquots = this.fakeLabelArray();
		});
	}
	
	// print the labels
	public printLabelPDF() { //'p', 'pt', 'a4', true
		let pdf = new jsPDF('p','in','letter');
		pdf.setFontSize(8);
		pdf.setFontType("normal");
		
		this.labelTable1Rows = this.tableToJson(this.labelTable1.nativeElement);
		this.labelTable1Rows.forEach((r, i) => {
			r['index'] = i + 1;
		});
		let Columns = ["","","","",""];
		pdf.autoTable(Columns, this.labelTable1Rows, {
			startY: 0.24,
			margin: [0.6, 0.6, .1, 0.6], //[top, right, bottom, left]
			theme: 'plain',
			drawHeaderRow:  function() {return false;},
			styles: {
				halign: 'center', valign: 'middle', cellPadding: 0.153
			},
			columnStyles: {
				0: { columnWidth: 1.43 },
				1: { columnWidth: 1.43 },
				2: { columnWidth: 1.43 },
				3: { columnWidth: 1.43 },
				4: { columnWidth: 1.43 }
			}		
		});
		// if second table is populated
		if (this.labelTable2) {
			pdf.addPage();
			this.labelTable2Rows = this.tableToJson(this.labelTable2.nativeElement);
			this.labelTable2Rows.forEach((r, i) => {
				r['index'] = i + 1;
			});
			let Columns2 = ["","","","",""];
			pdf.autoTable(Columns2, this.labelTable2Rows, {
				startY: 0.24,
				margin: [0.6, 0.6, .1, 0.6], //[top, right, bottom, left]
				theme: 'plain',
				drawHeaderRow:  function() {return false;},
				styles: {
					halign: 'center', valign: 'middle', cellPadding: 0.153
				},
				columnStyles: {
					0: { columnWidth: 1.43 },
					1: { columnWidth: 1.43 },
					2: { columnWidth: 1.43 },
					3: { columnWidth: 1.43 },
					4: { columnWidth: 1.43 }
				}		
			});
		}
		// if third table is populated
		if (this.labelTable3) {
			pdf.addPage();
			this.labelTable3Rows = this.tableToJson(this.labelTable3.nativeElement);
			this.labelTable3Rows.forEach((r, i) => {
				r['index'] = i + 1;
			});
			let Columns3 = ["","","","",""];
			pdf.autoTable(Columns3, this.labelTable3Rows, {
				startY: 0.24,
				margin: [0.6, 0.6, .1, 0.6], //[top, right, bottom, left]
				theme: 'plain',
				drawHeaderRow:  function() {return false;},
				styles: {
					halign: 'center', valign: 'middle', cellPadding: 0.153
				},
				columnStyles: {
					0: { columnWidth: 1.43 },
					1: { columnWidth: 1.43 },
					2: { columnWidth: 1.43 },
					3: { columnWidth: 1.43 },
					4: { columnWidth: 1.43 }
				}		
			});
		}
		pdf.save("aliquot_labels.pdf");
	}

	// convert table element to json for the .autoTable()
	private tableToJson(table) {
		let data = [];

		// go through cells
		for (let i = 0; i < table.rows.length; i++) {
			let tableRow = table.rows[i];
			let rowData = {};
			for (let j = 0; j < tableRow.cells.length; j++) {
				rowData[j] = tableRow.cells[j].innerText;
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
		while (i < 255) {
			fakeLabelArr.push({"aliquot_string": `test ${i+1}`, "collaborator_sample_id": i+1 });
			i++;
		}			
		return fakeLabelArr;
	}

}
