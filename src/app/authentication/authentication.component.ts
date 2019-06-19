import { Component, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  loginForm: FormGroup;
  authenticationErrorFlag: boolean = false;

  constructor(formBuilder: FormBuilder, public authenticationService: AuthenticationService, public router: Router) {

    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  onSubmit(formValue: any) {
    if (sessionStorage.getItem('username')) {
      this.authenticationService.logout();
    }

    this.authenticationService.login(formValue.username, formValue.password)
      .subscribe(
        (user: any) => {
          this.router.navigateByUrl('home')
        },
        (error) => {
          this.authenticationErrorFlag = true;
        }
      );
  }

  onLogout() {
    this.authenticationService.logout();
  }


}
