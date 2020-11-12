import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { DriverService } from '../../driver.service';
import { AuthService } from '../../../shared/services';
import * as _ from 'lodash';

@Component({
  selector: 'driver-create',
  templateUrl: './form.html'
})
export class CreateComponent implements OnInit {

  public isSubmitted = false;
  public isUpdate: Boolean = false;
  public driver: any = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    // city: '',
    // state: '',
    // country: '',
    // zipcode: '',
    companyId: '',
    activated: true,
    emailVerified: true
  };
  public dialCode: any = '+260';
  public phone: any = {
    number: ''
  };
  public dialCodes: any = [];
  public searching: any = false;
  public searchFailed: any = false;
  public company: any;

  // formatter = (x: { name: string, email: string }) => x.name + ' (' + x.email + ')';
  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     tap(() => this.searching = true),
  //     switchMap(term =>
  //       this.companyService.search({ name: term }).then((res) => {
  //         if (res) {
  //           this.searchFailed = false;
  //           this.searching = false;
  //           return res.data.items;
  //         }
  //         this.searchFailed = true;
  //         this.searching = false;
  //         return of([]);
  //       })
  //     )
  //   )

  constructor(
    private router: Router,
    private toasty: ToastyService,
    private driverService: DriverService
  ) { }

  ngOnInit() { }

  inputPhone() {
    this.driver.phoneNumber = `${this.dialCode}${this.phone.number}`;
  }

  selectDial(event) {
    this.dialCode = event;
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Invalid form, please check and try again!');
    }
    if (this.company) {
      this.driver.companyId = this.company._id;
    }
    this.driverService.create(this.driver).then(resp => {
      this.toasty.success('Created successfuly!');
      this.router.navigate(['/drivers']);
    })
      .catch((err) => this.toasty.error(err.data.data.message));
  }
}

@Component({
  selector: 'driver-update',
  templateUrl: './form.html'
})
export class UpdateComponent implements OnInit {

  public isSubmitted = false;
  public driver: any = {};
  public isUpdate: boolean = true;
  public avatarOptions: any = {};
  public dialCode: any = '+260';
  public phone: any = {
    number: ''
  };
  public dialCodes: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toasty: ToastyService,
    private driverService: DriverService,
    private authService: AuthService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.avatarOptions = {
      url: window.appConfig.apiBaseUrl + '/drivers/' + id + '/avatar',
      fileFieldName: 'avatar',
      onFinish: resp => this.driver.avatarUrl = resp.data.url
    };
    this.driverService.findOne(id)
      .then(resp => {
        this.driver = resp.data;
        this.driver.companyName = resp.data.company.name;
        if (resp.data.phoneNumber) {
          this.trackDial(resp.data.phoneNumber);
        }
      });
  }

  ngOnInit() {
    this.dialCodes = this.authService.getDialCodes();
  }

  inputPhone() {
    this.driver.phoneNumber = `${this.dialCode}${this.phone.number}`;
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
      return this.toasty.error('Invalid form, please check and try again!');
    }
    const data = _.pick(this.driver, [
      'name', 'email', 'address', 'phoneNumber',
      // 'city', 'state', 'country',
      'emailVerified', 'activated', 'password'
    ]);
    this.driverService.update(this.driver._id, data).then(resp => {
      this.toasty.success('Updated successfuly!');
    }).catch(() => this.toasty.error('Something went wrong, please check and try again!'));
  }
}
