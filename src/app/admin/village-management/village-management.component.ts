import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AdminServiceService } from 'src/app/shared/service/admin-service.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-village-management',
  templateUrl: './village-management.component.html',
  styleUrls: ['./village-management.component.scss']
})
export class VillageManagementComponent {
  StreetForm !: FormGroup;
  panelOpenState = true;
  selected = [];
  limit = 10;
  offset = 0;
  totalCount = 5;
  villagelist: any[] = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(private formBuilder: FormBuilder, private adminService: AdminServiceService,
    private router: Router, private dataService: DataService) {
  }

  finalBlockList: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  Villages: any[] = [];
  Habitations: any[] = [];
  facilities: any[] = [];
  village_name: any = "";
  village_gid: any = null;
  ngOnInit() {

    this.createForm();
    this.search();
    this.districts = this.dataService.districts;
    this.blocks = this.dataService.blocks;

  }

  onActivate(event: any) {
  }

  onSelect(event: any) {
  }

  paginate(e: any) {
    console.log('event', e.limit, e.offset);
    this.limit = e.limit;
    this.offset = e.offset;
    //this.search();
  }

  clearSearch() {
    this.StreetForm.reset();
  }

  edit(value: any) {

    this.router.navigate(['admin/village-add/' + value.village_gid + '']);

    //this.router.navigate(['/admin/street-add/393dced8-36c4-4049-b13c-3b1f338a581e']);

    console.log('the value is given as:', value);
  }

  search() {
    if (this.StreetForm.invalid) {
      return;
    }
    const payload ={
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS": {
        "BLOCK_ID": this.StreetForm.value.block ? this.StreetForm.value.block : '',
        "HUD_ID": "",        
        "DISTRICT_ID": this.StreetForm.value.district ? this.StreetForm.value.district : '',
        "VILLAGE_NAME": this.StreetForm.value.village_name ? this.StreetForm.value.village_name : '',
        "VILLAGE_GID": this.StreetForm.value.village_gid ? parseInt(this.StreetForm.value.village_gid) : null,
        "VILLAGE_TYPE":"",
      },
      "LIMIT": 15000,
      "OFFSET": 0
    }

    // this.userForm.reset();
    this.adminService.getVillages(payload).subscribe((data: any) => {
      console.log(data);
      this.totalCount = data['meta-data'].total_records_count;
      this.villagelist = data.data.map((item: any) => {
        item.district = `${item.district_name}`.trim();
        item.hud = `${item.hud_name}`.trim()
        item.gid = `${item.village_gid}`.trim()
        item.village = `${item.village_name}`.trim()
        item.block = `${item.block_name}`.trim()
        item.type = `${item.village_type}`.trim()
        item.active = `${item.active}`.trim()
        return item;
      });
    }, error => {
    });
  }

  finalBlocks() {
    //console.log('final block called', this.StreetForm.value.district);
    this.finalBlockList = this.blocks.filter(obj => obj.district_id.includes(this.StreetForm.value.district));
    //console.log('final blocks', this.finalBlockList);
  }


  createUser() {
    this.router.navigate(['/admin/createUser']);
  }

  createForm() {
    this.StreetForm = this.formBuilder.group({
      district: [''],
      block: [''],
      village_name: [''],
      village_gid:['']

      // hud: [''],
      // village: [''],
      // habitaion: [''],
      // street: [''],
      // cateringHSC: ['']
    });
    
  } 

  selectChange(type: any) {
    //alert()
    if (type === 'district') {
      this.finalBlocks();
      // this.facilities = [];
      // this.isDistrictSelected = true;
    }
  }


}
