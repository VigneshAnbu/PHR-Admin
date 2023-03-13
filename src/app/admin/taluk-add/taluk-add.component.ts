import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../shared/service/admin-service.service';
import { DataService } from '../../shared/service/data.service';

@Component({
  selector: 'app-taluk-add',
  templateUrl: './taluk-add.component.html',
  styleUrls: ['./taluk-add.component.scss']
})
export class TalukAddComponent {
  isLinear = false;
  //hudform: any;
  hudform !: FormGroup;

  districts: any[] = [];

  constructor(private formBuilder: FormBuilder, private adminService: AdminServiceService, private router: Router, private dataService: DataService, private route: ActivatedRoute) {

  }
  headingname: any = "Add Taluk";
  taluk_gid: any = "";
  ngOnInit() {
    this.districts = this.dataService.districts;
    this.taluk_gid = this.route.snapshot.paramMap.get('taluk_gid') == null ? "0" : this.route.snapshot.paramMap.get('taluk_gid');
    if (this.taluk_gid == "0")
      this.createForm();
    else
      this.edithudload()
  }
  createForm() {
    this.hudform = this.formBuilder.group({
      district: [''],
      taluk_id: [''],
      taluk_gid: [''],
      taluk_name: [''],
      taluk_active: [''],
      taluk_local_name: [''],
      lgd_code: ['']
    });
  }
  navigateBack() {
    this.router.navigate(['/admin/taluk-management'])
  }
  savehud() {
    if (this.hudform.invalid) {
      alert("Fill All Required Fields");
      return;
    }
    const payload = {

      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "TALUK_DATA": {
        "taluk_id": this.hudform.value.taluk_id ? this.hudform.value.taluk_id : '',
        "taluk_gid": this.hudform.value.taluk_gid ? this.hudform.value.taluk_gid : null,
        "district_id": this.hudform.value.district ? this.hudform.value.district : '',
        "taluk_name": this.hudform.value.taluk_name ? this.hudform.value.taluk_name : '',
        "taluk_local_name": this.hudform.value.taluk_local_name ? this.hudform.value.taluk_local_name : '',
        "taluk_lgd_code": this.hudform.value.lgd_code ? this.hudform.value.lgd_code : '',
        "active": this.hudform.value.taluk_active == '1' ? true : false

      }
    }    
    console.log(payload);
    //this.adminService.savetalukdata(payload).subscribe((data: any) => {
    //  alert("Saved Successfully...");
    //  this.router.navigate(['/admin/taluk-management'])
    //});
  }

  edithudload() {

    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS":
      {
        "TALUK_GID": parseInt(this.taluk_gid),
        "TALUK_NAME": "",
        "DISTRICT_ID": ""
      },
      "LIMIT": 10,
      "OFFSET": 0
    }
    this.hudform = this.formBuilder.group({
      district: [''],
      taluk_id: [''],
      taluk_gid: [''],
      taluk_name: [''],
      taluk_active: [''],
      taluk_local_name: [''],
      lgd_code: ['']
    });
    this.adminService.gettaluklist(payload).subscribe((data: any) => {
      this.headingname = "Edit Taluk (" + data.data[0].taluk_name + " - " + data.data[0].taluk_gid + ")";
      console.log(data.data)
      this.hudform = this.formBuilder.group({
        district: [data.data[0].district_id],
        taluk_id: [data.data[0].taluk_id],
        taluk_gid: [data.data[0].taluk_gid],
        taluk_name: [data.data[0].taluk_name],
        taluk_active: [data.data[0].active == true ? '1' : '0'],
        taluk_local_name: [data.data[0].taluk_local_name == null ? '' : data.data[0].taluk_local_name],
        lgd_code: [data.data[0].taluk_lgd_code == null ? '' : data.data[0].taluk_lgd_code]
      });
    }, error => {

    });
  }

}
