import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { ErrorsService } from 'src/app/services/errors.service';

declare var $: any;

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  clientProperties: any[] = [];
  selectedClient: any;
  loadingClients: boolean = false;
  loadingProperties: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(
    private clientsService: ClientsService,
    private propertiesService: PropertiesService,
    private errorHandlerService: ErrorsService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.loadingClients = true;
    this.clientsService.getClients().subscribe(
      (data) => {
        this.clients = data;
        this.loadingClients = false;
      },
      (error) => {
        console.error('Error fetching clients:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loadingClients = false;
      }
    );
  }

  showPropertiesModal(client: any): void {
    this.selectedClient = client;
    this.loadingProperties = true;
    this.propertiesService.getPropertiesByClientId(client.clientId).subscribe(
      (data) => {
        this.clientProperties = data;
        console.log('Properties:', this.clientProperties);
        $('#propertiesModal').modal('show');
        this.loadingProperties = false;
      },
      (error) => {
        console.error('Error fetching client properties:', error);
        this.errorHandlerService.redirectToErrorPage();
        this.loadingProperties = false;
      }
    );
  }

  closePropertiesModal(): void {
    $('#propertiesModal').modal('hide');
    this.clientProperties = [];
    this.selectedClient = null;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getPaginatedClients(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.clients.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    return Array(Math.ceil(this.clients.length / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  hasNextPage(): boolean {
    return (
      this.currentPage < Math.ceil(this.clients.length / this.itemsPerPage)
    );
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}
