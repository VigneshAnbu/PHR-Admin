import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor( private http: HttpClient, private dataService: DataService) { }

  getUsers(payload: any) {
      return this.http.post('admin_api_get_user_list', payload);
  }
  getDistricts(payload: any) {
    return this.http.post('admin_api_get_district_master', payload);
  }
  getDistrictlist(payload: any) {
    return this.http.post('admin_api_get_district_list', payload);
  }

  getBlocks(payload: any) {
    return this.http.post('admin_api_get_block_master', payload);
  }
  getFacility(payload: any) {
    return this.http.post('admin_api_get_facility_master', payload);
  }
  getRole(payload: any) {
    return this.http.post('admin_api_get_role_master', payload);
  }

  getstreets(payload:any){
    return this.http.post('admin_api_get_street_list',payload);
  }

  getVillages (payload:any){
    return this.http.post('admin_api_get_village_list',payload);
  }

  getHabitation (payload:any){
    return this.http.post('admin_api_get_habitation_master',payload);
  }

  getfacilityList (payload:any){
    return this.http.post('admin_api_get_facility_list',payload);
  }


  getHUDList (payload:any){
    return this.http.post('admin_api_get_hud_list',payload);
  }

  getRevVillage (payload:any){
    return this.http.post('admin_api_get_rev_village_list',payload);
  }

  getconstituencyassembly (payload:any){
    return this.http.post('admin_api_get_constituency_assembly_master',payload);
  }

  getconstituencyparliamentary (payload:any){
    return this.http.post('admin_api_get_constituency_parliamentary',payload);
  }

  savestreetlist(payload:any){
    return this.http.post('admin_api_upsert_street',payload);
  }

  
  

  //facility master 
  getfacilitymasterList(payload: any) {
    return this.http.post('admin_api_get_facility_master', payload);
  }
  getfacilitycategoryList(payload: any) {
    return this.http.post('admin_api_get_facility_category_master', payload);
  }
  getfacilitydirectorateList(payload: any) {
    return this.http.post('admin_api_get_facility_directorate_master', payload);
  }
  getfacilitylevelList(payload: any) {
    return this.http.post('admin_api_get_facility_level_master', payload);
  }
  getfacilityownerList(payload: any) {
    return this.http.post('admin_api_get_facility_owner_master', payload);
  }  
  getfacilitytypeList(payload: any) {
    return this.http.post('admin_api_get_facility_type_master', payload);
  }
  getblockbyfilter(payload: any) {
    return this.http.post('admin_api_get_block_list', payload);
  }
  savefacilitydata(payload: any) {
    return this.http.post('admin_api_upsert_facility', payload);
  }
  savehuddata(payload: any) {
    return this.http.post('admin_api_upsert_hud', payload);
  }
  savevillagedata(payload: any) {
    return this.http.post('admin_api_upsert_village', payload);
  }
  //taluk
  gettaluklist(payload: any) {
    return this.http.post('admin_api_get_taluk_list', payload);
  }
  savetalukdata(payload: any) {
    return this.http.post('admin_api_upsert_taluk', payload);
  }
  //district
  getstatesdata(payload: any) {
    return this.http.post('admin_api_get_state_master', payload);
  }

  requestDataFromMultipleSources(payload: any): Observable<any> {
    let districtListAPI = this.http.post('admin_api_get_district_master', payload);
    let blockListAPI = this.http.post('admin_api_get_block_master', payload);
    let roleListAPI = this.http.post('admin_api_get_role_master', payload);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([districtListAPI, blockListAPI, roleListAPI]).pipe(map(([districtList, blockList, roleList]) => {
         this.dataService.districts = (districtList as any).data;
         this.dataService.blocks = (blockList as any).data;
         this.dataService.roles = (roleList as any).data;
    }));
  }
}
