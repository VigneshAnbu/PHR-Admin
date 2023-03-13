import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AdminServiceService } from 'src/app/shared/service/admin-service.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
  showFiller = false;
  userForm!: FormGroup;
  data: any[] = [];
  selected = [];
  limit = 5;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  panelOpenState = true;
  offset = 0;
  totalCount = 5;
  faEdit: any;
  districts: any[] = [];
  blocks: any[] = [];
  facilities:  any[] = [];
  roles: any[] = [];
  isDistrictSelected = false;
  isBlockSelected = false;
  finalBlockList: any[] = [];

  constructor( private formBuilder: FormBuilder, private adminService: AdminServiceService,
               private router: Router, private dataService: DataService) {
  }

  ngOnInit() {
    this.createForm();
    this.search();
    this.faEdit = faPencil;
    this.districts = this.dataService.districts;
    this.blocks = this.dataService.blocks;
    this.roles = this.dataService.roles;
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      district: [''],
      block: [''],
      facility: [''],
      phrrole: [''],
      name: [''],
      number: [''],
      role: ['']
    });
    (this.userForm.controls as any).facility.disable()
  }
  selectChange(type: any) {
    if (type === 'district') {
      this.finalBlocks();
      this.facilities = [];
      this.isDistrictSelected = true;
    } else if (type === 'block') {
      this.facilities = [];
      this.isBlockSelected = true;
    }
    if ( this.isBlockSelected && this.isDistrictSelected) {
      // (this.userForm.controls as any).facility.enable()
          this.getFacility();

    }
  }
  ngAfterViewInit() {
  }

  onActivate(event: any) {
  }

  onSelect(event: any) {
  }

  edit(value: any) {
     console.log('the value is given as:', value);
  }

  search() {
    if (this.userForm.invalid) {
      return;
    }
     const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
        "FILTERS": {
            "DISTRICT_ID": this.userForm.value.district ? this.userForm.value.district : '',
            "BLOCK_ID": this.userForm.value.block ? this.userForm.value.block : '',
            "PHR_ROLE": this.userForm.value.phrrole ? this.userForm.value.phrrole : '',
            "USER_NAME": this.userForm.value.name ? this.userForm.value.name : '',
            "FACILITY_ID": this.userForm.value.facility ? this.userForm.value.facility : '',
            "MOBILE_NUMBER": this.userForm.value.number ? this.userForm.value.number : '',
            "ROLE": this.userForm.value.role ? this.userForm.value.role : ''
        },
        "LIMIT": this.limit,
        "OFFSET": this.offset
    }
    // const payload ={
    //   "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
    //   "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
    //     "FILTERS": {
    //         "DISTRICT_ID": "02f67331-a6f1-4df3-98de-ee49a7032ed6",
    //         "BLOCK_ID": "02d844e3-745e-4a52-babf-7e1960326952",
    //         "PHR_ROLE": "MOBILE_COMMUNITY_STAFF",
    //         "USER_NAME": "SURYA",
    //         "FACILITY_ID": "252f7454-91d6-4b17-ab00-762aea708eaf",
    //         "MOBILE_NUMBER": "7904319591",
    //         "ROLE": "9bd9c87c-dcde-418d-b11e-4ac62838760f"
    //     },
    //     "LIMIT": 10,
    //     "OFFSET": 0
    // }
    // this.userForm.reset();
    this.adminService.getUsers(payload).subscribe((data: any) => {
      console.log(data);
      // this.data = data.data;
      this.totalCount = data['meta-data'].total_records_count;
      this.data = data.data.map((item: any) => {
        item.name = `${item.user_title} ${item.user_first_name} ${item.user_first_name}`.trim();
        item.district = 'None'
        item.block = 'None'
        item.mobile = `${item.mobile_number}`.trim();
        item.facility = `${item.facility_name}`.trim();
        item.phrRole = `${item.phr_role}`.trim();
        return item;
      });
    }, error => {
    });
  }
  finalBlocks() {
    console.log('final block called', this.userForm.value.district);
    this.finalBlockList = this.blocks.filter(obj => obj.district_id.includes(this.userForm.value.district));
    console.log('final blocks', this.finalBlockList);
  }
  getFacility() {
    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "GOVT_DEPARTMENT": "",
      "FILTERS": {
          "DIRECTORATE_ID": "",
          "DISTRICT_ID": this.userForm.value.district ? this.userForm.value.district : '',
          "BLOCK_ID": this.userForm.value.block ? this.userForm.value.block : '',
      }
    }
    // const payload = {
    //   "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
    //   "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
    //   "GOVT_DEPARTMENT": "",
    //     "FILTERS": {
    //         "DIRECTORATE_ID": "",
    //         "DISTRICT_ID": "a93817d9-cf39-4cea-b0f0-9643ab25e8f9",
    //         "BLOCK_ID": "35fddabc-8892-4bf3-b5d8-14537096d378"
    //     }
    // }
    this.adminService.getFacility(payload).subscribe((data: any) => {
    this.facilities = data.data;
    (this.userForm.controls as any).facility.enable()
    // this.facilities = data.data.map((item: any) => {
    //   item.name = `${item.block_name}`.trim();
    //   return item;
    // });
    }, error => {

    });
  }
  clearSearch() {
    this.userForm.reset();
  }
  paginate(e: any) {
    console.log('event', e.limit, e.offset);
    this.limit = e.limit;
    this.offset = e.offset;
    this.search();
  }

  createUser() {
     this.router.navigate(['/admin/createUser']);
  }
}
