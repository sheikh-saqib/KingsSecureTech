import { Component, OnInit } from '@angular/core';
import { RisksService } from 'src/app/services/risks.service';

@Component({
  selector: 'app-risks',
  templateUrl: './risks.component.html',
  styleUrls: ['./risks.component.css'],
})
export class RisksComponent implements OnInit {
  risks: any[] = [];
  filteredRisks: any[] = [];
  searchTerm: string = '';

  constructor(private risksService: RisksService) {}

  ngOnInit(): void {
    this.getRisks();
  }

  getRisks(): void {
    this.risksService.getRisks().subscribe(
      (data) => {
        this.risks = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching risks:', error);
      }
    );
  }

  applyFilters(): void {
    if (!this.searchTerm.trim()) {
      this.filteredRisks = [...this.risks];
      return;
    }

    const lowerCaseSearchTerm = this.searchTerm.toLowerCase().trim();
    this.filteredRisks = this.risks.filter((risk) =>
      risk.auditId.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
}
