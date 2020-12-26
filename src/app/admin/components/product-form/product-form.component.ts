import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoryService } from 'shared/services/category.service';
import { PriceValidators } from 'shared/common/validators/price.validators';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  category$
  id

  form = new FormGroup({
    'title': new FormControl('', [Validators.required]),
    'price': new FormControl('', [Validators.required, PriceValidators.canNotSmallerThanZero]),
    'category': new FormControl('', [Validators.required]),
    'imageUrl': new FormControl('', [Validators.required, Validators.pattern("(^http[s]?:\/{2})|(^www)|(^\/{1,2})")])
  });

  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.category$ = categoryService.getCategory();
    this.id = route.snapshot.paramMap.get('id');
    if(this.id)
    productService.getProduct(this.id).pipe(take(1)).subscribe(product => {
      this.form.setValue(product);
    });
  }

  ngOnInit(): void {
  }

  get title() {
    return this.form.get('title');
  }

  get price() {
    return this.form.get('price');
  }

  get category() {
    return this.form.get('category');
  }

  get imageUrl() {
    return this.form.get('imageUrl');
  }

  onSubmit() {
    if(this.form.valid){
      if(this.id) this.productService.updateProduct(this.id, this.form.value);
      else this.productService.saveProduct(this.form.value);
      this.router.navigate(['/admin/products']);
    }
  }

  onDelete() {
    if(!confirm('Are you sure to delete this product?'))
    return;
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }
}
