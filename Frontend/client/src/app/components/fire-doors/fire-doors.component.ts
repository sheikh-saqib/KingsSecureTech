import { Component, OnInit } from '@angular/core';
import { FireDoorsService } from 'src/app/services/fire-doors.service';

@Component({
  selector: 'app-fire-doors',
  templateUrl: './fire-doors.component.html',
  styleUrls: ['./fire-doors.component.css'],
})
export class FireDoorsComponent implements OnInit {
  fireDoors: any[] = [];
  constructor(private fireDoorsService: FireDoorsService) {}

  ngOnInit(): void {
    this.getFireDoors();
  }

  getFireDoors(): void {
    this.fireDoorsService.getFireDoors().subscribe(
      (data) => {
        this.fireDoors = data;
      },
      (error) => {
        console.error('Error fetching fire doors:', error);
      }
    );
  }
}
