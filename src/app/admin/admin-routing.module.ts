import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatestreetComponent } from '../createstreet/createstreet.component';
import { DataResolver } from '../shared/resolvers/data.resolver';
import { StreetComponent } from '../street/street.component';
import { CreateDistrictComponent } from './create-district/create-district.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DistrictManagementComponent } from './district-management/district-management.component';
import { FacilityAddComponent } from './facility-add/facility-add.component';
import { FacilityManagementComponent } from './facility-management/facility-management.component';
import { HudAddComponent } from './hud-add/hud-add.component';
import { HudManagementComponent } from './hud-management/hud-management.component';
import { IndexComponent } from './index/index.component';
import { RevVillageAddComponent } from './rev-village-add/rev-village-add.component';
import { RevVillageManagementComponent } from './rev-village-management/rev-village-management.component';
import { TalukAddComponent } from './taluk-add/taluk-add.component';
import { TalukManagementComponent } from './taluk-management/taluk-management.component';
import { UpsertUserRegistrationComponent } from './upsert-user-registration/upsert-user-registration.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { VillageAddComponent } from './village-add/village-add.component';
import { VillageManagementComponent } from './village-management/village-management.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    resolve: { data:  DataResolver},
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'user-management',
        component: UserRegistrationComponent
      },
      {
        path: 'createUser',
        component: UpsertUserRegistrationComponent
      }
      ,
      {
        path: 'street-management',
        component: StreetComponent
      }
      ,
      {
        path: 'district-management',
        component: DistrictManagementComponent
      }
      ,
      {
        path: 'create-district/:district_id',
        component: CreateDistrictComponent
      }
      ,
      {
        path: 'street-add/:paramstreet_id',
        component: CreatestreetComponent
      },
      {
        path: 'facility-management',
        component: FacilityManagementComponent
      },
      {
        path: 'facility-add/:facility_id',
        component: FacilityAddComponent        
      },
      {
        path: 'hud-management',
        component: HudManagementComponent
      },
      {
        path: 'hud-add/:hud_gid',
        component: HudAddComponent
      },
      {
        path: 'village-management',
        component: VillageManagementComponent
      },
      {
        path: 'village-add/:village_gid',
        component: VillageAddComponent
      },
      {
        path: 'taluk-management',
        component: TalukManagementComponent
      },
      {
        path: 'taluk-add/:taluk_gid',
        component: TalukAddComponent
      },
      {
        path: 'revvillage-management',
        component: RevVillageManagementComponent
      },
      {
        path: 'revvillage-add/:village_gid',
        component: RevVillageAddComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
