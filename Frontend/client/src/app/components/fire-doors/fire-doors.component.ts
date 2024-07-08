import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FireDoorsService } from 'src/app/services/fire-doors.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { AuditService } from 'src/app/services/audits.service';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';

declare var $: any;

@Component({
  selector: 'app-fire-doors',
  templateUrl: './fire-doors.component.html',
  styleUrls: ['./fire-doors.component.css'],
})
export class FireDoorsComponent implements OnInit {
  fireDoors: any[] = [];
  filteredFireDoors: any[] = [];
  audits: any[] = [];
  selectedAudit: string = '';
  loading: boolean = false;
  fireDoorToDelete: any = null;
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  @ViewChild(DeleteModalComponent) deleteModal!: DeleteModalComponent;

  constructor(
    private fireDoorsService: FireDoorsService,
    private auditsService: AuditService,
    private router: Router,
    private errorHandlerService: ErrorsService
  ) {}

  ngOnInit(): void {
    this.getFireDoors();
    this.getAudits();
  }

  //get all the firedoors
  getFireDoors(): void {
    this.loading = true;
    this.fireDoorsService.getFireDoors().subscribe(
      (data) => {
        this.fireDoors = data;
        this.applyFilters();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching fire doors:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loading = false;
      }
    );
  }

  //get the audits filter dropdown
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
      this.filteredFireDoors = [...this.fireDoors];
      return;
    }

    this.loading = true;
    this.fireDoorsService.getFireDoorsByAuditId(this.selectedAudit).subscribe(
      (data) => {
        this.filteredFireDoors = data;
        this.currentPage = 1;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching fire doors by audit ID:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loading = false;
      }
    );
  }

  //on add fire doors click
  navigateToAddFireDoor(): void {
    this.router.navigate(['/add-fire-door']);
  }

  //on edit fire doors click
  navigateToEditFireDoor(fireDoorId: string): void {
    this.router.navigate(['/edit-fire-door', fireDoorId]);
  }

  //on delete firedoors click
  confirmDelete(fireDoor: any): void {
    this.fireDoorToDelete = fireDoor;
    this.deleteModal.openModal();
  }

  //on confirm delete
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
            this.showSuccessAlert = true;
            setTimeout(() => {
              this.showSuccessAlert = false;
            }, 5000);
          },
          (error) => {
            console.error('Error deleting fire door:', error);
            this.errorHandlerService.redirectToErrorPage();
            this.showErrorAlert = true;
            setTimeout(() => {
              this.showErrorAlert = false;
            }, 5000);
          }
        );
    }
  }

  // close alert message
  closeAlert(type: 'success' | 'error'): void {
    if (type === 'success') {
      this.showSuccessAlert = false;
    } else {
      this.showErrorAlert = false;
    }
  }

  //pagination controls
  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPaginatedFireDoors(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredFireDoors.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }
}
