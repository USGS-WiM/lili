import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IUser } from '../../SHARED/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/SHARED/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() Users: Array<IUser>;
  public showHideAdd: boolean;
  public showHideEdit: boolean;
  public showHideDelete: boolean;

  public selectedUser: IUser;
  public selectedUserEmail: string;
  public selectedUserUsername: string;
  public selectedUserLastName: string;
  public selectedUserFirstName: string;
  public selectedUserId: number;

  public showUserCreateError: boolean;
  public showUserEditError: boolean;
  public showUserDeleteError: boolean;
  public submitLoading: boolean;
  public showUserDeleteSuccess: boolean;
  public showUserEditSuccess: boolean;
  public showUserCreateSuccess: boolean;
  public errorMessage: string;

  // add Sample form - declare a reactive form with appropriate Sample fields
  addUserForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required)
  });
  // edit Sample form - declare a reactive form
  editUserForm = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required)
  });

  constructor(private _route: ActivatedRoute, private _userService: UserService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.showHideAdd = false; this.showHideEdit = false; this.showHideDelete = false;
    this.showUserCreateError = false; this.showUserEditError = false; this.showUserDeleteError = false;
    this.showUserCreateSuccess = false; this.showUserEditSuccess = false; this.showUserDeleteSuccess = false;
    this.submitLoading = false;
  }

  public showAddModal() {
    this.showHideAdd = !this.showHideAdd;
    // reset these to false in case Add Sample Type is clicked more than once
    this.showUserCreateError = false;
    this.showUserCreateSuccess = false;
  }

  public editUser(selectedUser) {
    this.editUserForm.reset(); // reset here to ensure states are clean (instead of after update complete)
    this.showUserEditSuccess = false; // reset this
    this.showUserEditError = false; // reset this
    this.selectedUserEmail = selectedUser.email;
    this.selectedUserUsername = selectedUser.username;
    this.selectedUserLastName = selectedUser.last_name;
    this.selectedUserFirstName = selectedUser.first_name;
    this.selectedUserId = selectedUser.id;

    this.editUserForm.setValue({
      id: this.selectedUserId,
      first_name: this.selectedUserFirstName,
      last_name: this.selectedUserLastName,
      email: this.selectedUserEmail,
      username: this.selectedUserUsername
    });

    // show the edit Sample Type form if not showing already
    if (this.showHideEdit === false) {
      this.showHideEdit = true;
    }
  }

  private updateUserArray(newItem) {
    let updateItem = this.Users.find(this.findIndexToUpdate, newItem.id);
    let index = this.Users.indexOf(updateItem);
    this.Users[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  // create or edit Filter submit
  public onSubmitUser(formId, formValue) {
    this.showUserCreateError = false;
    this.showUserEditError = false;
    this.submitLoading = true;
    switch (formId) {
      case 'edit':
        // update a record
        this._userService.update(formValue)
          .subscribe(
          (updatedUser) => {
            this.selectedUserFirstName = updatedUser.first_name;
            this.selectedUserLastName = updatedUser.last_name;
            this.selectedUserUsername = updatedUser.username;
            this.selectedUserEmail = updatedUser.email;            
            this.updateUserArray(formValue);
            this.selectedUser = undefined; 
            this.submitLoading = false;
            this.showUserEditSuccess = true;
            this._cdr.detectChanges();
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showUserEditError = true;
          });
        break;
      case 'add':
        // add a record
        this._userService.create(formValue)
          .subscribe(
          (newST) => {
            this.Users.push(newST);
            this.addUserForm.reset();
            this.submitLoading = false;
            this.showUserCreateSuccess = true;
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showUserCreateError = true;
          }
          );
        break;
      default:
      // do something defaulty
    }
  }

  // show delete sample type modal
  public deleteST(selectedUser){
    this.showUserDeleteSuccess = false; //reset this
    this.showUserDeleteError = false; //reset this too
    this.selectedUserLastName = selectedUser.last_name;
    this.selectedUserFirstName = selectedUser.first_name;
    this.selectedUserId = selectedUser.id;
    // show the delete Filter form if not showing already
    if (this.showHideDelete === false) {
      this.showHideDelete = true;
    }    
  }

  public submitDelete(){
    //get the index to be deleted by the id
    let ind: number;
    this.Users.some((pdh, index, _ary) => {
      if (pdh.id === this.selectedUserId) ind = index;
      return pdh.id === this.selectedUserId;
    });
    this._userService.delete(this.selectedUserId)
    .subscribe(
      () => {
      this.selectedUserFirstName = ""; 
      this.selectedUserLastName = "";
      this.Users.splice(ind,1);
      this.selectedUser = undefined;
      this.submitLoading = false;
      this.showUserDeleteSuccess = true;
      this._cdr.detectChanges();
    },
    error => {
      this.errorMessage = <any>error;
      this.submitLoading = false;
      this.showUserDeleteError = true;
    }
    );
  }
}

