import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminServiceService } from '../service/admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<boolean> {

  constructor(private adminService: AdminServiceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // return of(true);

    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625"
    }
    return this.adminService.requestDataFromMultipleSources(payload);
  }
}
