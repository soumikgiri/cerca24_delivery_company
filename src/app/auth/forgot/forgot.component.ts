import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services';
import { ToastyService } from 'ng2-toasty';

@Component({
	templateUrl: 'forgot.component.html'
})
export class ForgotComponent {
	private Auth: AuthService;
	public credentials = {
		email: ''
	};
	public submitted: boolean = false;
	public logoUrl: any = '';

	constructor(
		auth: AuthService,
		public router: Router,
		private toasty: ToastyService,
		private route: ActivatedRoute
	) {
		this.logoUrl = this.route.snapshot.data.appConfig.siteLogo;
		this.Auth = auth;

		// if (auth.isLoggedin()) {
		// 	this.router.navigate(['/']);
		// }
	}

	login(frm: any) {
		this.submitted = true;
		if (frm.invalid) {
			return;
		}

		this.Auth.forgot(this.credentials.email, "company").then(() => {
			this.toasty.success('New password has been sent, please check your email inbox.');
			this.router.navigate(['/auth/login'])
		})
			.catch(() => this.toasty.error('Something went wrong, please check and try again!'));
	}
}
