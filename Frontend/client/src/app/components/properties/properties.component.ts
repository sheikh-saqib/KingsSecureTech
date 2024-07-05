import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audits.service';
import { PropertiesService } from 'src/app/services/properties.service';

declare var $: any;
@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  properties: any[] = [];
  filteredProperties: any[] = [];
  allProperties: any[] = [];
  selectedProperty: any;
  propertyAudits: any[] = [];
  searchTerm: string = '';

  constructor(
    private propertiesService: PropertiesService,
    private auditService: AuditService
  ) {}

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(): void {
    this.propertiesService.getProperties().subscribe(
      (data) => {
        this.allProperties = data;
        this.filteredProperties = data;
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }

  filterProperties(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProperties = this.allProperties.filter(
      (property) =>
        property.name.toLowerCase().includes(term) ||
        property.clientId.toLowerCase().includes(term)
    );
  }

  showAuditModal(property: any): void {
    this.selectedProperty = property;
    this.auditService.getAuditsByPropertyId(property.propertyId).subscribe(
      (data) => {
        this.propertyAudits = data;
        $('#auditModal').modal('show');
      },
      (error) => {
        console.error('Error fetching property audits:', error);
      }
    );
  }

  closeAuditModal(): void {
    $('#auditModal').modal('hide');
    this.propertyAudits = [];
    this.selectedProperty = null;
  }
}
