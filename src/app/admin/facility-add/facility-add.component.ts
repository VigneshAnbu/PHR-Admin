import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../shared/service/admin-service.service';
import { DataService } from '../../shared/service/data.service';

@Component({
  selector: 'app-facility-add',
  templateUrl: './facility-add.component.html',
  styleUrls: ['./facility-add.component.scss']
})
export class FacilityAddComponent {

  isLinear = false;
  personalDetailForm: any;

  finalBlockList: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  huds: any[] = [];
  finalhuds: any[] = [];
  villages: any[] = [];
  streets: any[] = [];
  facilities: any[] = [];
  categorylist: any[] = [];
  typelist: any[] = [];
  directoratelist: any[] = [];
  levellist: any[] = [];
  ownerlist: any[] = [];

  finalcategorylist: any = [];
  finaltypelist: any = [];
  finaldirectoratelist: any = [];
  finallevellist: any = [];
  finalownerlist: any = [];
  sub: any = []
  constructor(private formBuilder: FormBuilder, private adminService: AdminServiceService, private router: Router, private dataService: DataService, private route: ActivatedRoute) {
    
  }
  headingname: any = "Add Facility";
  facility_id: any = "";
  ngOnInit() {

    this.createForm();
    this.search();
    this.districts = this.dataService.districts;
    this.blocks = this.dataService.blocks;
    this.facility_id = this.route.snapshot.paramMap.get('facility_id') == null ? "0" : this.route.snapshot.paramMap.get('facility_id');
    

    const payload2 = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625"
    }

