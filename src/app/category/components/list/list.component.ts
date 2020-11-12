import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'categories',
  templateUrl: './list.html'
})
export class ListingComponent implements OnInit {
  public items = [];
  public isLoading = false;

  constructor(private categoryService: CategoryService, private toasty: ToastyService) {
  }

  ngOnInit() {
    this.query();
  }

  query() {
    this.isLoading = true;
    this.categoryService.tree()
      .then(resp => {
        this.items = this.categoryService.prettyPrint(resp.data);
        this.isLoading = false;
      })
      .catch(() => {
        this.toasty.error('Something went wrong, please try again!');
        this.isLoading = false;
    });
  }

  remove(item: any, index: number) {
    if (window.confirm('Are you sure want to delete this category?')) {
      this.categoryService.remove(item._id)
        .then(() => {
          this.toasty.success('Category has been deleted!');
          this.items.splice(index, 1);
        })
        .catch((err) => this.toasty.error(err.data.message || 'Something went wrong, please try again!'));
    }
  }
}
