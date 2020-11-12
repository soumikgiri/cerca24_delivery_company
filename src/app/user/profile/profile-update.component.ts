import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from '../../shared/services';
import * as _ from 'lodash';

@Component({
  selector: 'profile-update',
  templateUrl: './form.html'
})
export class ProfileUpdateComponent implements OnInit {
  public info: any = {};
  public avatarUrl = '';
  public isSubmitted = false;
  public avatarOptions: any = {};
  private userId: string;
  public dialCode: any = '+260';
  public phone: any = {
    number: ''
  };
  public dialCodes: any = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.info = route.snapshot.data.company;
    if (this.info.logo) {
      this.avatarUrl = this.info.logo;
    }
  }

  ngOnInit() {
    this.dialCodes = this.authService.getDialCodes();
    if (this.info.phoneNumber) {
      this.trackDial(this.info.phoneNumber);
    }
    this.avatarOptions = {
      url: window.appConfig.apiBaseUrl + '/companies/logo',
      fileFieldName: 'logo',
      onFinish: (resp) => {
        this.avatarUrl = resp.data.url;
      }
    };
  }

  inputPhone() {
    this.info.phoneNumber = `${this.dialCode}${this.phone.number}`;
  }

  selectDial(event) {
    this.dialCode = event;
  }

  trackDial(string: any) {
    const validDials = this.dialCodes.filter(d => d.dialCode);
    validDials.forEach(d => {
      const i = string.indexOf(d.dialCode);
      if (i > -1) {
        const p = string.split(d.dialCode);
        this.dialCode = d.dialCode;
        this.phone.number = p[1];
      }
    });
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Something went wrong, please check and try again!');
    }

    const data = _.pick(this.info, ['address', 'phoneNumber', 'password', 'name', 'logoId']);
    this.userService.updateMe(data).then(resp => {
      this.toasty.success('Updated successfuly!');
    }).catch((err) => this.toasty.error(err.data.data.message || err.data.data.email));
  }
}
