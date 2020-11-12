import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileUpdateComponent } from './profile/profile-update.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentUserResolver} from '../shared/resolver';

const routes: Routes = [{
  path: 'profile',
  component: ProfileUpdateComponent,
  resolve: {
    company: CurrentUserResolver
  }
}, {
  path: 'dashboard',
  component: DashboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
