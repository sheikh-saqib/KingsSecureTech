import { Component, OnInit } from '@angular/core';
import { AuditCompaniesService } from 'src/app/services/audit-companies.service';
import { AuditService } from 'src/app/services/audits.service';
import { ErrorsService } from 'src/app/services/errors.service';

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
  loadingAuditCompanies: boolean = false;
  loadingAudits: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(
    private auditCompaniesService: AuditCompaniesService,
    private auditService: AuditService,
    private errorHandlerService: ErrorsService
  ) {}

  ngOnInit(): void {
    this.getAuditCompanies();
  }

  // Get the list of audit companies
  getAuditCompanies(): void {
    this.loadingAuditCompanies = true;
    this.auditCompaniesService.getAuditCompanies().subscribe(
      (data) => {
        this.auditCompanies = data;
        this.loadingAuditCompanies = false;
      },
      (error) => {
        console.error('Error fetching audit companies:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loadingAuditCompanies = false;
      }
    );
  }

  //get audits list for an audit company on button click
  showAuditModal(auditCompany: any): void {
    this.selectedAuditCompany = auditCompany;
    this.loadingAudits = true;
    this.auditService
      .getAuditsByCompanyId(auditCompany.auditCompanyId)
      .subscribe(
        (data) => {
          this.auditCompanyAudits = data;
          $('#auditModal').modal('show');
          this.loadingAudits = false;
        },
        (error) => {
          console.error('Error fetching audits for audit company:', error);
          this.errorHandlerService.redirectToErrorPage();
          this.loadingAudits = false;
        }
      );
  }

  //close audit modal
  closeAuditModal(): void {
    $('#auditModal').modal('hide');
    this.auditCompanyAudits = [];
    this.selectedAuditCompany = null;
  }

  //pagination controls
  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPaginatedAuditCompanies(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.auditCompanies.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }
}
