import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {

  categories$;

  @Input('category') category;

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getCategory();
   }

  ngOnInit(): void {
  }

}
