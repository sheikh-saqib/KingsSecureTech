import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireDoorsService } from 'src/app/services/fire-doors.service';

@Component({
  selector: 'app-fire-doors',
  templateUrl: './fire-doors.component.html',
  styleUrls: ['./fire-doors.component.css'],
})
export class FireDoorsComponent implements OnInit {
  fireDoors: any[] = [];
  filteredFireDoors: any[] = [];
  searchTerm: string = '';

  constructor(
    private fireDoorsService: FireDoorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFireDoors();
  }

  getFireDoors(): void {
    this.fireDoorsService.getFireDoors().subscribe(
      (data) => {
        this.fireDoors = data;
        this.filteredFireDoors = data;
      },
      (error) => {
        console.error('Error fetching fire doors:', error);
      }
    );
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredFireDoors = this.fireDoors.filter((door) =>
      door.auditId.toLowerCase().includes(term)
    );
  }

  navigateToAddFireDoor(): void {
    this.router.navigate(['/add-fire-door']);
  }

  navigateToEditFireDoor(fireDoorId: string): void {
    this.router.navigate(['/edit-fire-door', fireDoorId]);
  }
}
