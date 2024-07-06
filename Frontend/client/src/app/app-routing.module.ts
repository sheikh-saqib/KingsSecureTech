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

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'audit-companies', component: AuditCompaniesComponent },
  { path: 'audits', component: AuditsComponent },
  { path: 'fire-doors', component: FireDoorsComponent },
  { path: 'risks', component: RisksComponent },
  { path: 'add-fire-door', component: AddFireDoorComponent },
  { path: 'edit-fire-door/:id', component: EditFireDoorComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
