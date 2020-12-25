import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/order.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrders();
  }

}
