import { Component, Input } from '@angular/core';

@Component({
  selector: 'stat-card',
  templateUrl: './stat-card.html'
})
export class StatCardComponent {
  @Input() stat: any;
  @Input() type: any;

  constructor() { }
}
