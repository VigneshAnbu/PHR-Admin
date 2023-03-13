import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../shared/service/admin-service.service';
import { DataService } from '../../shared/service/data.service';

@Component({
  selector: 'app-hud-add',
  templateUrl: './hud-add.component.html',
  styleUrls: ['./hud-add.component.scss']
})
export class HudAddComponent {
  isLinear = false;
  //hudform: any;
  hudform !: FormGroup;

  districts: any[] = [];

  constructor(private formBuilder: FormBuilder, private adminService: AdminServiceService, private router: Router, private dataService: DataService, private route: ActivatedRoute) {
 
  }
  headingname: any = "Add HUD";
  hud_gid: any = "";
  ngOnInit() {
    this.districts = this.dataService.districts;
    this.hud_gid = this.route.snapshot.paramMap.get('hud_gid') == null ? "0" : this.route.snapshot.paramMap.get('hud_gid');
    if (this.hud_gid=="0")
      this.createForm();
    else
      this.edithudload()
  }
  createForm() {
    this.hudform = this.formBuilder.group({
      district: [''],
      hud_id: [''],
      hud_gid: [''],
      hud_name: [''],
      hud_active: [''],
      hud_local_name: [''],
      hud_short_code: ['']
    });
  }
  navigateBack() {
    this.router.navigate(['/admin/hud-management'])
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
    this.adminService.savehuddata(payload).subscribe((data: any) => {
      alert("Saved Successfully...");
      this.router.navigate(['/admin/hud-management'])
    });
  }

  edithudload() {

    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "USER_PHR_ROLE": "STATE_ADMIN",
      "FILTERS": {
        "DISTRICT_ID": '',
        "HUD_NAME": '',
        "HUD_GID":parseInt(this.hud_gid),
      },
      "LIMIT": 200,
      "OFFSET": 0
    }
    this.hudform = this.formBuilder.group({
      district: [''],
      hud_name: [''],
      hud_active: [''],
      hud_local_name: [''],
      hud_short_code: ['']
    });
    this.adminService.getHUDList(payload).subscribe((data: any) => {
      this.headingname = "Edit HUD (" + data.data[0].hud_name + " - " + data.data[0].hud_gid + ")";
      
      this.hudform = this.formBuilder.group({
        district: [data.data[0].district_id],
        hud_id: [data.data[0].hud_id],        
        hud_gid: [data.data[0].hud_gid],        
        hud_name: [data.data[0].hud_name],        
        hud_active: [data.data[0].active==true?'1':'0'],
        hud_local_name: [data.data[0].hud_local_name == null ? '' : data.data[0].hud_local_name],
        hud_short_code: [data.data[0].hud_short_code == null ? '' : data.data[0].hud_short_code]
      });
    }, error => {

    });
  }

}
