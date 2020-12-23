import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  form = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'addressLine1': new FormControl('', [Validators.required]),
    'addressLine2': new FormControl(''),
    'city': new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  get name() {
    return this.form.get('name');
  }

  get addressLine1() {
    return this.form.get('addressLine1');
  }

  get addressLine2() {
    return this.form.get('addressLine2');
  }

  get city() {
    return this.form.get('city');
  }

  onSubmit() {
    console.log(this.form);
  }

}
