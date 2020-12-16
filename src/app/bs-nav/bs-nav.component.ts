import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-bs-nav',
  templateUrl: './bs-nav.component.html',
  styleUrls: ['./bs-nav.component.css']
})
export class BsNavComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(s => console.log(s));
  }

  ngOnInit(): void {
  }

  logout() {
    this.afAuth.signOut();
  }
}
