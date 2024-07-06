import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFireDoorComponent } from './edit-fire-door.component';

describe('EditFireDoorComponent', () => {
  let component: EditFireDoorComponent;
  let fixture: ComponentFixture<EditFireDoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFireDoorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFireDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
