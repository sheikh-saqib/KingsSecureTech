import { Component, OnInit, ViewChild } from '@angular/core';
import { RisksService } from 'src/app/services/risks.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { Router } from '@angular/router';
import { AuditService } from 'src/app/services/audits.service';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';

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
  audits: any[] = [];
  selectedAudit: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;

  @ViewChild(DeleteModalComponent) deleteModal!: DeleteModalComponent;

  constructor(
    private risksService: RisksService,
    private errorHandlerService: ErrorsService,
    private router: Router,
    private auditsService: AuditService
  ) {}

  ngOnInit(): void {
    this.getRisks();
    this.getAudits();
  }

  // Get the list of all risks
  getRisks(): void {
    this.loading = true;
    this.risksService.getRisks().subscribe(
      (data) => {
        this.risks = data;
        this.applyFilters();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching risks:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loading = false;
      }
    );
  }

  //get all audits to populate the filter dropdown
  getAudits(): void {
    this.auditsService.getAudits().subscribe(
      (data) => {
        this.audits = data;
      },
      (error) => {
        console.error('Error fetching audits:', error);
        this.errorHandlerService.redirectToErrorPage();
      }
    );
  }

  //on apply filter
  applyFilters(): void {
    if (!this.selectedAudit) {
      this.filteredRisks = [...this.risks];
      return;
    }

    this.loading = true;
    this.risksService.getRisksByAuditId(this.selectedAudit).subscribe(
      (data) => {
        this.filteredRisks = data;
        this.currentPage = 1;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching risks by audit:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loading = false;
      }
    );
  }

  //pagination controls
  getPaginatedRisks(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredRisks.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // on edit risk click
  navigateToEditRisk(riskId: string): void {
    this.router.navigate(['/edit-risk', riskId]);
  }

  //on add risk click
  navigateToAddRisk() {
    this.router.navigate(['/add-risk']);
  }

  //on confrim delete risk click
  onDelete(): void {
    if (this.riskToDelete) {
      this.risksService.deleteRisk(this.riskToDelete.riskId).subscribe(
        () => {
          this.risks = this.risks.filter((risk) => risk !== this.riskToDelete);
          this.filteredRisks = this.filteredRisks.filter(
            (risk) => risk !== this.riskToDelete
          );
          this.deleteModal.closeModal();
        },
        (error) => {
          console.error('Error deleting risk:', error);
          this.errorHandlerService.redirectToErrorPage();
          this.deleteModal.closeModal();
        }
      );
    }
  }

  //on delete click
  confirmDelete(risk: any): void {
    this.riskToDelete = risk;
    this.deleteModal.openModal();
  }
}
