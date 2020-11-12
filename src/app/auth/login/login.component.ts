import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  private Auth: AuthService;
  public credentials = {
    email: '',
    password: ''
  };
  public submitted: Boolean = false;
  public logoUrl: String = '';

  constructor(auth: AuthService, private route: ActivatedRoute) {
    this.logoUrl = this.route.snapshot.data.appConfig.siteLogo;
    this.Auth = auth;
  }

  login(frm: any) {
    this.submitted = true;
    if (frm.invalid) {
      return;
    }

    this.Auth.companiesLogin(this.credentials).then(() => window.location.href = '/')
      .catch(() => alert('Something went wrong, please try again!'));
  }
}
