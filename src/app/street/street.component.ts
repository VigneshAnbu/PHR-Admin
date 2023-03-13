import { Component } from '@angular/core';
import { FormBuilder ,FormGroup} from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AdminServiceService } from 'src/app/shared/service/admin-service.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';


@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.scss']
})
export class StreetComponent {

  StreetForm !: FormGroup;
  panelOpenState = true;
  selected = [];
  limit = 5;
  offset = 0;
  totalCount = 5;
  data: any[] = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor( private formBuilder: FormBuilder, private adminService: AdminServiceService,
    private router: Router, private dataService: DataService) {
  }

  finalBlockList:any[]=[];
  districts:any[]=[];
  blocks:any[]=[];
  Villages:any[]=[];
  Habitations:any[]=[];
  facilities:any[]=[];

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
    this.search();
  }

  clearSearch() {
    this.StreetForm.reset();
  }

  edit(value: any) {

    this.router.navigate(['admin/street-add/'+value.street_gid+'']);

    //this.router.navigate(['/admin/street-add/393dced8-36c4-4049-b13c-3b1f338a581e']);

    console.log('the value is given as:', value);
 }

  search() {
    if (this.StreetForm.invalid) {
      return;
    }
    //  const payload = {
    //   "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
    //   "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
    //     "FILTERS": {
    //         "DISTRICT_ID": this.userForm.value.district ? this.userForm.value.district : '',
    //         "BLOCK_ID": this.userForm.value.block ? this.userForm.value.block : '',
    //         "PHR_ROLE": this.userForm.value.phrrole ? this.userForm.value.phrrole : '',
    //         "USER_NAME": this.userForm.value.name ? this.userForm.value.name : '',
    //         "FACILITY_ID": this.userForm.value.facility ? this.userForm.value.facility : '',
    //         "MOBILE_NUMBER": this.userForm.value.number ? this.userForm.value.number : '',
    //         "ROLE": this.userForm.value.role ? this.userForm.value.role : ''
    //     },
    //     "LIMIT": this.limit,
    //     "OFFSET": this.offset
    // }
    const payload =
    
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
        "FILTERS": {
            "BLOCK_ID": this.StreetForm.value.block ? this.StreetForm.value.block : '',
            "VILLAGE_ID": this.StreetForm.value.village ? this.StreetForm.value.village : '',
            "HABITATION_ID": this.StreetForm.value.habitation ? this.StreetForm.value.habitation : '',
            "STREET_NAME": this.StreetForm.value.street_name ? this.StreetForm.value.street_name : '',
            "FACILITY_ID": this.StreetForm.value.facility ? this.StreetForm.value.facility : '',
            "STREET_GID": this.StreetForm.value.street_gid ? this.StreetForm.value.street_gid : '',
            "DISTRICT_ID": this.StreetForm.value.district ? this.StreetForm.value.district : ''
        },
        "LIMIT": this.limit,
        "OFFSET": this.offset
    }

    // this.userForm.reset();
    this.adminService.getstreets(payload).subscribe((data: any) => {
      console.log(data);
      // this.data = data.data;
      this.totalCount = data['meta-data'].total_records_count;
      this.data = data.data.map((item: any) => {        
        item.district = `${item.district_name}`.trim();
        item.block = `${item.block_name}`.trim();
        item.hud = `${item.hud_name}`.trim();
        item.village = `${item.village_name}`.trim();
        item.habitaion = `${item.habitation_name}`.trim();
        item.street = `${item.street_name}`.trim();
        item.street_id = `${item.street_id}`.trim();
        item.cateringHSC = `${item.catering_anganwadi_name}`.trim();

        console.log(item.cateringHSC)

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
      village:[''],
      habitation:[''],
      facility:[''],
      street_gid:'',
      street_name:''

      // hud: [''],
      // village: [''],
      // habitaion: [''],
      // street: [''],
      // cateringHSC: ['']
    });
    (this.StreetForm.controls as any).facility.disable()
  }


  Habitation()
  {

const payload=
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

  Village()
  {

const payload=
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
  },
    "LIMIT": 10,
  "OFFSET": 0
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

FacilityList(){

const payload=
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
    "INSTITUTION_GID":""
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
    if (type === 'district') 
    {
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
    else if(type === 'village')
    {      
    this.Habitation();        
    }

    // if ( this.isBlockSelected && this.isDistrictSelected) {
    //   // (this.userForm.controls as any).facility.enable()
    //       this.getFacility();

    // }
  }


}
