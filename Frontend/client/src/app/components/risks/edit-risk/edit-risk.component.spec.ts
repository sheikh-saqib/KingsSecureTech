import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRiskComponent } from './edit-risk.component';

describe('EditRiskComponent', () => {
  let component: EditRiskComponent;
  let fixture: ComponentFixture<EditRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRiskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
