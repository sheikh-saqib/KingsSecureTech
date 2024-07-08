import { Component, EventEmitter, OnInit, Output } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  @Output() deleteConfirmed = new EventEmitter<void>();

  confirmDelete(): void {
    this.deleteConfirmed.emit();
    $('#deleteModal').modal('hide');
  }

  openModal(): void {
    $('#deleteModal').modal('show');
  }

  closeModal(): void {
    $('#deleteModal').modal('hide');
  }
}
