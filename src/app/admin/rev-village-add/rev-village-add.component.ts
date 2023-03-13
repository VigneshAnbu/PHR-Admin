import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../shared/service/admin-service.service';
import { DataService } from '../../shared/service/data.service';

@Component({
  selector: 'app-rev-village-add',
  templateUrl: './rev-village-add.component.html',
  styleUrls: ['./rev-village-add.component.scss']
})
export class RevVillageAddComponent {

  isLinear = false;
  //hudform: any;
  hudform!: FormGroup;

  districts: any[] = [];
  talukfull: any[] = [];
  taluks: any[] = [];

  constructor(private formBuilder: FormBuilder, private adminService: AdminServiceService, private router: Router, private dataService: DataService, private route: ActivatedRoute) {

  }
  headingname: any = "Add Taluk";
  village_gid: any = "";
  ngOnInit() {
    this.talukload();
    this.districts = this.dataService.districts;
    this.village_gid = this.route.snapshot.paramMap.get('village_gid') == null ? "0" : this.route.snapshot.paramMap.get('taluk_gid');
    if (this.village_gid == "0")
      this.createForm();
    else
      this.edithudload()

   
  }
  createForm() {
    this.hudform = this.formBuilder.group({
      district: [''],
      village_id: [''],
      village_gid: [''],
      village_name: [''],
      village_active: [''],
      village_local_name: [''],
      firka_id: [''],
      firka_name: ['']
    });
  }
  navigateBack() {
    this.router.navigate(['/admin/revvillage-management'])
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
      "REV_VILLAGE_DATA": {
        "rev_village_id": this.hudform.value.village_id ? this.hudform.value.village_id : '',
        "rev_village_name": this.hudform.value.village_name ? this.hudform.value.village_name : '',
        "rev_village_local_name": this.hudform.value.village_local_name ? this.hudform.value.village_local_name : '',
        "rev_village_gid": this.hudform.value.village_gid ? this.hudform.value.village_gid : null,
        "district_id": this.hudform.value.district ? this.hudform.value.district : '',
        "taluk_id": this.hudform.value.taluk ? this.hudform.value.taluk : '',
        "firka_id": this.hudform.value.firka_id ? this.hudform.value.firka_id : '',
        "firka_name": this.hudform.value.firka_name ? this.hudform.value.firka_name : '',
        "active": this.hudform.value.village_active == '1' ? true : false
      }
    }
    //{

    //    "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
    //    "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
    //    "TALUK_DATA": {
    //      "taluk_id": this.hudform.value.taluk_id ? this.hudform.value.taluk_id : '',
    //      "taluk_gid": this.hudform.value.taluk_gid ? this.hudform.value.taluk_gid : null,
    //      "district_id": this.hudform.value.district ? this.hudform.value.district : '',
    //      "taluk_name": this.hudform.value.taluk_name ? this.hudform.value.taluk_name : '',
    //      "taluk_local_name": this.hudform.value.taluk_local_name ? this.hudform.value.taluk_local_name : '',
    //      "taluk_lgd_code": this.hudform.value.lgd_code ? this.hudform.value.lgd_code : '',
    //      "active": this.hudform.value.taluk_active == '1' ? true : false

    //    }
    //  }
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
      "FILTERS": {
        "DISTRICT_ID": "",
        "TALUK_ID": "",
        "REV_VILLAGE_NAME": "",
        "REV_VILLAGE_GID": parseInt(this.village_gid)
      },
      "LIMIT": 10,
      "OFFSET": 0
    }

    this.hudform = this.formBuilder.group({
      district: [''],
      taluk:[''],
      village_id: [''],
      village_gid: [''],
      village_name: [''],
      village_active: [''],
      village_local_name: [''],
      firka_id: [''],
      firka_name: ['']
    });
    this.adminService.getRevVillage(payload).subscribe((data: any) => {
      this.headingname = "Edit Revenue Village (" + data.data[0].rev_village_name + " - " + data.data[0].taluk_gid + ")";
      console.log(data.data)
      this.hudform = this.formBuilder.group({
        district: [data.data[0].district_id],
        taluk: [data.data[0].taluk_id],
        village_gid: [data.data[0].rev_village_gid],
        village_name: [data.data[0].rev_village_name],
        village_active: [data.data[0].active == true ? '1' : '0'],
        village_local_name: [data.data[0].rev_village_local_name == null ? '' : data.data[0].rev_village_local_name],
        firka_id: [data.data[0].firka_id == null ? '' : data.data[0].firka_id],
        firka_name: [data.data[0].firka_name == null ? '' : data.data[0].firka_name]
      });
      this.selectchange('district');
    }, error => {
    });
  }
  talukload() {
    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS":
      {
        "TALUK_GID": '',
        "TALUK_NAME": "",
        "DISTRICT_ID": ""
      },
      "LIMIT": 400,
      "OFFSET": 0
    }

    this.adminService.gettaluklist(payload).subscribe((data: any) => {
      this.talukfull = data.data;
    });
  }

  selectchange(changeval:any) {
    if (changeval == 'district') {
      console.log(this.talukfull)
      this.taluks = this.talukfull.filter(obj => obj.district_id.includes(this.hudform.value.district));
    }
  }
}

