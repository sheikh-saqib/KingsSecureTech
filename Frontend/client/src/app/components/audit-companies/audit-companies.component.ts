import { Component, OnInit } from '@angular/core';
import { AuditCompaniesService } from 'src/app/services/audit-companies.service';
import { AuditService } from 'src/app/services/audits.service';

declare var $: any;

@Component({
  selector: 'app-audit-companies',
  templateUrl: './audit-companies.component.html',
  styleUrls: ['./audit-companies.component.css'],
})
export class AuditCompaniesComponent implements OnInit {
  auditCompanies: any[] = [];
  auditCompanyAudits: any[] = [];
  selectedAuditCompany: any;

  constructor(
    private auditCompaniesService: AuditCompaniesService,
    private auditService: AuditService
  ) {}

  ngOnInit(): void {
    this.getAuditCompanies();
  }

  getAuditCompanies(): void {
    this.auditCompaniesService.getAuditCompanies().subscribe(
      (data) => {
        this.auditCompanies = data;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
  showAuditModal(auditCompany: any): void {
    this.selectedAuditCompany = auditCompany;
    this.auditService
      .getAuditsByCompanyId(auditCompany.auditCompanyId)
      .subscribe(
        (data) => {
          this.auditCompanyAudits = data;
          console.log('Audit Companies:', this.auditCompanyAudits);
          $('#auditModal').modal('show');
        },
        (error) => {
          console.error('Error fetching client properties:', error);
        }
      );
  }

  closeAuditModal(): void {
    $('#auditModal').modal('hide');
    this.auditCompanyAudits = [];
    this.selectedAuditCompany = null;
  }
}
