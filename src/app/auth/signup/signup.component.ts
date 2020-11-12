import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, LocationService } from '../../shared/services';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  templateUrl: 'signup.component.html'
})
export class SignupComponent implements OnInit {
  public dialCode: any = '+260';
  public phone: any = {
    number: ''
  };
  Auth: AuthService;
  public account: any = {
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    address: '',
    verificationIssueId: '',
    country: 'Zambia',
    city: 'Chadiza',
    zipcode: '',
    state: ''
  };
  public issueDocument: any;
  public cities: any = [];
  public citySelected: any = {
    areas: []
  };
  public submitted: Boolean = false;
  public issueOptions: any;
  public logoUrl: String = '';

  constructor(
    auth: AuthService,
    public router: Router,
    private toasty: ToastyService,
    private locationService: LocationService,
    private route: ActivatedRoute) {
    this.logoUrl = this.route.snapshot.data.appConfig.siteLogo;
    this.Auth = auth;
  }
  ngOnInit() {
    this.cities = this.locationService.getCitiesZambia();
    this.issueOptions = {
      url: window.appConfig.apiBaseUrl + '/companies/register/document',
      onFinish: resp => this.issueDocument = resp.data
    };
  }

  public submit(frm: any) {
    this.submitted = true;
    if (frm.invalid) {
      return this.toasty.error('Form is invalid.');
    }
    // if (!this.account.verificationIssueId) {
    //   return this.toasty.error('Please upload the issue document.');
    // }
    if (this.issueDocument) {
      this.account.verificationIssueId = this.issueDocument._id;
    } else return this.toasty.error('Please upload the issue document.')
    this.Auth.companiesRegister(this.account)
      .then(resp => {
        this.toasty.success('Your account has been created, please check you email to verify.');
        this.router.navigate(['/auth/login']);
      })
      .catch(err => this.toasty.error(err.data.message || 'Something went wrong, please check and try again'));
  }
  public selectDial(event) {
    this.dialCode = event;
  }

  inputPhone() {
    this.account.phoneNumber = `${this.dialCode}${this.phone.number}`;
  }

  public cityChange(city: any) {
    this.citySelected = _.find(this.cities, { 'name': city });
  }
}
