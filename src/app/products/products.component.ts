import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filterProducts: Product[] = [];
  category;

  constructor(private productService: ProductService, private route: ActivatedRoute) {

    productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe(paramMap => {
      this.category = paramMap.get('category');
      this.filterProducts = this.category ? this.products.filter(product => product.category === this.category) : this.products;
    });

   }



  ngOnInit(): void {
  }

}
