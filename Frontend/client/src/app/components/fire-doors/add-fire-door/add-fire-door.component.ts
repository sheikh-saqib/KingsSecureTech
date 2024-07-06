import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireDoorsService } from 'src/app/services/fire-doors.service';
import { ClientsService } from 'src/app/services/clients.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { AuditService } from 'src/app/services/audits.service';
import { FloorsService } from 'src/app/services/floors.service';
import { AreasService } from 'src/app/services/areas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-fire-door',
  templateUrl: './add-fire-door.component.html',
  styleUrls: ['./add-fire-door.component.css'],
})
export class AddFireDoorComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private fireDoorsService: FireDoorsService,
    private clientsService: ClientsService,
    private propertiesService: PropertiesService,
    private auditsService: AuditService,
    private floorsService: FloorsService,
    private areasService: AreasService,
    private router: Router
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
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });
  }

  onClientChange(clientId: string): void {
    if (clientId) {
      this.propertiesService
        .getPropertiesByClientId(clientId)
        .subscribe((data: any[]) => {
          this.properties = data;
          this.showProperties = true;
          this.showAudits = false;
          this.showFloors = false;
          this.showAreas = false;
          this.audits = [];
          this.floors = [];
          this.areas = [];
          this.fireDoorForm.patchValue({
            propertyId: '',
            auditId: '',
            floorId: '',
            areaId: '',
          });
        });
    } else {
      this.showProperties = false;
      this.showAudits = false;
      this.showFloors = false;
      this.showAreas = false;
      this.properties = [];
      this.audits = [];
      this.floors = [];
      this.areas = [];
      this.fireDoorForm.patchValue({
        propertyId: '',
        auditId: '',
        floorId: '',
        areaId: '',
      });
    }
  }

  onPropertyChange(propertyId: string): void {
    if (propertyId) {
      this.auditsService
        .getAuditsByPropertyId(propertyId)
        .subscribe((data: any[]) => {
          this.audits = data;
          this.showAudits = true;
          this.showFloors = false;
          this.showAreas = false;
          this.floors = [];
          this.areas = [];
          this.fireDoorForm.patchValue({
            auditId: '',
            floorId: '',
            areaId: '',
          });
        });
    } else {
      this.showAudits = false;
      this.showFloors = false;
      this.showAreas = false;
      this.audits = [];
      this.floors = [];
      this.areas = [];
      this.fireDoorForm.patchValue({ auditId: '', floorId: '', areaId: '' });
    }
  }

  onAuditChange(auditId: string): void {
    if (auditId) {
      this.floorsService
        .getFloorsByAuditId(auditId)
        .subscribe((data: any[]) => {
          this.floors = data;
          this.showFloors = true;
          this.showAreas = false;
          this.areas = [];
          this.fireDoorForm.patchValue({ floorId: '', areaId: '' });
        });
    } else {
      this.showFloors = false;
      this.showAreas = false;
      this.floors = [];
      this.areas = [];
      this.fireDoorForm.patchValue({ floorId: '', areaId: '' });
    }
  }

  onFloorChange(floorId: string): void {
    if (floorId) {
      this.areasService.getAreasByFloorId(floorId).subscribe((data: any[]) => {
        this.areas = data;
        this.showAreas = true;
        this.fireDoorForm.patchValue({ areaId: '' });
      });
    } else {
      this.showAreas = false;
      this.areas = [];
      this.fireDoorForm.patchValue({ areaId: '' });
    }
  }

  onSubmit(): void {
    if (this.fireDoorForm.valid) {
      this.fireDoorsService
        .addFireDoor(this.fireDoorForm.value)
        .subscribe((response: any) => {
          console.log('Fire door added successfully', response);
          this.router.navigate(['/fire-doors']);
        });
    }
  }
}
