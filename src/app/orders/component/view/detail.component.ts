import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { DeliveryHistoryComponent } from '../delivery-history/delivery-history.component';
import { AuthService } from '../../../shared/services';
import * as _ from 'lodash';

import { OrderService } from '../../order.service';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './detail.html'
})
export class OrderDetailComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toasty: ToastyService,
    private authService: AuthService
  ) { }
  public order: any = {};
  public drivers: any = [];
  public categories: any = [];
  public shippingStatus: any = '';
  public isSubmitted = false;
  public statusDelivery = [
    {
      value: 'pending',
      lable: 'Pending'
    },
    'Processing', 'Picked Up', 'onTheWay', 'Cancelled', 'Postponed'];

  ngOnInit() {
    this.order = this.route.snapshot.data.order.data;
    this.drivers = this.route.snapshot.data.driver;
    this.categories = this.route.snapshot.data.categories;
    if (this.order.deliveryCategoryId) {
      this.order.categoryId = this.order.deliveryCategoryId;
    }
  }

  assignDriver() {
    const data = _.pick(this.order, ['driverId']);
    this.orderService.assignDriver(this.order._id, data)
      .then(res => {
        this.order.driver = this.drivers.find(e => e._id === this.order.driverId);
        this.toasty.success('Assigned Successfully!');
      })
      .catch(err => {
        this.toasty.error(err.message || 'Assign Driver Error');
      });
  }

  updateCategory() {
    const data = _.pick(this.order, ['categoryId']);
    this.orderService.updateCategory(this.order._id, data)
      .then(res => {
        this.toasty.success('Updated Successfully!');
        this.order.deliveryCategory = this.categories.find(e => e._id === res.data.deliveryCategoryId);
      })
      .catch(err => {
        this.toasty.error('Assign Category Error' || err.message);
      });
  }

  exportPDF(orderId) {
    const token: any = this.authService.getAccessToken();
    this.orderService.exportOrderToPDF(orderId, { access_token: token }).then().catch((err) => {
      const link = document.createElement('a');
      link.target = '_blank';
      link.download = 'file';
      link.href = err.url;
      link.click();
    });
  }

  updateDeliveryStatus() {
    const data: Object = {
      status: this.order.deliveryStatus
    };
    this.orderService.updateDeliveryStatus(this.order._id, data)
      .then(res => {
        this.toasty.success('Updated Successfully');
      })
      .catch(err => {
        this.toasty.error('Updated error' || err.message);
      });
  }

  openMap(item: any) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
    const modalRef = this.modalService.open(MapModalComponent, ngbModalOptions);
    modalRef.componentInstance.orderDetailId = item._id;
  }

  openHistoryStatus(item: any) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(DeliveryHistoryComponent, ngbModalOptions);
    modalRef.componentInstance.options = {
      historyStatus: item.deliveryHistory,
      trackingCode: item.trackingCode,
      productName: item.productDetails.name
    }
  }

  swipe(url: string) {
    if (url) {
      let h = window.screen.availHeight;
      let w = window.screen.availWidth
      window.open(url, 'Image', 'width=' + w + ',height=' + h + ',resizable=1');
    } else {
      return this.toasty.error('Image is not available');
    }
  }
}
