import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  saveProduct(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(
      map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() as {} })))
    );
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  updateProduct(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }
}
