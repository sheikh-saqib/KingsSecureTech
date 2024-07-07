import { Component, OnInit } from '@angular/core';
import { RisksService } from 'src/app/services/risks.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { Router } from '@angular/router';
import { AuditService } from 'src/app/services/audits.service'; // Import AuditsService

declare var $: any;

@Component({
  selector: 'app-risks',
  templateUrl: './risks.component.html',
  styleUrls: ['./risks.component.css'],
})
export class RisksComponent implements OnInit {
  risks: any[] = [];
  filteredRisks: any[] = [];
  loading: boolean = false;
  riskToDelete: any = null;
  audits: any[] = []; // Array to hold audits for dropdown
  selectedAudit: string = ''; // Track selected audit

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private risksService: RisksService,
    private errorHandlerService: ErrorsService,
    private router: Router,
    private auditsService: AuditService // Inject AuditsService
  ) {}

  ngOnInit(): void {
    this.getRisks();
    this.getAudits(); // Fetch audits on initialization
  }

  getRisks(): void {
    this.loading = true; // Set loading to true when fetching risks
    this.risksService.getRisks().subscribe(
      (data) => {
        this.risks = data;
        this.applyFilters(); // Apply filters initially
        this.loading = false; // Set loading to false when data is fetched
      },
      (error) => {
        console.error('Error fetching risks:', error);
        this.errorHandlerService.redirectToErrorPage(); // Redirect to error page or another route
        this.loading = false; // Ensure loading is set to false in case of error
      }
    );
  }

  getAudits(): void {
    this.auditsService.getAudits().subscribe(
      (data) => {
        this.audits = data;
      },
      (error) => {
        console.error('Error fetching audits:', error);
        this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
      }
    );
  }

  applyFilters(): void {
    if (!this.selectedAudit) {
      this.filteredRisks = [...this.risks];
      return;
    }

    this.loading = true; // Set loading to true when filtering
    this.risksService.getRisksByAuditId(this.selectedAudit).subscribe(
      (data) => {
        this.filteredRisks = data;
        this.currentPage = 1; // Reset to first page after filtering
        this.loading = false; // Set loading to false after filtering
      },
      (error) => {
        console.error('Error fetching risks by audit:', error);
        this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
        this.loading = false; // Ensure loading is set to false in case of error
      }
    );
  }

  // Pagination methods
  getPaginatedRisks(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredRisks.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    return Array.from(
      { length: Math.ceil(this.filteredRisks.length / this.itemsPerPage) },
      (_, i) => i + 1
    );
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  hasNextPage(): boolean {
    return (
      this.currentPage <
      Math.ceil(this.filteredRisks.length / this.itemsPerPage)
    );
  }

  onPageChange(page: number): void {
    if (
      page >= 1 &&
      page <= Math.ceil(this.filteredRisks.length / this.itemsPerPage)
    ) {
      this.currentPage = page;
    }
  }

  navigateToEditRisk(riskId: string): void {
    this.router.navigate(['/edit-risk', riskId]);
  }

  confirmDelete(risk: any): void {
    this.riskToDelete = risk;
    $('#confirmDialog').modal('show');
  }

  onDelete(): void {
    if (this.riskToDelete) {
      this.risksService.deleteRisk(this.riskToDelete.riskId).subscribe(
        () => {
          this.risks = this.risks.filter((risk) => risk !== this.riskToDelete);
          this.filteredRisks = this.filteredRisks.filter(
            (risk) => risk !== this.riskToDelete
          );
          this.closeConfirmDialog();
        },
        (error) => {
          console.error('Error deleting risk:', error);
          this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
          this.closeConfirmDialog();
        }
      );
    }
  }

  closeConfirmDialog(): void {
    this.riskToDelete = null;
    $('#confirmDialog').modal('hide');
  }

  navigateToAddRisk() {
    this.router.navigate(['/add-risk']);
  }
}
