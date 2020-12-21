import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$;
  categories$;

  constructor(private productService: ProductService, private categoryService: CategoryService) {

    this.products$ = productService.getAll();

    this.categories$ = categoryService.getCategory();

   }



  ngOnInit(): void {
  }

}
