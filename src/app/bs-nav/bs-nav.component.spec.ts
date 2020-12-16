import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsNavComponent } from './bs-nav.component';

describe('BsNavComponent', () => {
  let component: BsNavComponent;
  let fixture: ComponentFixture<BsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
