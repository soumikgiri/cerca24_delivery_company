import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, SeoService, SystemService } from './shared/services';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'app';

  private seoChangedSubscription: Subscription;
  constructor(private router: Router, private authService: AuthService, private seoService: SeoService,
    private translate: TranslateService, private systemService: SystemService) {
    this.seoChangedSubscription = seoService.seoChanged$.subscribe(data => {
      if (!data) { return; }
      if (data.title) {
        document.title = data.title;
      }
      if (data.meta) {
        $('meta[name="description"]').attr('content', data.meta.description);
        $('meta[name="keywords"]').attr('content', data.meta.description);
      }
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        $('html, body').animate({ scrollTop: 0 });
      }
    });
    const defaultLang = 'en';
    // https://github.com/ngx-translate/core
    translate.setDefaultLang(defaultLang);
    systemService.configs().then(resp => {
      translate.setDefaultLang(resp.i18n.defaultLanguage);
      translate.use(resp.userLang);

      //change favicon
      $('#favicon').attr('href', resp.siteFavicon);
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedin()) {
      this.authService.getCurrentUser();
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.seoChangedSubscription.unsubscribe();
  }
}
