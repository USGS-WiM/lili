import { Component, EventEmitter, OnInit } from '@angular/core';
import { Filter, DatagridFilter } from "clarity-angular";

import { ITarget } from '../../targets/target';
import { TargetService } from '../../targets/target.service';

@Component({
  selector: 'target-filter',
  templateUrl: './target-filter.component.html',
  styleUrls: ['./target-filter.component.scss']
})
export class TargetFilter implements OnInit {

  allTargets: ITarget[];
  selectedTarget: number;
  errorMessage: string;

  constructor(private _targetService: TargetService) { }

  ngOnInit() {

    //on init, call getTargets function which subscribes to the TargetService, set results to the allTargets var
    this._targetService.getTargets()
      .subscribe(targets => this.allTargets = targets,
        error => this.errorMessage = <any>error);
  }
  changes: EventEmitter<any> = new EventEmitter<any>(false);

  accepts(fsmc: any) {
    return (this.selectedTarget === fsmc.target);
  }

  isActive(): boolean {
    return ((this.selectedTarget > -1) ? true : false);
  }

  onSelect(value: any) {
    this.selectedTarget = value;
    this.changes.emit(true);
  }

}