    this.adminService.getfacilitycategoryList(payload2).subscribe((data: any) => {
      console.log(data);
      this.categorylist = data.data;
    }, error => {
    });
    this.adminService.getfacilitydirectorateList(payload2).subscribe((data: any) => {
      console.log(data);
      this.directoratelist = data.data;
    }, error => {
    });
    this.adminService.getfacilitylevelList(payload2).subscribe((data: any) => {
      this.levellist = data.data;
    }, error => {
    });
    this.adminService.getfacilityownerList(payload2).subscribe((data: any) => {
      this.ownerlist = data.data;
    }, error => {
    });
    this.adminService.getfacilitytypeList(payload2).subscribe((data: any) => {
      this.typelist = data.data;
    }, error => {
    });
    if (this.facility_id == "0") {
      this.createForm();
    }
    else {
      this.editfacilityload()
    }
  }
  createForm() {
    this.personalDetailForm = this.formBuilder.group({
      directorate: [''],
      owner: [''],
      category: [''],
      type: [''],
      level: [''],
      district: [''],
      hud: [''],
      block: [''],
      facility_name: [''],
      parent_facility: [''],
      facility_village: [''],
      facility_street: [''],
      facility_mobile: [''],
      facility_landline: [''],
      facility_email: [''],
      facility_latitude: [''],
      facility_longitude: [''],
      facility_hwc: [''],
      facility_active: [''],
    });
  }

  search() { }
  categoryload() {

  }

  navigateBack() {
    this.router.navigate(['/admin/facility-management'])
  }
  selectChange(vall: any) {
    if (vall == 'owner') {
      //this.finaldirectoratelist = this.directoratelist.filter(s => s.status === 'O');
      this.finaldirectoratelist = this.directoratelist.filter(obj => obj.owner_id.includes(this.personalDetailForm.value.owner));
    }
    else if (vall == 'directorate') {
      this.finalcategorylist = this.categorylist.filter(obj => obj.directorate_id.includes(this.personalDetailForm.value.directorate) && obj.owner_id.includes(this.personalDetailForm.value.owner));
    }
    else if (vall == 'category') {
      this.finaltypelist = this.typelist.filter(obj => obj.category_id.includes(this.personalDetailForm.value.category) && obj.directorate_id.includes(this.personalDetailForm.value.directorate) && obj.owner_id.includes(this.personalDetailForm.value.owner));
    }
    else if (vall == 'type') {
      this.finallevellist = this.levellist.filter(obj => obj.facility_type_id.includes(this.personalDetailForm.value.type) && obj.category_id.includes(this.personalDetailForm.value.category) && obj.directorate_id.includes(this.personalDetailForm.value.directorate) && obj.owner_id.includes(this.personalDetailForm.value.owner));
    }
    else if (vall == 'level') {
    }
    else if (vall == 'district') {
      this.loadhud();
    }
    else if (vall == 'hud') {
      this.loadblock();
    }
    else if (vall == 'block') {
      this.villageload();
      this.facilityload();
    }
    else if (vall == 'village') {
      this.streetload();
    }
  }
  loadhud() {
    const payload =
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS":
      {

        "DISTRICT_ID": this.personalDetailForm.value.district ? this.personalDetailForm.value.district : '',
        "HUD_NAME": "",
        "HUD_GID": ""
      },
      "LIMIT": 10,
      "OFFSET": 0
    }

    this.adminService.getHUDList(payload).subscribe((data: any) => {
      this.finalhuds = data.data;
    }, error => {

    });
  }
  loadblock() {
    const payload =
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS":
      {
        "HUD_ID": this.personalDetailForm.value.hud ? this.personalDetailForm.value.hud : '',
        "DISTRICT_ID": "",
        "BLOCK_NAME": "",
        "BLOCK_GID": null,
        "BLOCK_TYPE": ""
      },
      "LIMIT": 10,
      "OFFSET": 0
    }

    this.adminService.getblockbyfilter(payload).subscribe((data: any) => {
      console.log(data)
      this.finalBlockList = data.data;
    }, error => {

    });
  }
  villageload() {

    const payload =
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS":
      {
        "DISTRICT_ID": "",
        "HUD_ID": "",
        "BLOCK_ID": this.personalDetailForm.value.block ? this.personalDetailForm.value.block : '',
        "VILLAGE_NAME": "",
        "VILLAGE_GID": "",
        "VILLAGE_TYPE": ""
      },
      "LIMIT": 10,
      "OFFSET": 0
    }

    this.adminService.getVillages(payload).subscribe((data: any) => {
      this.villages = data.data;
      console.log(this.villages);
    }, error => {

    });

  }
  streetload() {

    const payload =
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS": {
        "BLOCK_ID": this.personalDetailForm.value.block ? this.personalDetailForm.value.block : '',
        "VILLAGE_ID": this.personalDetailForm.value.facility_village ? this.personalDetailForm.value.facility_village : '',
        "HABITATION_ID": "",
        "STREET_NAME": "",
        "FACILITY_ID": "",
        "STREET_GID": "",
        "DISTRICT_ID": ""
      },
      "LIMIT": 10,
      "OFFSET": 0
    }


    // this.userForm.reset();
    this.adminService.getstreets(payload).subscribe((data: any) => {
      console.log(data);
      this.streets = data.data;
    }, error => {
    });
  }
  facilityload() {

    const payload =
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "GOVT_DEPARTMENT": "",
      "FILTERS": {
        "OWNER_ID": this.personalDetailForm.value.owner ? this.personalDetailForm.value.owner : '',
        "DIRECTORATE_ID": this.personalDetailForm.value.directorate ? this.personalDetailForm.value.directorate : '',
        "CATEGORY_ID": '',
        "FACILITY_TYPE_ID": '',
        "FACILITY_LEVEL_ID": '',
        "FACILITY_NAME": "",
        "DISTRICT_ID": "",
        "BLOCK_ID": this.personalDetailForm.value.block ? this.personalDetailForm.value.block : '',
        "INSTITUTION_GID": ""
      },
      "LIMIT": 1000,
      "OFFSET": 0
    }

    this.adminService.getfacilityList(payload).subscribe((data: any) => {
      this.facilities = data.data;
      console.log(this.facilities);    
      
    }, error => {

    });


  }
  savefacility() {
    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FACILITY_DATA": {
        "facility_id": "00001f4d-1437-4b8a-8839-042115ed9b99",
        "district_id": this.personalDetailForm.value.district ? this.personalDetailForm.value.district : '',
        "hud_id": this.personalDetailForm.value.hud ? this.personalDetailForm.value.hud : '',
        "block_id": this.personalDetailForm.value.block ? this.personalDetailForm.value.block : '',
        "owner_id": this.personalDetailForm.value.owner ? this.personalDetailForm.value.owner : '',
        "directorate_id": this.personalDetailForm.value.directorate ? this.personalDetailForm.value.directorate : '',
        "category_id": this.personalDetailForm.value.category ? this.personalDetailForm.value.category : '',
        "facility_type_id": this.personalDetailForm.value.type ? this.personalDetailForm.value.type : '',
        "facility_level_id": this.personalDetailForm.value.level ? this.personalDetailForm.value.level : '',
        "parent_facility_id": this.personalDetailForm.value.parent_facility ? this.personalDetailForm.value.parent_facility : '',
        "facility_name": this.personalDetailForm.value.facility_name ? this.personalDetailForm.value.facility_name : '',
        "village_id": this.personalDetailForm.value.facility_village ? this.personalDetailForm.value.facility_village : '',
        "street_id": this.personalDetailForm.value.facility_street ? this.personalDetailForm.value.facility_street : '',
        "facility_mobile": this.personalDetailForm.value.facility_mobile ? this.personalDetailForm.value.facility_mobile : '',
        "facility_landline": this.personalDetailForm.value.facility_landline ? this.personalDetailForm.value.facility_landline : '',
        "facility_email": this.personalDetailForm.value.facility_email ? this.personalDetailForm.value.facility_email : '',
        "facility_latitude": this.personalDetailForm.value.facility_latitude ? this.personalDetailForm.value.facility_latitude : '',
        "facility_longitude": this.personalDetailForm.value.facility_longitude ? this.personalDetailForm.value.facility_longitude : '',
        "facility_hwc": this.personalDetailForm.value.facility_hwc ? this.personalDetailForm.value.facility_hwc : '',
        "facility_active": this.personalDetailForm.value.facility_active ? this.personalDetailForm.value.facility_active : '',
      }
    }
    console.log(this.personalDetailForm);
    //if (this.personalDetailForm.invalid) {
    //  return;
    //}
    this.adminService.savefacilitydata(payload).subscribe((data: any) => {
      alert("Saved Successfully...")
    });
  }

  editfacilityload() {

    const payload =
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "GOVT_DEPARTMENT": "",
      "FILTERS": {
        "OWNER_ID": '',
        "DIRECTORATE_ID": '',
        "CATEGORY_ID": '',
        "FACILITY_TYPE_ID": '',
        "FACILITY_LEVEL_ID": '',
        "FACILITY_NAME": "",
        "DISTRICT_ID": "",
        "BLOCK_ID":'',
        "INSTITUTION_GID": this.facility_id,
      },
      "LIMIT": 1000,
      "OFFSET": 0
    }

    this.adminService.getfacilityList(payload).subscribe((data: any) => {
      this.headingname = "Edit(" + data.data[0].facility_name + " - " + data.data[0].institution_gid +")";

      this.personalDetailForm = this.formBuilder.group({
        directorate: [data.data[0].directorate_id],
        owner: [data.data[0].owner_id],
        category: [data.data[0].category_id],
        type: [data.data[0].facility_type_id],
        level: [data.data[0].facility_level_id],
        district: [data.data[0].district_id],
        hud: [data.data[0].hud_id],
        block: [data.data[0].block_id],
        facility_name: [data.data[0].facility_name],
        parent_facility: [data.data[0].parent_facility],
        facility_village: [data.data[0].village_id],
        facility_street: [data.data[0].hq_street],
        facility_mobile: [data.data[0].mobile_number],
        facility_landline: [data.data[0].landline_number],
        facility_email: [data.data[0].email],
        facility_latitude: [data.data[0].facility_latitude],
        facility_longitude: [data.data[0].facility_longtitude],
        facility_hwc: [data.data[0].is_hwc],
        facility_active: [data.data[0].active],
      });
      this.selectChange('owner');
      this.selectChange('directorate');
      this.selectChange('category');
      this.selectChange('type');
      this.selectChange('level');
      this.selectChange('district');
      this.selectChange('hud');
      this.selectChange('block');
      this.selectChange('village');
    }, error => {

    });


  }
}
