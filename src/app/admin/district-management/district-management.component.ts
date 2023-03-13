import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AdminServiceService } from 'src/app/shared/service/admin-service.service';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-district-management',
  templateUrl: './district-management.component.html',
  styleUrls: ['./district-management.component.scss']
})
export class DistrictManagementComponent {

  DistrictForm !: FormGroup;
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


  districts:any[]=[];
  
  ngOnInit() {
    
    this.createForm();
    this.search();    
    this.districts = this.dataService.districts;
    // this.blocks = this.dataService.blocks;
    
  }

  createForm(){
    this.DistrictForm = this.formBuilder.group({
      district_name: [''],
      district_gid: ['']
    });    
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


  createUser()
  {

    this.router.navigate(['admin/create-district/0']);
  }

  clearSearch()
  {

this.DistrictForm.reset();
  }

  
  edit(value: any) {
    console.log('the value is given as:', value);

    this.router.navigate(['admin/create-district/' + value.districtgid +'']);

    //this.router.navigate(['/admin/street-add/393dced8-36c4-4049-b13c-3b1f338a581e']);

   
 }

  search(){
    if (this.DistrictForm.invalid) {
      return;
    }
    
    const payload =
    
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
        "FILTERS": {
            "DISTRICT_NAME": this.DistrictForm.value.district_name ? this.DistrictForm.value.district_name : '',
            "DISTRICT_GID": this.DistrictForm.value.district_gid ? this.DistrictForm.value.district_gid : '',
        },
        "LIMIT": this.limit,
        "OFFSET": this.offset
    }

    // this.userForm.reset();
    this.adminService.getDistrictlist(payload).subscribe((data: any) => {
      //console.log(data);
      // this.data = data.data;
      this.totalCount = data['meta-data'].total_records_count;
      this.data = data.data.map((item: any) => {        
        item.districtname = `${item.district_name}`.trim();
        item.districtgid = `${item.district_gid}`.trim();        
        item.districtid = `${item.district_id}`.trim();        

        return item;
      });
    }, error => {
    });

  }

}
