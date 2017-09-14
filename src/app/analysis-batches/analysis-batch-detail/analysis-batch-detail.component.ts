import { Component, OnInit, Input } from '@angular/core';

import { IAnalysisBatchSummary } from '../analysis-batch-summary';
import { IAnalysisBatch } from '../analysis-batch';

import { AnalysisBatchService } from '../analysis-batch.service';

@Component({
  selector: 'analysis-batch-detail',
  templateUrl: './analysis-batch-detail.component.html',
  styleUrls: ['./analysis-batch-detail.component.scss']
})
export class AnalysisBatchDetailComponent implements OnInit {
  @Input() selectedABSummary: IAnalysisBatchSummary;
  
      loading: boolean;
      selectedABDetail: IAnalysisBatch;

  constructor(private _analysisBatchService: AnalysisBatchService) { }

  ngOnInit() {
    this.loading = true;

      this.selectedABDetail = this._analysisBatchService.getAnalysisBatchData(this.selectedABSummary.id);
      console.log(this.selectedABDetail);

  }

}
