import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { PropertiesService } from 'src/app/services/properties.service';

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

  constructor(
    private clientsService: ClientsService,
    private propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientsService.getClients().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  showPropertiesModal(client: any): void {
    this.selectedClient = client;
    this.propertiesService.getPropertiesByClientId(client.clientId).subscribe(
      (data) => {
        this.clientProperties = data;
        console.log('Properties:', this.clientProperties);
        $('#propertiesModal').modal('show');
      },
      (error) => {
        console.error('Error fetching client properties:', error);
      }
    );
  }

  closePropertiesModal(): void {
    $('#propertiesModal').modal('hide');
    this.clientProperties = [];
    this.selectedClient = null;
  }
}
