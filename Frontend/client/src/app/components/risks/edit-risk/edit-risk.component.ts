import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasService } from 'src/app/services/areas.service';
import { AuditService } from 'src/app/services/audits.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { RisksService } from 'src/app/services/risks.service';
import { FloorsService } from 'src/app/services/floors.service';

@Component({
  selector: 'app-edit-risk',
  templateUrl: './edit-risk.component.html',
  styleUrls: ['./edit-risk.component.css'],
})
export class EditRiskComponent implements OnInit {
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
  riskId: string;
  priorityOptions = [
    { label: 'VeryHigh', value: 1 },
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
    private route: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorsService // Inject error handler service
  ) {
    this.riskForm = this.fb.group({
      clientId: ['', Validators.required],
      propertyId: ['', Validators.required],
      auditId: ['', Validators.required],
      floorId: ['', Validators.required],
      areaId: ['', Validators.required],
      riskId: ['', Validators.required],
      observation: [''],
      recommendation: [''],
      priority: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.riskId = this.route.snapshot.params['id']; // Assuming the route param is 'id'

    if (this.riskId) {
      this.loadRiskData();
    } else {
      this.errorHandlerService.redirectToErrorPage();
    }

    this.loadClients(); // Load clients initially
  }

  loadRiskData(): void {
    this.risksService.getRiskById(this.riskId).subscribe(
      (data: any) => {
        // Convert priority string to its corresponding number
        const priorityMapping: { [key: string]: number } = {
          VeryHigh: 1,
          High: 2,
          Medium: 3,
          Low: 4,
        };

        // Patch form values with data retrieved
        this.riskForm.patchValue({
          riskId: data[0].riskId,
          observation: data[0].observation,
          recommendation: data[0].recommendation,
          priority: priorityMapping[data[0].priority],
          areaId: data[0].areaId,
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
        console.error('Error fetching risk:', error);
        this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
      }
    );
  }

  loadClients(): void {
    this.clientsService.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });
  }

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
          this.riskForm.patchValue({
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
          this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
        }
      );
    } else {
      this.resetFormState();
    }
  }

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
          this.riskForm.patchValue({
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
          this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
        }
      );
    } else {
      this.resetFormState();
    }
  }

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
          this.riskForm.patchValue({
            floorId: preselectedFloorId || '',
            areaId: '',
          });
          if (preselectedFloorId) {
            this.onFloorChange(preselectedFloorId, preselectedAreaId);
          }
        },
        (error) => {
          console.error('Error fetching floors:', error);
          this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
        }
      );
    } else {
      this.resetFormState();
    }
  }

  onFloorChange(floorId: string, preselectedAreaId?: string): void {
    if (floorId) {
      this.areasService.getAreasByFloorId(floorId).subscribe(
        (data: any[]) => {
          this.areas = data;
          this.showAreas = true;
          this.riskForm.patchValue({
            areaId: preselectedAreaId || '',
          });
        },
        (error) => {
          console.error('Error fetching areas:', error);
          this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
        }
      );
    } else {
      this.resetFormState();
    }
  }

  resetFormState(): void {
    this.showProperties = false;
    this.showAudits = false;
    this.showFloors = false;
    this.showAreas = false;
    this.properties = [];
    this.audits = [];
    this.floors = [];
    this.areas = [];
    this.riskForm.patchValue({ auditId: '', floorId: '', areaId: '' });
  }

  onSubmit(): void {
    if (this.riskForm.valid) {
      // Convert the priority number back to its corresponding string
      const priorityMapping: { [key: number]: string } = {
        1: 'VeryHigh',
        2: 'High',
        3: 'Medium',
        4: 'Low',
      };

      const formValue = this.riskForm.value;
      const payload = {
        ...formValue,
        priority: priorityMapping[formValue.priority],
      };

      this.risksService.updateRisk(payload).subscribe(
        (response: any) => {
          console.log('Risk updated successfully', response);
          this.router.navigate(['/risks']);
        },
        (error) => {
          console.error('Error updating risk:', error);
          this.errorHandlerService.redirectToErrorPage(); // Redirect to error page on error
        }
      );
    }
  }

  onEditCancel(): void {
    this.router.navigate(['/risks']);
  }
}
