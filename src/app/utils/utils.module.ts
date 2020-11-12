import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { UserLeftMenuComponent } from './components/user-left-menu/left-menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DialCodeComponent } from './components/dial-number/dial.component';

import { DefaultImagePipe } from './pipes';

import { AuthService } from '../shared/services';
import { NewsleterComponent } from './components/newsletter/newsletter.component';
import { NewsletterService } from './services/newsletter.service';

@NgModule({
	imports: [
		FormsModule,
		RouterModule,
		CommonModule,
		NgbModule.forRoot(),
		TranslateModule.forChild()
	],
	declarations: [
		BreadcrumbComponent,
		SidebarComponent,
		FooterComponent,
		HeaderComponent,
		UserLeftMenuComponent,
		NewsleterComponent,
		DefaultImagePipe,
		DialCodeComponent
	],
	exports: [
		BreadcrumbComponent,
		SidebarComponent,
		FooterComponent,
		HeaderComponent,
		UserLeftMenuComponent,
		NewsleterComponent,
		DefaultImagePipe,
		TranslateModule,
		DialCodeComponent
	],
	providers: [
		AuthService,
		NewsletterService
	]
})
export class UtilsModule { }
