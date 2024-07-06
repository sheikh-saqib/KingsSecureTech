import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFireDoorComponent } from './add-fire-door.component';

describe('AddFireDoorComponent', () => {
  let component: AddFireDoorComponent;
  let fixture: ComponentFixture<AddFireDoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFireDoorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFireDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
