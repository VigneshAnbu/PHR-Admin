import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../shared/material.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UpsertUserRegistrationComponent } from './upsert-user-registration/upsert-user-registration.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { StreetComponent } from '../street/street.component';
import { FacilityManagementComponent } from './facility-management/facility-management.component';
import { FacilityAddComponent } from './facility-add/facility-add.component';
import { HudManagementComponent } from './hud-management/hud-management.component';
import { DistrictManagementComponent } from './district-management/district-management.component';
import { CreateDistrictComponent } from './create-district/create-district.component';
import { HudAddComponent } from './hud-add/hud-add.component';
import { VillageManagementComponent } from './village-management/village-management.component';
import { VillageAddComponent } from './village-add/village-add.component';
import { TalukManagementComponent } from './taluk-management/taluk-management.component';
import { TalukAddComponent } from './taluk-add/taluk-add.component';
import { RevVillageManagementComponent } from './rev-village-management/rev-village-management.component';
import { RevVillageAddComponent } from './rev-village-add/rev-village-add.component';


@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    UserRegistrationComponent,
    UpsertUserRegistrationComponent,
    StreetComponent,
    FacilityManagementComponent,
    FacilityAddComponent,
    HudManagementComponent,
    DistrictManagementComponent,
    CreateDistrictComponent,
    HudAddComponent,
    VillageManagementComponent,
    VillageAddComponent,
    TalukManagementComponent,
    TalukAddComponent,
    RevVillageManagementComponent,
    RevVillageAddComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatExpansionModule,
    MatCardModule,
    FontAwesomeModule,
    MatStepperModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class AdminModule { }
