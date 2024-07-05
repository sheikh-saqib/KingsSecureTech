import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audits.service';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css'],
})
export class AuditsComponent implements OnInit {
  audits: any[] = [];
  filteredAudits: any[] = [];
  searchTerm: string = '';

  constructor(private auditService: AuditService) {}

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
    console.log('Showing modal for audit:', audit);
  }
}
