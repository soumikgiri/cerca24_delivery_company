import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { MediaModule } from '../media/media.module';
import { UtilsModule } from '../utils/utils.module';

import { LocationService } from './../shared/services';


const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'signup',
  component: SignupComponent
}, {
  path: 'forgot',
  component: ForgotComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MediaModule,
    UtilsModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotComponent
  ],
  providers: [LocationService]
})

export class AuthModule { }
