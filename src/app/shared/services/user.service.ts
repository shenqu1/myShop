import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/appUser';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string):Observable<AppUser> {
    return this.db.object('/users/' + uid).valueChanges().pipe(
      map((user: AppUser) => user)
    );
  }
}
