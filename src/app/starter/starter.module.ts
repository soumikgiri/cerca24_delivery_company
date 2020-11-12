import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UtilsModule } from '../utils/utils.module';
import { StarterComponent } from './starter.component';
import { StatCardComponent } from '../stats/stats-card.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { StatService } from '../shared/services';

const routes: Routes = [{
	path: '',
	data: {
		title: 'Started',
		urls: [{ title: 'Started', url: '/starter' }, { title: 'Started' }]
	},
	component: StarterComponent,
	pathMatch: 'full'
}];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		RouterModule.forChild(routes),
		SlickCarouselModule,
		UtilsModule
	],
	declarations: [
		StarterComponent,
		StatCardComponent
	],
	providers: [StatService]
})
export class StarterModule { }
