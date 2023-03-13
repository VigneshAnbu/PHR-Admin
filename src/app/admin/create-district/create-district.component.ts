import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../shared/service/admin-service.service';
import { DataService } from '../../shared/service/data.service';

@Component({
  selector: 'app-create-district',
  templateUrl: './create-district.component.html',
  styleUrls: ['./create-district.component.scss']
})
export class CreateDistrictComponent {
  isLinear = false;
  states: any[] = [];
  //hudform: any;
  hudform !: FormGroup;

  districts: any[] = [];

  constructor(private formBuilder: FormBuilder, private adminService: AdminServiceService, private router: Router, private dataService: DataService, private route: ActivatedRoute) {

  }
  headingname: any = "Add District";
  district_id: any = "";
  ngOnInit() {
    /*this.districts = this.dataService.districts;*/
    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625"
    }
    this.adminService.getstatesdata(payload).subscribe((data: any) => {
      this.states = data.data;
    });
    this.district_id = this.route.snapshot.paramMap.get('district_id') == null ? "0" : this.route.snapshot.paramMap.get('district_id');
    if (this.district_id == "0")
      this.createForm();
    else
      this.edithudload()
  }
  createForm() {
    this.hudform = this.formBuilder.group({
      state: [''],
      district: [''],
      district_id: [''],
      district_gid: [''],
      district_name: [''],
      active: [''],
      district_local_name: [''],
      district_lgd_code: [''],
      district_picme_code: [''],
      district_rd_code: [''],
      district_rev_code: [''],
      district_short_code: [''],
    });
  }
  navigateBack() {
    this.router.navigate(['/admin/district-management'])
  }
  savehud() {
    if (this.hudform.invalid) {
      alert("Fill All Required Fields");
      return;
    }
    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_PHR_ROLE": "STATE_ADMIN",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "HUD_DATA": {
        "district_id": this.hudform.value.district ? this.hudform.value.district : '',
        "hud_id": this.hudform.value.hud_id ? this.hudform.value.hud_id : '',
        "hud_local_name": this.hudform.value.hud_local_name ? this.hudform.value.hud_local_name : '',
        "hud_short_code": this.hudform.value.hud_short_code ? this.hudform.value.hud_short_code : '',
        "hud_gid": this.hudform.value.hud_gid ? parseInt(this.hudform.value.hud_gid) : null,
        "hud_name": this.hudform.value.hud_name ? this.hudform.value.hud_name : '',
        "active": this.hudform.value.hud_active == '1' ? true : false
      },
      "TARGET_HSC": "0b008a37-34a6-455f-88e5-c609f6f7e808"
    }
    console.log(payload);
    //if (this.personalDetailForm.invalid) {
    //  return;
    //}
    alert("Saved Successfully...");
    //this.adminService.savehuddata(payload).subscribe((data: any) => {
      
    //  this.router.navigate(['/admin/hud-management'])
    //});
  }

  edithudload() {

    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS": {
        "DISTRICT_NAME": "",
        "DISTRICT_GID": parseInt(this.district_id),
      },
      "LIMIT": 200,
      "OFFSET": 0
    }
    this.hudform = this.formBuilder.group({
      state: [''],
      district: [''],
      district_id: [''],
      district_gid: [''],
      district_name: [''],
      active: [''],
      district_local_name: [''],
      district_lgd_code: [''],
      district_picme_code: [''],
      district_rd_code: [''],
      district_rev_code: [''],
      district_short_code: [''],
    });
    this.adminService.getDistrictlist(payload).subscribe((data: any) => {
      console.log(data.data)
      this.headingname = "Edit District (" + data.data[0].district_name + " - " + data.data[0].district_gid + ")";
      this.hudform = this.formBuilder.group({
        state: [data.data[0].state_id],
        district: [data.data[0].district_id],
        district_id: [data.data[0].district_id],
        district_gid: [data.data[0].district_gid],
        district_name: [data.data[0].district_name],
        active: [data.data[0].active == true ? '1' : '0'],
        district_local_name: [data.data[0].district_local_name == null ? '' : data.data[0].district_local_name],
        district_lgd_code: [data.data[0].district_lgd_code == null ? '' : data.data[0].district_lgd_code],
        district_picme_code: [data.data[0].district_picme_code == null ? '' : data.data[0].district_picme_code],
        district_rd_code: [data.data[0].district_rd_code == null ? '' : data.data[0].district_rd_code],
        district_rev_code: [data.data[0].district_rev_code == null ? '' : data.data[0].district_rev_code],
        district_short_code: [data.data[0].district_short_code == null ? '' : data.data[0].district_short_code],
      });
    }, error => {

    });
  }

}

