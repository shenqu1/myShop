import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { DropdownDirective } from './directives/dropdown.directive';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailComponent
  ]
})
export class SharedModule { }
