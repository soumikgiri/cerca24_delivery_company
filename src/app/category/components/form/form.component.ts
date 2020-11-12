import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'category-create',
  templateUrl: './form.html'
})
export class CreateComponent implements OnInit {
  public category: any = {
    name: '',
    description: '',
    mainImage: null
  };
  public tree: any = [];
  public imageUrl: string = '';
  public isNew = true;

  constructor(private router: Router, private categoryService: CategoryService, private toasty: ToastyService) {
  }

  ngOnInit() {
    this.categoryService.tree()
      .then(resp => (this.tree = this.categoryService.prettyPrint(resp.data)));
  }

  submit(frm: any) {
    if (!this.category.name) {
      return this.toasty.error('Please enter category name');
    }

    if (!this.category.parentId) {
      this.category.parentId = null;
    }

    this.categoryService.create(this.category)
      .then(() => {
        this.toasty.success('Category has been updated');
        this.router.navigate(['/categories']);
      }, err => this.toasty.error(err.data.message || 'Something went wrong!'));
  }
}

@Component({
  selector: 'category-update',
  templateUrl: './form.html'
})
export class UpdateComponent implements OnInit {
  private groupId: string;
  public category: any = {};
  public tree: any = [];
  public imageUrl: string = '';
  public isNew = false;

  constructor(private router: Router, private route: ActivatedRoute,
     private categoryService: CategoryService, private toasty: ToastyService) {
  }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
    this.categoryService.findOne(this.groupId)
      .then(resp => {
        this.category = resp.data;
        if (typeof this.category.mainImage === 'string') {
          this.imageUrl = this.category.mainImage;
        } else if (this.category.mainImage) {
          this.imageUrl = this.category.mainImage.fileUrl;
          this.category.mainImage = this.category.mainImage._id;
        }
        return true;
      })
      .then(() => this.categoryService.tree())
      .then(resp => {
        this.categoryService.removeChild(resp.data, this.category._id);
        this.tree = this.categoryService.prettyPrint(resp.data)
      });
  }

  submit(frm: any) {
    if (!this.category.name) {
      return this.toasty.error('Please enter category name');
    }

    this.categoryService.update(this.groupId, this.category)
      .then(() => {
        this.toasty.success('Category has been updated');
        this.router.navigate(['/categories']);
      }, err => this.toasty.error(err.data.message || 'Something went wrong!'));
  }
}
