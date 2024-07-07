import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireDoorsService } from 'src/app/services/fire-doors.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { AuditService } from 'src/app/services/audits.service';

declare var $: any;

@Component({
  selector: 'app-fire-doors',
  templateUrl: './fire-doors.component.html',
  styleUrls: ['./fire-doors.component.css'],
})
export class FireDoorsComponent implements OnInit {
  fireDoors: any[] = [];
  filteredFireDoors: any[] = [];
  audits: any[] = []; // Array to hold audits for dropdown
  selectedAudit: string = ''; // Track selected audit
  loading: boolean = false;
  fireDoorToDelete: any = null;
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10; // Number of items per page

  constructor(
    private fireDoorsService: FireDoorsService,
    private auditsService: AuditService, // Inject AuditsService
    private router: Router,
    private errorHandlerService: ErrorsService
  ) {}

  ngOnInit(): void {
    this.getFireDoors();
    this.getAudits(); // Fetch audits on initialization
  }

  getFireDoors(): void {
    this.loading = true;
    this.fireDoorsService.getFireDoors().subscribe(
      (data) => {
        this.fireDoors = data;
        this.applyFilters(); // Update filteredFireDoors on initial load
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching fire doors:', error);
        this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
        this.loading = false;
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
      this.filteredFireDoors = [...this.fireDoors];
      return;
    }

    this.loading = true; // Set loading to true while fetching filtered fire doors
    this.fireDoorsService.getFireDoorsByAuditId(this.selectedAudit).subscribe(
      (data) => {
        this.filteredFireDoors = data;
        this.currentPage = 1; // Reset to first page when applying filters
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching fire doors by audit ID:', error);
        this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
        this.loading = false;
      }
    );
  }

  navigateToAddFireDoor(): void {
    this.router.navigate(['/add-fire-door']);
  }

  navigateToEditFireDoor(fireDoorId: string): void {
    this.router.navigate(['/edit-fire-door', fireDoorId]);
  }

  confirmDelete(fireDoor: any): void {
    this.fireDoorToDelete = fireDoor;
    $('#confirmDialog').modal('show');
  }

  closeConfirmDialog(): void {
    this.fireDoorToDelete = null;
    $('#confirmDialog').modal('hide');
  }

  onDelete(): void {
    if (this.fireDoorToDelete) {
      this.fireDoorsService
        .deleteFireDoor(this.fireDoorToDelete.fireDoorId)
        .subscribe(
          () => {
            this.fireDoors = this.fireDoors.filter(
              (door) => door !== this.fireDoorToDelete
            );
            this.filteredFireDoors = this.filteredFireDoors.filter(
              (door) => door !== this.fireDoorToDelete
            );
            this.closeConfirmDialog();
            this.showSuccessAlert = true; // Show success alert
            setTimeout(() => {
              this.showSuccessAlert = false;
            }, 5000); // Hide alert after 5 seconds
          },
          (error) => {
            console.error('Error deleting fire door:', error);
            this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
            this.closeConfirmDialog();
            this.showErrorAlert = true; // Show error alert
            setTimeout(() => {
              this.showErrorAlert = false;
            }, 5000); // Hide alert after 5 seconds
          }
        );
    }
  }

  closeAlert(type: 'success' | 'error'): void {
    if (type === 'success') {
      this.showSuccessAlert = false;
    } else {
      this.showErrorAlert = false;
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    // Optionally, scroll to top of the table when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPaginatedFireDoors(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredFireDoors.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  getPageNumbers(): number[] {
    return Array(Math.ceil(this.filteredFireDoors.length / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  hasNextPage(): boolean {
    return (
      this.currentPage <
      Math.ceil(this.filteredFireDoors.length / this.itemsPerPage)
    );
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}
