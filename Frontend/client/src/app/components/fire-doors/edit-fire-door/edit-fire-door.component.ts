import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireDoorsService } from 'src/app/services/fire-doors.service';
import { ClientsService } from 'src/app/services/clients.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { AuditService } from 'src/app/services/audits.service';
import { FloorsService } from 'src/app/services/floors.service';
import { AreasService } from 'src/app/services/areas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-edit-fire-door',
  templateUrl: './edit-fire-door.component.html',
  styleUrls: ['./edit-fire-door.component.css'],
})
export class EditFireDoorComponent implements OnInit {
  fireDoorForm: FormGroup;
  clients: any[] = [];
  properties: any[] = [];
  audits: any[] = [];
  floors: any[] = [];
  areas: any[] = [];
  showProperties = false;
  showAudits = false;
  showFloors = false;
  showAreas = false;
  fireDoorId: string;

  constructor(
    private fb: FormBuilder,
    private fireDoorsService: FireDoorsService,
    private clientsService: ClientsService,
    private propertiesService: PropertiesService,
    private auditsService: AuditService,
    private floorsService: FloorsService,
    private areasService: AreasService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorsService
  ) {
    this.fireDoorForm = this.fb.group({
      clientId: ['', Validators.required],
      propertyId: ['', Validators.required],
      auditId: ['', Validators.required],
      floorId: ['', Validators.required],
      areaId: ['', Validators.required],
      fireDoorId: ['', Validators.required],
      barcode: [''],
      doorMaterial: [''],
      frameMaterial: [''],
      result: [''],
    });
  }

  ngOnInit(): void {
    this.fireDoorId = this.route.snapshot.params['id'];

    if (this.fireDoorId) {
      this.loadFireDoorData();
    } else {
      this.errorHandlerService.redirectToErrorPage();
    }

    this.loadClients();
  }

  // Load the selected fireDoor data
  loadFireDoorData(): void {
    this.fireDoorsService.getFireDoorById(this.fireDoorId).subscribe(
      (data: any) => {
        // Patch form values with data retrieved
        this.fireDoorForm.patchValue({
          fireDoorId: data[0].fireDoorId,
          areaId: data[0].areaId,
          barcode: data[0].barcode,
          doorMaterial: data[0].doorMaterial,
          frameMaterial: data[0].frameMaterial,
          result: data[0].result,
          floorId: data[0].floorId,
          auditId: data[0].auditId,
          propertyId: data[0].propertyId,
          clientId: data[0].clientId,
        });

        // After patching initial values, trigger dependent dropdowns
        if (data[0].clientId) {
          this.onClientChange(
            data[0].clientId,
            data[0].propertyId,
            data[0].auditId,
            data[0].floorId,
            data[0].areaId
          );
        }
      },
      (error) => {
        console.error('Error fetching fire door:', error);
        this.errorHandlerService.redirectToErrorPage();
      }
    );
  }

  // load the clients dropdown list
  loadClients(): void {
    this.clientsService.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });
  }

  // load the properties dropdown list based on the selected client
  onClientChange(
    clientId: string,
    preselectedPropertyId?: string,
    preselectedAuditId?: string,
    preselectedFloorId?: string,
    preselectedAreaId?: string
  ): void {
    if (clientId) {
      this.propertiesService.getPropertiesByClientId(clientId).subscribe(
        (data: any[]) => {
          this.properties = data;
          this.showProperties = true;
          this.showAudits = false;
          this.showFloors = false;
          this.showAreas = false;
          this.audits = [];
          this.floors = [];
          this.areas = [];
          this.fireDoorForm.patchValue({
            propertyId: preselectedPropertyId || '',
            auditId: '',
            floorId: '',
            areaId: '',
          });
          if (preselectedPropertyId) {
            this.onPropertyChange(
              preselectedPropertyId,
              preselectedAuditId,
              preselectedFloorId,
              preselectedAreaId
            );
          }
        },
        (error) => {
          console.error('Error fetching properties:', error);
          this.errorHandlerService.redirectToErrorPage();
        }
      );
    } else {
      this.resetFormState();
    }
  }

  // load the audits dropdown list based on the selected property
  onPropertyChange(
    propertyId: string,
    preselectedAuditId?: string,
    preselectedFloorId?: string,
    preselectedAreaId?: string
  ): void {
    if (propertyId) {
      this.auditsService.getAuditsByPropertyId(propertyId).subscribe(
        (data: any[]) => {
          this.audits = data;
          this.showAudits = true;
          this.showFloors = false;
          this.showAreas = false;
          this.floors = [];
          this.areas = [];
          this.fireDoorForm.patchValue({
            auditId: preselectedAuditId || '',
            floorId: '',
            areaId: '',
          });
          if (preselectedAuditId) {
            this.onAuditChange(
              preselectedAuditId,
              preselectedFloorId,
              preselectedAreaId
            );
          }
        },
        (error) => {
          console.error('Error fetching audits:', error);
          this.errorHandlerService.redirectToErrorPage();
        }
      );
    } else {
      this.resetFormState();
    }
  }

  // load the floors dropdown list based on the selected audit
  onAuditChange(
    auditId: string,
    preselectedFloorId?: string,
    preselectedAreaId?: string
  ): void {
    if (auditId) {
      this.floorsService.getFloorsByAuditId(auditId).subscribe(
        (data: any[]) => {
          this.floors = data;
          this.showFloors = true;
          this.showAreas = false;
          this.areas = [];
          this.fireDoorForm.patchValue({
            floorId: preselectedFloorId || '',
            areaId: '',
          });
          if (preselectedFloorId) {
            this.onFloorChange(preselectedFloorId, preselectedAreaId);
          }
        },
        (error) => {
          console.error('Error fetching floors:', error);
          this.errorHandlerService.redirectToErrorPage();
        }
      );
    } else {
      this.resetFormState();
    }
  }

  // load the areas dropdown list based on the selected floor
  onFloorChange(floorId: string, preselectedAreaId?: string): void {
    if (floorId) {
      this.areasService.getAreasByFloorId(floorId).subscribe(
        (data: any[]) => {
          this.areas = data;
          this.showAreas = true;
          this.fireDoorForm.patchValue({
            areaId: preselectedAreaId || '',
          });
        },
        (error) => {
          console.error('Error fetching areas:', error);
          this.errorHandlerService.redirectToErrorPage();
        }
      );
    } else {
      this.resetFormState();
    }
  }

  // Reset the form state and dropdowns to initial values
  resetFormState(): void {
    this.showProperties = false;
    this.showAudits = false;
    this.showFloors = false;
    this.showAreas = false;
    this.properties = [];
    this.audits = [];
    this.floors = [];
    this.areas = [];
    this.fireDoorForm.patchValue({ auditId: '', floorId: '', areaId: '' });
  }

  // Submit the form to update the fire door data
  onSubmit(): void {
    if (this.fireDoorForm.valid) {
      this.fireDoorsService.updateFireDoor(this.fireDoorForm.value).subscribe(
        (response: any) => {
          console.log('Fire door updated successfully', response);
          this.router.navigate(['/fire-doors']);
        },
        (error) => {
          console.error('Error updating fire door:', error);
          this.errorHandlerService.redirectToErrorPage();
        }
      );
    }
  }

  // Redirect to the fire doors list page
  onEditCancel(): void {
    this.router.navigate(['/fire-doors']);
  }
}
