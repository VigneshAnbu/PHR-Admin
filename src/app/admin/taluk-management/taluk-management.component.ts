import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AdminServiceService } from 'src/app/shared/service/admin-service.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';
import { parse } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-taluk-management',
  templateUrl: './taluk-management.component.html',
  styleUrls: ['./taluk-management.component.scss']
})
export class TalukManagementComponent {
  @ViewChild('table') table: any;
  StreetForm !: FormGroup;
  panelOpenState = true;
  selected = [];
  limit = 10;
  offset = 0;
  totalCount = 5;
  data: any[] = [];
  institution_gid: any = "";
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
  hud_name: any = "";
  district: any = "";
  hud_gid: any = "";
  ngOnInit() {
    this.createForm()
    this.search();
    this.districts = this.dataService.districts;

  }
  search() {

    const payload = {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS":
      {
        "TALUK_GID": this.StreetForm.value.hud_gid ? parseInt(this.StreetForm.value.hud_gid) : null,
        "TALUK_NAME": this.StreetForm.value.hud_name ? this.StreetForm.value.hud_name : '',
        "DISTRICT_ID": this.StreetForm.value.district ? this.StreetForm.value.district : '',
      },
      "LIMIT": 400,
      "OFFSET": 0
    }

    this.adminService.gettaluklist(payload).subscribe((data: any) => {
      console.log(data)
      this.data = data.data;
      this.totalCount = data['meta-data'].total_records_count;
      this.data = data.data.map((item: any) => {
        item.district = this.districts.find(x => x.district_id == `${item.district_id}`.trim()).district_name
        item.taluk = `${item.taluk_name}`.trim()
        item.talukgid = `${item.taluk_gid}`.trim()
        return item;
      });
      console.log(this.data)
    }, error => {
    });
  }
  createUser() {
    this.router.navigate(['/admin/taluk-add/0']);
  }
  createForm() {
    this.StreetForm = this.formBuilder.group({
      district: [''],
      hud_name: [''],
      hud_gid: [''],

    });
    //(this.StreetForm.controls as any).facility.disable()
  }
  selectChange(type: any) {
    //alert()
    if (type === 'district') {
      //this.finalBlocks();
      // this.facilities = [];
      // this.isDistrictSelected = true;
    }
    else if (type === 'block') {
      // this.facilities = [];
      // this.isBlockSelected = true;
      //this.Village();
      //this.FacilityList();
    }
    else if (type === 'village') {
      //this.Habitation();
    }

    // if ( this.isBlockSelected && this.isDistrictSelected) {
    //   // (this.userForm.controls as any).facility.enable()
    //       this.getFacility();

    // }
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
  edit(value: any) {
    this.router.navigate(['admin/taluk-add/' + value.talukgid + '']);
  }
  clearSearch() {
    this.StreetForm.reset();
  }

}
