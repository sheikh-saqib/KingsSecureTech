import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditCompaniesComponent } from './audit-companies.component';

describe('AuditCompaniesComponent', () => {
  let component: AuditCompaniesComponent;
  let fixture: ComponentFixture<AuditCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
