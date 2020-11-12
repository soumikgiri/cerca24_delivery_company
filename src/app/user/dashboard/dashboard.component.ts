import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private toasty: ToastyService, private route: ActivatedRoute){ }

  ngOnInit() {
  }
}
