import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireDoorsComponent } from './fire-doors.component';

describe('FireDoorsComponent', () => {
  let component: FireDoorsComponent;
  let fixture: ComponentFixture<FireDoorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireDoorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FireDoorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
