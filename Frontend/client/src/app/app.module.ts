import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AuditCompaniesComponent } from './components/audit-companies/audit-companies.component';
import { AuditsComponent } from './components/audits/audits.component';
import { FireDoorsComponent } from './components/fire-doors/fire-doors.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PropertiesComponent,
    ClientsComponent,
    AuditCompaniesComponent,
    AuditsComponent,
    FireDoorsComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
