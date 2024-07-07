import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { AuditCompaniesComponent } from './components/audit-companies/audit-companies.component';
import { AuditsComponent } from './components/audits/audits.component';
import { FireDoorsComponent } from './components/fire-doors/fire-doors.component';
import { RisksComponent } from './components/risks/risks.component';
import { AddFireDoorComponent } from './components/fire-doors/add-fire-door/add-fire-door.component';
import { EditFireDoorComponent } from './components/fire-doors/edit-fire-door/edit-fire-door.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddRiskComponent } from './components/risks/add-risk/add-risk.component';
import { EditRiskComponent } from './components/risks/edit-risk/edit-risk.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'audit-companies', component: AuditCompaniesComponent },
  { path: 'audits', component: AuditsComponent },
  { path: 'fire-doors', component: FireDoorsComponent },
  { path: 'risks', component: RisksComponent },
  { path: 'add-fire-door', component: AddFireDoorComponent },
  { path: 'edit-fire-door/:id', component: EditFireDoorComponent },
  { path: 'add-risk', component: AddRiskComponent },
  { path: 'edit-risk/:id', component: EditRiskComponent },
  { path: 'error', component: ErrorsComponent },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
