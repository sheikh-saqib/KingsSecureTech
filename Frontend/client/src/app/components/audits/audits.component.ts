import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audits.service';
import { FireDoorsService } from 'src/app/services/fire-doors.service';
import { RisksService } from 'src/app/services/risks.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { AuditCompaniesService } from 'src/app/services/audit-companies.service';

declare var $: any;

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css'],
})
export class AuditsComponent implements OnInit {
  audits: any[] = [];
  filteredAudits: any[] = [];
  selectedProperty: string = '';
  selectedAuditCompany: string = '';
  properties: any[] = [];
  auditCompanies: any[] = [];
  selectedAudit: any;
  auditFireDoors: any[] = [];
  auditRisks: any[] = [];
  loadingAudits: boolean = false;
  loadingFireDoors: boolean = false;
  loadingRisks: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(
    private auditService: AuditService,
    private fireDoorService: FireDoorsService,
    private risksService: RisksService,
    private errorHandlerService: ErrorsService,
    private propertiesService: PropertiesService,
    private auditCompaniesService: AuditCompaniesService
  ) {}

  ngOnInit(): void {
    this.getAudits();
    this.getProperties();
    this.getAuditCompanies();
  }

  // get list of all audits
  getAudits(): void {
    this.loadingAudits = true;
    this.auditService.getAudits().subscribe(
      (data) => {
        this.audits = data;
        this.applyFilters();
        this.loadingAudits = false;
      },
      (error) => {
        console.error('Error fetching audits:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loadingAudits = false;
      }
    );
  }

  //get all properties to load the properties filter
  getProperties(): void {
    this.propertiesService.getProperties().subscribe(
      (data) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error fetching properties:', error);
        this.errorHandlerService.redirectToErrorPage();
      }
    );
  }

  //get all audit companies to load the audit companies filter
  getAuditCompanies(): void {
    this.auditCompaniesService.getAuditCompanies().subscribe(
      (data) => {
        this.auditCompanies = data;
      },
      (error) => {
        console.error('Error fetching audit companies:', error);
        this.errorHandlerService.redirectToErrorPage();
      }
    );
  }

  //apply filters to the list
  applyFilters(): void {
    this.filteredAudits = this.audits.filter(
      (audit) =>
        (!this.selectedProperty ||
          audit.propertyId === this.selectedProperty) &&
        (!this.selectedAuditCompany ||
          audit.auditCompanyId === this.selectedAuditCompany)
    );

    this.currentPage = 1;
  }

  //get the list of all the fire doors for the selected audit on button click
  showFireDoorsModal(audit: any): void {
    this.selectedAudit = audit;
    this.loadingFireDoors = true;
    this.fireDoorService.getFireDoorsByAuditId(audit.auditId).subscribe(
      (data) => {
        this.auditFireDoors = data;
        $('#fireDoorModal').modal('show');
        this.loadingFireDoors = false;
      },
      (error) => {
        console.error('Error fetching fire doors:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loadingFireDoors = false;
      }
    );
  }

  //close firedoors modal
  closeFireDoorsModal(): void {
    $('#fireDoorModal').modal('hide');
    this.auditFireDoors = [];
    this.selectedAudit = null;
  }

  //get the list of all the risks for the selected audit on button click
  showRisksModal(audit: any): void {
    this.selectedAudit = audit;
    this.loadingRisks = true;
    this.risksService.getRisksByAuditId(audit.auditId).subscribe(
      (data) => {
        this.auditRisks = data;
        $('#risksModal').modal('show');
        this.loadingRisks = false;
      },
      (error) => {
        console.error('Error fetching risks:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loadingRisks = false;
      }
    );
  }

  //close risks modal
  closeRisksModal(): void {
    $('#risksModal').modal('hide');
    this.auditRisks = [];
    this.selectedAudit = null;
  }

  //pagination controls
  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getPaginatedAudits(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAudits.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }
}
