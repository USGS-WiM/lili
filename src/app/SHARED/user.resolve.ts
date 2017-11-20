import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { IUser } from '../SHARED/user';
import { UserService } from '../SHARED/user.service';

@Injectable()
export class UserResolve implements Resolve<Array<IUser>> {

  constructor(private _userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<IUser>> {
     return this._userService.getUsers();
  }
}