import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'user-left-menu',
	templateUrl: './left-menu.html'
})
export class UserLeftMenuComponent {
	constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/shop']);
  }
}
