import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatatableComponent,ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AdminServiceService } from 'src/app/shared/service/admin-service.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-facility-management',
  templateUrl: './facility-management.component.html',
  styleUrls: ['./facility-management.component.scss']
})
export class FacilityManagementComponent {
  @ViewChild('table') table: any;
  StreetForm !: FormGroup;
  panelOpenState = true;
  selected = [];
  limit = 10;
  offset = 0;
  totalCount = 5;
  data: any[] = [];
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
    
     this.router.navigate(['admin/facility-add/'+value.institution_gid+'']);
    
    console.log('the value is given as:', value.institution_gid)
  }

  search() {   
    
    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "GOVT_DEPARTMENT": "ICDS",
      "FILTERS": {
        "DIRECTORATE_ID": "bd44ecf8-8cac-4f14-bbe2-5e7e622469ad",
        "DISTRICT_ID": "a93817d9-cf39-4cea-b0f0-9643ab25e8f9",
        "BLOCK_ID": "35fddabc-8892-4bf3-b5d8-14537096d378"
      }
    }

    // this.userForm.reset();
    this.adminService.getfacilitymasterList(payload).subscribe((data: any) => {
      console.log(data);
      this.totalCount = data.data.length;
      this.data = data.data.map((item: any) => {
        item.block = `${item.block_id}`.trim();        
        item.directorate = `${item.directorate_name}`.trim() 
        item.category = `${item.category_name}`.trim() 
        item.type = `${item.facility_type_name}`.trim() 
        item.level = `${item.facility_level}`.trim() 
        item.facility = `${item.facility_name}`.trim()
        item.district=this.districts.find(x => x.district_id == `${item.district_id}`.trim()).district_name
        item.block = this.blocks.find(x => x.block_id == `${item.block_id}`.trim()).block_name
        return item;
      });
      console.log(this.data)
    }, error => {
    });
  }

  finalBlocks() {
    //console.log('final block called', this.StreetForm.value.district);
    this.finalBlockList = this.blocks.filter(obj => obj.district_id.includes(this.StreetForm.value.district));
    //console.log('final blocks', this.finalBlockList);
  }


  createUser() {
    this.router.navigate(['/admin/facility-add/0']);
  }

  createForm() {
    this.StreetForm = this.formBuilder.group({
      district: [''],
      block: [''],
      facility_name:'',
      institution_gid: '',
      owner: '',
      directorate: '',
      category: '',
      facility_type_id: '',
      facility_level_name: ''
    });
    //(this.StreetForm.controls as any).facility.disable()
  }


  Habitation() {

    const payload =
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS":
      {
        "DISTRICT_ID": "",
        "HUD_ID": "",
        "BLOCK_ID": "",
        "VILLAGE_ID": this.StreetForm.value.village ? this.StreetForm.value.village : '',
        "HABITATION_NAME": "",
        "HABITATION_GID": ""
      },
      "LIMIT": 10,
      "OFFSET": 0
    }

    this.adminService.getHabitation(payload).subscribe((data: any) => {
      this.Habitations = data.data;
      console.log(this.Habitations);
      (this.StreetForm.controls as any).habitation.enable()
      // this.facilities = data.data.map((item: any) => {
      //   item.name = `${item.block_name}`.trim();
      //   return item;
      // });
    }, error => {

    });


  }

  Village() {

    const payload =
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS":
      {
        "DISTRICT_ID": "",
        "HUD_ID": "",
        "BLOCK_ID": this.StreetForm.value.block ? this.StreetForm.value.block : '',
        "VILLAGE_NAME": "",
        "VILLAGE_GID": "",
        "VILLAGE_TYPE": ""
      }
    }

    this.adminService.getVillages(payload).subscribe((data: any) => {
      this.Villages = data.data;
      console.log(this.Villages);
      (this.StreetForm.controls as any).village.enable()
      // this.facilities = data.data.map((item: any) => {
      //   item.name = `${item.block_name}`.trim();
      //   return item;
      // });
    }, error => {

    });


  }

  FacilityList() {

    const payload =
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS":
      {
        "OWNER_ID": "",
        "DIRECTORATE_ID": "",
        "CATEGORY_ID": "",
        "FACILITY_TYPE_ID": "",
        "FACILITY_LEVEL_ID": "",
        "FACILITY_NAME": "n",
        "DISTRICT_ID": "",
        "BLOCK_ID": this.StreetForm.value.block ? this.StreetForm.value.block : '',
        "INSTITUTION_GID": ""
      },
      "LIMIT": 10,
      "OFFSET": 0
    }

    this.adminService.getfacilityList(payload).subscribe((data: any) => {
      this.facilities = data.data;
      console.log(this.facilities);
      (this.StreetForm.controls as any).facility.enable()
      // this.facilities = data.data.map((item: any) => {
      //   item.name = `${item.block_name}`.trim();
      //   return item;
      // });
    }, error => {

    });


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
      this.Village();
      this.FacilityList();
    }
    else if (type === 'village') {
      this.Habitation();
    }

    // if ( this.isBlockSelected && this.isDistrictSelected) {
    //   // (this.userForm.controls as any).facility.enable()
    //       this.getFacility();

    // }
  }

}
