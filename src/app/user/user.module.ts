import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user.routing';
import { UserService } from './user.service';
import { ProfileUpdateComponent } from './profile/profile-update.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MediaModule } from '../media/media.module';
import { UtilsModule } from '../utils/utils.module';
import { CurrentUserResolver } from '../shared/resolver/current-user.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //our custom module
    UserRoutingModule,
    NgbModule.forRoot(),
    MediaModule,
    UtilsModule
  ],
  declarations: [
    ProfileUpdateComponent,
    DashboardComponent
  ],
  providers: [
    UserService,
    CurrentUserResolver
  ]
})
export class UserModule { }
