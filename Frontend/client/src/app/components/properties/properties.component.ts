import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audits.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ErrorsService } from 'src/app/services/errors.service';
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
  clients: any[] = [];
  selectedClient: string = '';
  selectedProperty: any;
  propertyAudits: any[] = [];
  loadingProperties: boolean = false; // Loading indicator for properties list
  loadingAudits: boolean = false; // Loading indicator for audits modal
  currentPage: number = 1;
  itemsPerPage: number = 10; // Number of items per page

  constructor(
    private propertiesService: PropertiesService,
    private auditService: AuditService,
    private clientsService: ClientsService,
    private errorHandlerService: ErrorsService
  ) {}

  ngOnInit(): void {
    this.getProperties();
    this.getClients(); // Fetch clients on initialization
  }

  getProperties(): void {
    this.loadingProperties = true; // Set loading to true before fetching properties
    this.propertiesService.getProperties().subscribe(
      (data) => {
        this.allProperties = data;
        this.filteredProperties = data;
        this.loadingProperties = false; // Set loading to false after properties are fetched
      },
      (error) => {
        console.error('Error fetching properties:', error);
        this.errorHandlerService.redirectToErrorPage(); // Redirect to error page or another route
        this.loadingProperties = false; // Ensure loading is set to false on error
      }
    );
  }

  getClients(): void {
    this.clientsService.getClients().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error fetching clients:', error);
        this.errorHandlerService.redirectToErrorPage(); // Redirect to error page or another route
      }
    );
  }

  filterPropertiesByClient(): void {
    if (this.selectedClient) {
      this.filteredProperties = this.allProperties.filter(
        (property) => property.clientId === this.selectedClient
      );
    } else {
      this.filteredProperties = this.allProperties;
    }
    this.currentPage = 1; // Reset to first page when filtering
  }

  showAuditModal(property: any): void {
    this.selectedProperty = property;
    this.loadingAudits = true; // Set loading to true before fetching audits
    this.auditService.getAuditsByPropertyId(property.propertyId).subscribe(
      (data) => {
        this.propertyAudits = data;
        $('#auditModal').modal('show');
        this.loadingAudits = false; // Set loading to false after audits are fetched
      },
      (error) => {
        console.error('Error fetching property audits:', error);
        this.errorHandlerService.redirectToErrorPage(); // Redirect to error page or another route
        this.loadingAudits = false; // Ensure loading is set to false on error
      }
    );
  }

  closeAuditModal(): void {
    $('#auditModal').modal('hide');
    this.propertyAudits = [];
    this.selectedProperty = null;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getPaginatedProperties(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProperties.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  getPageNumbers(): number[] {
    return Array(Math.ceil(this.filteredProperties.length / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  hasNextPage(): boolean {
    return (
      this.currentPage <
      Math.ceil(this.filteredProperties.length / this.itemsPerPage)
    );
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}
