import { Component, OnInit } from '@angular/core';
import { SampleService } from '../../samples/sample.service';

declare let jsPDF: any;

// function for aligning the text in each pdf.textEx( add text with placement settings )
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
	private xyArray_inches: Array<object>;

	constructor(private _sampleServices: SampleService) {
	}

	ngOnInit() {		
		this.labelAliquots = [];
		this.labelSkips = 0;
		this.xyArray_inches = this.loadArray();
		// when they click 'createLabelPDF' from Samples, the label parts ([0] is spacesToSkip, [1] is this.aliquotLabelTextArray)
		// are stored in the sample.service.ts and subscribed to from here 
		this._sampleServices.LabelParts.subscribe(lp => {			
			this.labelAliquots = [];
			this.labelSkips = lp[0];

			// account for any skipped cells (push in empty objects into labelAliquots)
			let x = 0;
			while (x < this.labelSkips) {
				this.labelAliquots.push({"aliquot_string": "", "collaborator_sample_id": ""});
				x++;
			}
			
			// if include is true, add it to the array for this preview table of labels
			lp[1].forEach(label => {
				if (label.include)
					this.labelAliquots.push(label);
			});

			// for testing purposes only
			// this.labelAliquots = this.fakeLabelArray();
		});
	} // end ngOnInit()
	
	// print the labels
	public printLabelPDF() {
		let pdf = new jsPDF('p','in','letter');
		pdf.setFontSize(8);
		pdf.setFontType("normal");
		
		//if there are more than 85, need to break it up into 2 pages. if more than 170, need 3 pages
		let page1: Array<any> = []; 
		let page2: Array<any> = []; 
		let page3: Array<any> = [];

		//let clonedAliquots = this.labelAliquots.map(x => Object.assign({}, x));
		if (this.labelAliquots.length > 170) {
			// need to break this up into 85 each (3 separate arrays to build 3 separate pages)
			page1 = this.labelAliquots.slice(0, 85);
			page2 = this.labelAliquots.slice(85, 170);
			page3 = this.labelAliquots.slice(170);
		} else if (this.labelAliquots.length > 85) {
			// need to break this up into 85 each (2 separate arrays to build 2 separate pages)
			page1 = this.labelAliquots.slice(0, 85);
			page2 = this.labelAliquots.slice(85);
		} else {
			// only 1 page
			page1 = this.labelAliquots;
		};

		page1.forEach((aliquot, index) => {
			let labelString = `${aliquot.aliquot_string}\n${aliquot.collaborator_sample_id}`;			
			pdf.textEx(labelString, this.xyArray_inches[index]["x"], this.xyArray_inches[index]["y"], 'center', 'middle');
		});
		if (page2.length > 0) {
			pdf.addPage();
			page2.forEach((aliquot, index) => {
				let labelString = `${aliquot.aliquot_string}\n${aliquot.collaborator_sample_id}`;				
				pdf.textEx(labelString, this.xyArray_inches[index]["x"], this.xyArray_inches[index]["y"], 'center', 'middle');
			});
		};
		if (page3.length > 0) {
			pdf.addPage();
			page3.forEach((aliquot, index) => {
				let labelString = `${aliquot.aliquot_string}\n${aliquot.collaborator_sample_id}`;				
				pdf.textEx(labelString, this.xyArray_inches[index]["x"], this.xyArray_inches[index]["y"], 'center', 'middle');
			});
		};		
		pdf.save("aliquot_labels.pdf");
	}

	// array containing the x,y locations of every label from 1 to 85 going down each column and then starting from top of next
	private loadArray():Array<object>{
		return [
			{x:1.49, y:0.55},
			{x:1.49, y:1.18},
			{x:1.49, y:1.76},
			{x:1.49, y:2.43},
			{x:1.49, y:3.06},
			{x:1.49, y:3.67},
			{x:1.49, y:4.29},
			{x:1.49, y:4.91},
			{x:1.49, y:5.54},
			{x:1.49, y:6.18},
			{x:1.49, y:6.79},
			{x:1.49, y:7.43},
			{x:1.49, y:8.04},
			{x:1.49, y:8.69},
			{x:1.49, y:9.29},
			{x:1.49, y:9.91},
			{x:1.49, y:10.54},

			{x:2.86, y:0.55},
			{x:2.86, y:1.18},
			{x:2.86, y:1.76},
			{x:2.86, y:2.43},
			{x:2.86, y:3.06},
			{x:2.86, y:3.67},
			{x:2.86, y:4.29},
			{x:2.86, y:4.91},
			{x:2.86, y:5.54},
			{x:2.86, y:6.18},
			{x:2.86, y:6.79},
			{x:2.86, y:7.43},
			{x:2.86, y:8.04},
			{x:2.86, y:8.69},
			{x:2.86, y:9.29},
			{x:2.86, y:9.91},
			{x:2.86, y:10.54},
			
			{x:4.30, y:0.55},
			{x:4.30, y:1.18},
			{x:4.30, y:1.76},
			{x:4.30, y:2.43},
			{x:4.30, y:3.06},
			{x:4.30, y:3.67},
			{x:4.30, y:4.29},
			{x:4.30, y:4.91},
			{x:4.30, y:5.54},
			{x:4.30, y:6.18},
			{x:4.30, y:6.79},
			{x:4.30, y:7.43},
			{x:4.30, y:8.04},
			{x:4.30, y:8.69},
			{x:4.30, y:9.29},
			{x:4.30, y:9.91},
			{x:4.30, y:10.54},

			{x:5.73, y:0.55},
			{x:5.73, y:1.18},
			{x:5.73, y:1.76},
			{x:5.73, y:2.43},
			{x:5.73, y:3.06},
			{x:5.73, y:3.67},
			{x:5.73, y:4.29},
			{x:5.73, y:4.91},
			{x:5.73, y:5.54},
			{x:5.73, y:6.18},
			{x:5.73, y:6.79},
			{x:5.73, y:7.43},
			{x:5.73, y:8.04},
			{x:5.73, y:8.69},
			{x:5.73, y:9.29},
			{x:5.73, y:9.91},
			{x:5.73, y:10.54},

			{x:7.10, y:0.55},
			{x:7.10, y:1.18},
			{x:7.10, y:1.76},
			{x:7.10, y:2.43},
			{x:7.10, y:3.06},
			{x:7.10, y:3.67},
			{x:7.10, y:4.29},
			{x:7.10, y:4.91},
			{x:7.10, y:5.54},
			{x:7.10, y:6.18},
			{x:7.10, y:6.79},
			{x:7.10, y:7.43},
			{x:7.10, y:8.04},
			{x:7.10, y:8.69},
			{x:7.10, y:9.29},
			{x:7.10, y:9.91},
			{x:7.10, y:10.54}
		]
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
		while (i < 174) {
			fakeLabelArr.push({"aliquot_string": `test ${i+1}`, "collaborator_sample_id": i+1 });
			i++;
		}			
		return fakeLabelArr;
	}

}
