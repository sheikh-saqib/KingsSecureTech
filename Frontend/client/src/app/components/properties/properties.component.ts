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
  loadingProperties: boolean = false;
  loadingAudits: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(
    private propertiesService: PropertiesService,
    private auditService: AuditService,
    private clientsService: ClientsService,
    private errorHandlerService: ErrorsService
  ) {}

  ngOnInit(): void {
    this.getProperties();
    this.getClients();
  }

  //Get all properties
  getProperties(): void {
    this.loadingProperties = true;
    this.propertiesService.getProperties().subscribe(
      (data) => {
        this.allProperties = data;
        this.filteredProperties = data;
        this.loadingProperties = false;
      },
      (error) => {
        console.error('Error fetching properties:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loadingProperties = false;
      }
    );
  }

  //get all clients to populate the clients filter
  getClients(): void {
    this.clientsService.getClients().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error fetching clients:', error);
        this.errorHandlerService.redirectToErrorPage();
      }
    );
  }

  //on filter apply
  filterPropertiesByClient(): void {
    if (this.selectedClient) {
      this.filteredProperties = this.allProperties.filter(
        (property) => property.clientId === this.selectedClient
      );
    } else {
      this.filteredProperties = this.allProperties;
    }
    this.currentPage = 1;
  }

  //get all the audits for a property on button click
  showAuditModal(property: any): void {
    this.selectedProperty = property;
    this.loadingAudits = true;
    this.auditService.getAuditsByPropertyId(property.propertyId).subscribe(
      (data) => {
        this.propertyAudits = data;
        $('#auditModal').modal('show');
        this.loadingAudits = false;
      },
      (error) => {
        console.error('Error fetching property audits:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loadingAudits = false;
      }
    );
  }

  //close audit modal
  closeAuditModal(): void {
    $('#auditModal').modal('hide');
    this.propertyAudits = [];
    this.selectedProperty = null;
  }

  //pagination controls
  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPaginatedProperties(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProperties.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }
}
