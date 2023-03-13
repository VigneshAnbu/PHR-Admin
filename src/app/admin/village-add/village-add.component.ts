import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminServiceService } from 'src/app/shared/service/admin-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-village-add',
  templateUrl: './village-add.component.html',
  styleUrls: ['./village-add.component.scss']
})
export class VillageAddComponent {
  CreateStreetForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private adminService: AdminServiceService,
    private router: Router, private dataService: DataService, private route: ActivatedRoute) {
  }


  //personalDetailForm: any;
  finalBlockList: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];

  HUDS: any[] = [];

  cateringanganwadilist: any[] = [];

  RevVillageList: any[] = [];
  constituencyassemblyList: any[] = [];
  constituencyparliamentaryList: any[] = [];

  paramstreet_id: any = "";

  ngOnInit() {

    this.createForm();
    //this.search();    
    this.districts = this.dataService.districts;
    this.blocks = this.dataService.blocks;



    this.paramstreet_id = this.route.snapshot.paramMap.get('village_gid') == null ? "0" : this.route.snapshot.paramMap.get('village_gid');
    if (this.paramstreet_id == "0") {
      this.createForm();
    } else {
      this.editvillage();
    }


  }


  createForm() {
    this.CreateStreetForm = this.formBuilder.group({
      district: [''],
      block: [''],
      village_name: [''],
      hud: [''],
      village_local_name: [''],
      village_type: [''],
      lgt_code: '',
      local_body_code: '',
      isactive: '',
      village_gid: '',
      village_id: ''
    });
    // (this.CreateStreetForm.controls as any).hscunit.enable()

    // (this.CreateStreetForm.controls as any).isactive.enable()
  }

  Backtostreet() {
    this.router.navigate(['/admin/street-management']);

  }

  selectChange(type: any) {
    //alert()
    if (type === 'district') {
      this.finalBlocks();
      // this.facilities = [];
      // this.isDistrictSelected = true;
    }
    else if (type === 'block') {
      // this.facilities = [];
      // this.isBlockSelected = true;
      this.HUD();
    }
    // if ( this.isBlockSelected && this.isDistrictSelected) {
    //   // (this.userForm.controls as any).facility.enable()
    //       this.getFacility();

    // }
  }

  finalBlocks() {
    //console.log('final block called', this.StreetForm.value.district);
    this.finalBlockList = this.blocks.filter(obj => obj.district_id.includes(this.CreateStreetForm.value.district));
    //console.log('final blocks', this.finalBlockList);
  }


  SaveStreet() {
    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_PHR_ROLE": "STATE_ADMIN",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "VILLAGE_DATA": {
        "village_id": this.CreateStreetForm.value.village_id ? this.CreateStreetForm.value.village_id : '',
        "village_name": this.CreateStreetForm.value.village_Name ? this.CreateStreetForm.value.village_name : '',
        "village_local_name": this.CreateStreetForm.value.village_local_name ? this.CreateStreetForm.value.village_local_name : '',
        "village_gid": this.CreateStreetForm.value.village_gid ? parseInt(this.CreateStreetForm.value.village_gid) : null, 
        "district_id": this.CreateStreetForm.value.district ? this.CreateStreetForm.value.district : '',
        "hud_id": this.CreateStreetForm.value.hud ? this.CreateStreetForm.value.hud : '',
        "block_id": this.CreateStreetForm.value.block ? this.CreateStreetForm.value.block : '',
        "village_local_body_code": this.CreateStreetForm.value.local_body_code ? this.CreateStreetForm.value.local_body_code : '',
        "village_lgd_code": this.CreateStreetForm.value.lgt_code ? this.CreateStreetForm.value.lgt_code : '',
        "village_type": this.CreateStreetForm.value.village_type ? this.CreateStreetForm.value.village_type : '',
        "active": this.CreateStreetForm.value.isactive=='1' ? true : false,
      },
      "TARGET_HSC": "0b008a37-34a6-455f-88e5-c609f6f7e808"
    }

    console.log(payload)
    this.adminService.savevillagedata(payload).subscribe((data: any) => {
      alert("Saved Successfully...")
      this.router.navigate(['/admin/village-management']);
    }, error => {

    });

  }


  HUD() {

    const payload =
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS":
      {

        "DISTRICT_ID": this.CreateStreetForm.value.district ? this.CreateStreetForm.value.district : '',
        "HUD_NAME": "",
        "HUD_GID": ""
      },
      "LIMIT": 10,
      "OFFSET": 0
    }

    this.adminService.getHUDList(payload).subscribe((data: any) => {
      this.HUDS = data.data;

      (this.CreateStreetForm.controls as any).hud.enable()

      //console.log(this.HUDS);

      // this.facilities = data.data.map((item: any) => {
      //   item.name = `${item.block_name}`.trim();
      //   return item;
      // });
    }, error => {

    });


  }


  editvillage() {

    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS": {
        "BLOCK_ID": '',
        "HUD_ID": "",
        "DISTRICT_ID": '',
        "VILLAGE_NAME": '',
        "VILLAGE_GID": parseInt(this.paramstreet_id),
        "VILLAGE_TYPE": "",
      },
      "LIMIT": 15000,
      "OFFSET": 0
    }
    this.CreateStreetForm = this.formBuilder.group({
      district: [''],
      block: [''],
      village_name: [''],
      hud: [''],
      village_local_name: [''],
      village_type: [''],
      lgt_code: '',
      local_body_code: '',
      isactive: '',
      village_gid: '',
      village_id:''
    });
    // this.userForm.reset();
    this.adminService.getVillages(payload).subscribe((data: any) => {
      console.log(data);
      //this.totalCount = data['meta-data'].total_records_count;
      this.CreateStreetForm = this.formBuilder.group({
        district: [data.data[0].district_id],
        block: [data.data[0].block_id],
        village_name: [data.data[0].village_name],
        hud: [data.data[0].hud_id],
        village_local_name: [data.data[0].village_local_name],
        village_type: [data.data[0].village_type],
        lgt_code: data.data[0].village_lgd_code,
        local_body_code: data.data[0].village_local_body_code,
        isactive: data.data[0].active == true ? '1' : '0',
        village_gid: data.data[0].village_gid,
        village_id: data.data[0].village_id,
      });
      this.selectChange('district');
      this.selectChange('block');
    }, error => {
    });
  }


}
