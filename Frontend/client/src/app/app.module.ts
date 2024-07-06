import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AuditCompaniesComponent } from './components/audit-companies/audit-companies.component';
import { AuditsComponent } from './components/audits/audits.component';
import { FireDoorsComponent } from './components/fire-doors/fire-doors.component';
import { RisksComponent } from './components/risks/risks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFireDoorComponent } from './components/fire-doors/add-fire-door/add-fire-door.component';
import { EditFireDoorComponent } from './components/fire-doors/edit-fire-door/edit-fire-door.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PropertiesComponent,
    ClientsComponent,
    AuditCompaniesComponent,
    AuditsComponent,
    FireDoorsComponent,
    RisksComponent,
    AddFireDoorComponent,
    EditFireDoorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
