import { Component, OnInit, Input } from '@angular/core';

import { IAnalysisBatch } from '../analysis-batch';

import { AnalysisBatchService } from '../analysis-batch.service';

@Component({
  selector: 'analysis-batch-detail',
  templateUrl: './analysis-batch-detail.component.html',
  styleUrls: ['./analysis-batch-detail.component.scss']
})
export class AnalysisBatchDetailComponent implements OnInit {
  @Input() selectedAnalysisBatch: IAnalysisBatch;
  
      loading: boolean;

  constructor() { }

  ngOnInit() {
    this.loading = false;
  }

}
