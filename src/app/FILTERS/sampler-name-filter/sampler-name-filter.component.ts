import { Component, EventEmitter, OnInit } from '@angular/core';
import {Filter, DatagridFilter} from "clarity-angular";

import {IUser} from '../../SHARED/user'
import { UserService } from '../../SHARED/user.service';

@Component({
  selector: 'sampler-name-filter',
  templateUrl: './sampler-name-filter.component.html',
  styleUrls: ['./sampler-name-filter.component.scss']
})
export class SamplerNameFilter implements OnInit, Filter<any> {
  allUsers: IUser[];
  private selectedUser: number;
  private errorMessage: string;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
        //on init, call getUsers function which subscribes to the UserService, set results to the allUsers var
        this._userService.getUsers()
            .subscribe(users => this.allUsers = users,
                error => this.errorMessage = < any > error);
    }

  changes: EventEmitter<any> = new EventEmitter<any>(false);
  
  accepts(sample: any){
      return (this.selectedUser === sample.sampler_name);
  }

  isActive():boolean {
      return ((this.selectedUser > -1) ? true : false);
  }

  onSelect(value: any){
    console.log("Sample type has been selected");
    this.selectedUser = value;
    this.changes.emit(true); 
  }
}
