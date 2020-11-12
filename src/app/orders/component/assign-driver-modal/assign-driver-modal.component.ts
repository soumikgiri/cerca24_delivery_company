import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../order.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService } from 'ng2-toasty';
import { DriverService } from '../../../driver/driver.service';
import * as _ from 'lodash';

@Component({
  selector: 'assign-driver-modal',
  templateUrl: './assign-driver.html'
})
export class AssignDriverModalComponent implements OnInit {
  @Input() orderAssign: any;
  public drivers: any = [];
  public page: number = 1;
  public isloading: boolean = false;
  public totalDriver: number = 0;
  public params: any = {
    driverId: '',
    orderDetailIds: [],
    orderTrackingCode: []
  }
  public submitted: boolean = false;

  constructor(
    private orderService: OrderService,
    public activeModal: NgbActiveModal,
    private toasty: ToastyService,
    private driverService: DriverService
  ) { }

  ngOnInit() {
    this.getDriver(1);
    if (this.orderAssign.length) {
      this.orderAssign.filter(i => {
        this.params.orderTrackingCode.push(i.trackingCode);
        this.params.orderDetailIds.push(i._id);
      });
    }
  }

  getDriver(page: number) {
    this.isloading = true;
    this.driverService.search({
      page: page,
      take: 10
    }).then(resp => {
      this.drivers = this.drivers.concat(resp.data.items);
      this.totalDriver = resp.data.count;
      this.drivers.map(i => i.name = i.firstName + " " + i.lastName)
      this.isloading = false;
    })
  }

  onScrollToEnd() {
    if (this.drivers.length !== this.totalDriver) {
      this.page++;
      this.getDriver(this.page);
    } else return;
  }

  submit(frm: any) {
    this.submitted = true;
    if (!this.params.driverId) {
      return this.toasty.error('Please select a driver for these orders!')
    }

    let data = _.pick(this.params, ['driverId', 'orderDetailIds']);
    if (window.confirm("Are you sure assign driver for these orders?")) {
      this.orderService.assignDriverMultiple(data)
        .then(resp => {
          this.toasty.success('Assign successfully!');
          this.activeModal.close(resp.data);
        })
        .catch(() => this.toasty.error('Something went wrong, please try again!'));
    }
  }
}
