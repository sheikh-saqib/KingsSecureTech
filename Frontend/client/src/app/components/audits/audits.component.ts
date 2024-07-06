import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audits.service';
import { FireDoorsService } from 'src/app/services/fire-doors.service';
import { RisksService } from 'src/app/services/risks.service';

declare var $: any;

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css'],
})
export class AuditsComponent implements OnInit {
  audits: any[] = [];
  filteredAudits: any[] = [];
  searchTerm: string = '';
  selectedAudit: any;
  auditFireDoors: any[] = [];
  auditRisks: any[] = [];

  constructor(
    private auditService: AuditService,
    private fireDoorService: FireDoorsService,
    private risksService: RisksService
  ) {}

  ngOnInit(): void {
    this.getAudits();
  }

  getAudits(): void {
    this.auditService.getAudits().subscribe(
      (data) => {
        this.audits = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching audits:', error);
      }
    );
  }

  applyFilters(): void {
    if (!this.searchTerm.trim()) {
      this.filteredAudits = [...this.audits];
      return;
    }

    const lowerCaseSearchTerm = this.searchTerm.toLowerCase().trim();
    this.filteredAudits = this.audits.filter(
      (audit) =>
        audit.auditCompanyId.toLowerCase().includes(lowerCaseSearchTerm) ||
        audit.propertyId.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  showFireDoorsModal(audit: any): void {
    this.selectedAudit = audit;
    this.fireDoorService.getFireDoorsByAuditId(audit.auditId).subscribe(
      (data) => {
        this.auditFireDoors = data;
        console.log('Fire doors:', this.auditFireDoors);
        $('#fireDoorModal').modal('show');
      },
      (error) => {
        console.error('Error fetching fire doors:', error);
      }
    );
  }

  closeFireDoorsModal(): void {
    $('#fireDoorModal').modal('hide');
    this.auditFireDoors = [];
    this.selectedAudit = null;
  }

  showRisksModal(audit: any): void {
    this.selectedAudit = audit;
    this.risksService.getRisksByAuditId(audit.auditId).subscribe(
      (data) => {
        this.auditRisks = data;
        console.log('Risks:', this.auditRisks);
        $('#risksModal').modal('show');
      },
      (error) => {
        console.error('Error fetching risks:', error);
      }
    );
  }

  closeRisksModal(): void {
    $('#risksModal').modal('hide');
    this.auditRisks = [];
    this.selectedAudit = null;
  }
}
