import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrderDetailComponent } from "shared/components/order-detail/order-detail.component";
import { AuthGuard } from "shared/services/auth-guard.service";
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { ProductsComponent } from "./components/products/products.component";

const routes: Routes = [

  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},


  {path: 'check-out', component: CheckOutComponent, canActivate:[AuthGuard]},
  {path: 'order-success/:id', component: OrderSuccessComponent, canActivate:[AuthGuard]},
  {path:'my/orders', component: MyOrdersComponent, canActivate:[AuthGuard]},
  {path:'order/:id', component: OrderDetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
