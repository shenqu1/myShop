import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
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
}
