import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RisksService } from 'src/app/services/risks.service';
import { ClientsService } from 'src/app/services/clients.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { AuditService } from 'src/app/services/audits.service';
import { FloorsService } from 'src/app/services/floors.service';
import { AreasService } from 'src/app/services/areas.service';
import { Router } from '@angular/router';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-add-risk',
  templateUrl: './add-risk.component.html',
  styleUrls: ['./add-risk.component.css'],
})
export class AddRiskComponent implements OnInit {
  riskForm: FormGroup;
  clients: any[] = [];
  properties: any[] = [];
  audits: any[] = [];
  floors: any[] = [];
  areas: any[] = [];
  showProperties = false;
  showAudits = false;
  showFloors = false;
  showAreas = false;

  // priority dropdown enum
  priorityOptions = [
    { label: 'Very High', value: 1 },
    { label: 'High', value: 2 },
    { label: 'Medium', value: 3 },
    { label: 'Low', value: 4 },
  ];

  constructor(
    private fb: FormBuilder,
    private risksService: RisksService,
    private clientsService: ClientsService,
    private propertiesService: PropertiesService,
    private auditsService: AuditService,
    private floorsService: FloorsService,
    private areasService: AreasService,
    private router: Router,
    private errorHandlerService: ErrorsService
  ) {
    // Initialize form group with required fields
    this.riskForm = this.fb.group({
      clientId: ['', Validators.required],
      propertyId: ['', Validators.required],
      auditId: ['', Validators.required],
      floorId: ['', Validators.required],
      areaId: ['', Validators.required],
      riskId: ['', Validators.required],
      observation: ['', Validators.required],
      recommendation: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  //load clients dropdown
  loadClients(): void {
    this.clientsService.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });
  }

  //populate properties filter dropdown on client change
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
          this.riskForm.patchValue({
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
      this.riskForm.patchValue({
        propertyId: '',
        auditId: '',
        floorId: '',
        areaId: '',
      });
    }
  }

  //populate audits filter dropdown on properties change
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
          this.riskForm.patchValue({
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
      this.riskForm.patchValue({ auditId: '', floorId: '', areaId: '' });
    }
  }

  //populate Floors filter dropdown on audit change
  onAuditChange(auditId: string): void {
    if (auditId) {
      this.floorsService
        .getFloorsByAuditId(auditId)
        .subscribe((data: any[]) => {
          this.floors = data;
          this.showFloors = true;
          this.showAreas = false;
          this.areas = [];
          this.riskForm.patchValue({ floorId: '', areaId: '' });
        });
    } else {
      this.showFloors = false;
      this.showAreas = false;
      this.floors = [];
      this.areas = [];
      this.riskForm.patchValue({ floorId: '', areaId: '' });
    }
  }

  //populate Areas filter dropdown on floor change
  onFloorChange(floorId: string): void {
    if (floorId) {
      this.areasService.getAreasByFloorId(floorId).subscribe((data: any[]) => {
        this.areas = data;
        this.showAreas = true;
        this.riskForm.patchValue({ areaId: '' });
      });
    } else {
      this.showAreas = false;
      this.areas = [];
      this.riskForm.patchValue({ areaId: '' });
    }
  }

  //submit form to add new risk to the database
  onSubmit(): void {
    if (this.riskForm.valid) {
      this.risksService.addRisk(this.riskForm.value).subscribe(
        (response: any) => {
          console.log('Risk added successfully', response);
          this.router.navigate(['/risks']);
        },
        (error) => {
          console.error('Error adding risk:', error);
          this.errorHandlerService.redirectToErrorPage();
        }
      );
    }
  }
  //cancel button to navigate back to risks page
  onCancel() {
    this.router.navigate(['/risks']);
  }
}
