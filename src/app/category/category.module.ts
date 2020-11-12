import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from './category.service';
import {
  ListingComponent,
  UpdateComponent,
  CreateComponent
} from './components';
import { MediaModule } from '../media/media.module';


const routes: Routes = [
  {
    path: '',
    component: ListingComponent,
    data: {
      title: 'Categorys manager',
      urls: [{ title: 'Categorys', url: '/categories' }, { title: 'Listing' }]
    }
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
    data: {
      title: 'Categorys manager',
      urls: [{ title: 'Categorys', url: '/categories' }, { title: 'Update Category' }]
    }
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'Categorys manager',
      urls: [{ title: 'Categorys', url: '/categories' }, { title: 'Create Category' }]
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    MediaModule
  ],
  declarations: [
    ListingComponent,
    UpdateComponent,
    CreateComponent
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
