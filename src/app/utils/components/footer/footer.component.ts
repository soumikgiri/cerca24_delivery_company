import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html'
})
export class FooterComponent implements OnInit {
  public appConfig: any;

  constructor() {
    this.appConfig = window.appConfig;
  }

  ngOnInit() { }
}
