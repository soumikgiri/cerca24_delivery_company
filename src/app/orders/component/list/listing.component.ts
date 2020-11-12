import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { OrderService } from '../../order.service';
import { AuthService, LocationService } from '../../../shared/services';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AssignDriverModalComponent } from '../assign-driver-modal/assign-driver-modal.component';
import * as moment from 'moment-timezone';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-orders-listing',
  templateUrl: './listing.html'
})
export class OrderListingComponent implements OnInit {

  public orders: Array<any> = [];
  public page: Number = 1;
  public total: Number = 0;
  public take: Number = 5;
  public dateFilter: any = {
    startDate: '',
    toDate: ''
  };
  public sortOption = {
    sortBy: 'createdAt',
    sortType: 'desc'
  };
  public searchFields: any = {
    status: '',
    deliveryStatus: '',
    shopId: '',
    city: '',
    state: '',
    'pickUpAddressObj.city': '',
    'pickUpAddressObj.area': ''
  };
  public isLoading = false;
  public seller: any;
  public searching: any = false;
  public searchFailed: any = false;
  public orderAssign: any = [];
  public cities: any = [];
  public citySelected: any = {
    ofUser: { areas: [] },
    ofSeller: { areas: [] }
  };
  public areas: any = [];
  public selectedAreas: any = [];

  formatter = (x: {
    name: string,
    owner: {
      name: string
    }
  }) => {
    if (x.owner.name) {
      x.name + ' (' + x.owner.name + ')';
    } else {
      x.name + ' (N/A)';
    }
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.orderService.findSeller({ name: term }).then((res) => {
          if (res) {
            this.searchFailed = false;
            this.searching = false;
            return res.data.items;
          }
          this.searchFailed = true;
          this.searching = false;
          return of([]);
        })
      )
    )

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toasty: ToastyService,
    private modalService: NgbModal,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.cities = this.locationService.getCitiesZambia();
    this.query();
  }

  query() {
    this.isLoading = true;
    if (this.changeUTCDate() === 0) {
      return this.toasty.error('Start date must be less than end date!');
    }


    if (this.seller) {
      this.searchFields.shopId = this.seller._id;
    }
    this.orderService.find(Object.assign({
      page: this.page,
      take: this.take,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`,
      startDate: this.dateFilter.startDate,
      toDate: this.dateFilter.toDate
    }, this.searchFields)).then(res => {
      this.isLoading = false;
      this.orders = res.data.items;
      this.orders.filter(i => i.isAssign = false);
      this.total = res.data.count;
    });
  }

  changeCity(cityName: string, type: string) {
    // *! change city => get areas of city
    if (type === 'user') {
      if (cityName) {
        this.citySelected.ofUser = _.find(this.cities, { 'name': cityName });
      } else {
        this.citySelected.ofUser = { areas: [] };  // *! if select 'All city'
      }
    }

    if (type === 'seller') {
      if (cityName) {
        this.citySelected.ofSeller = _.find(this.cities, { 'name': cityName });
      } else {
        this.citySelected.ofSeller = { areas: [] };  // *! if select 'All city'
      }
    }
  }

  sortBy(field: string, type: string) {
    this.sortOption.sortBy = field;
    this.sortOption.sortType = type;
    this.query();
  }

  exportOrder() {
    const token: any = this.authService.getAccessToken();
    if (this.changeUTCDate() === 0) {
      return this.toasty.error('Start date must be less than end date!');
    }

    if (this.dateFilter.toDate && !this.dateFilter.startDate) {
      return this.toasty.error('Please select the start date to export the .csv file!')
    }

    if (!this.dateFilter.toDate && this.dateFilter.startDate) {
      return this.toasty.error('Please select the last date to export the .csv file!')
    }

    const data = {
      access_token: token,
      toDate: this.dateFilter.toDate,
      startDate: this.dateFilter.startDate
    };

    this.orderService.exportOrderToCSV(data).then().catch((err) => {
      const link = document.createElement('a');
      link.target = '_blank';
      link.download = 'file';
      link.href = err.url;
      link.click();
      this.dateFilter = {
        startDate: '',
        toDate: ''
      };
    });
  }

  changeUTCDate() {
    if (this.dateFilter.startDate !== '' && this.dateFilter.toDate !== '') {
      let startUTCDate = new moment().utcOffset(0);
      startUTCDate
        .year(this.dateFilter.startDate.year)
        .month(this.dateFilter.startDate.month - 1)
        .date(this.dateFilter.startDate.day);
      this.dateFilter.startDate = startUTCDate.startOf('day').toISOString();

      let toUTCDate = new moment().utcOffset(0);
      toUTCDate
        .year(this.dateFilter.toDate.year)
        .month(this.dateFilter.toDate.month - 1)
        .date(this.dateFilter.toDate.day);
      this.dateFilter.toDate = toUTCDate.startOf('day').toISOString();

      if (startUTCDate > toUTCDate) {
        return 0;
      }
    }
  }

  getOrderId(item: any, index: number) {
    this.orders[index].isAssign = !this.orders[index].isAssign;
    if (this.orders[index].isAssign && this.orderAssign.indexOf(item) === -1) {
      this.orderAssign.push(item);
    }
    if (!this.orders[index].isAssign && this.orderAssign.indexOf(item) > -1) {
      this.orderAssign.splice(this.orderAssign.indexOf(item), 1);
    }
  }

  assignDriverModal() {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
    if (this.orderAssign.length) {
      const modalRef = this.modalService.open(AssignDriverModalComponent, ngbModalOptions);
      modalRef.componentInstance.orderAssign = this.orderAssign;
    } else {
      return this.toasty.error('Please select order before assigning driver!')
    }
  }
}
