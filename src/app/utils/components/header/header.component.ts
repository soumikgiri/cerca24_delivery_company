import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  public appConfig: any;
  public currentUser: any;
  public isLogin: boolean = false;

  private userLoadedSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userLoadedSubscription = authService.userLoaded$.subscribe(data => this.currentUser = data);
  }

  ngOnInit() {
    if (this.authService.isLoggedin()) {
      this.isLogin = true;
      this.authService.getCurrentUser()
        .then(resp => this.currentUser = resp);
    }
    this.appConfig = this.route.snapshot.data.appConfig;
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.userLoadedSubscription.unsubscribe();
  }

  logout() {
    this.authService.removeToken();
    this.isLogin = false;
    // this.router.navigate(['/']);
    window.location.href = '/';
  }
}
