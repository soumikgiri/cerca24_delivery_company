import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, SeoService, StatService } from '../shared/services';

@Component({
	templateUrl: './starter.component.html'
})
export class StarterComponent implements OnInit {
	public currentUser: any;
	public orderStat: any = {};
	public saleStat: any = {};
	public isLoggin: boolean = false;
	public logoUrl: string = '';

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private seoService: SeoService,
		private statService: StatService
	) {
		this.logoUrl = this.route.snapshot.data.appConfig.siteLogo;
	}

	ngOnInit() {
		const config = this.route.snapshot.data.appConfig;
		if (config) {
			this.seoService.update(config.siteName, config.homeSEO);
		}

		if (this.authService.isLoggedin()) {
			this.isLoggin = true;
			this.authService.getCurrentUser()
				.then(resp => this.currentUser = resp);

			this.statQuery();
		}
	}

	statQuery() {
		this.statService.orderStat().then(res => this.orderStat = res.data);
		this.statService.saleStat().then(res => this.saleStat = res.data);
	}
}
