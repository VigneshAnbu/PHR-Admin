import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminServiceService } from 'src/app/shared/service/admin-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-createstreet',
  templateUrl:'./createstreet.component.html',
  styleUrls: ['./createstreet.component.scss']
})
export class CreatestreetComponent {
  CreateStreetForm !: FormGroup;

  constructor( private formBuilder: FormBuilder, private adminService: AdminServiceService,
    private router: Router, private dataService: DataService, private route: ActivatedRoute) {
  }


  //personalDetailForm: any;
  finalBlockList:any[]=[];
  districts:any[]=[];
  blocks:any[]=[];
  Villages:any[]=[];
  Habitations:any[]=[];
  facilities:any[]=[];
  HUDS:any[]=[];

  cateringanganwadilist:any[]=[];

  RevVillageList:any[]=[];
  constituencyassemblyList:any[]=[];
  constituencyparliamentaryList:any[]=[];

  paramstreet_id:any="";

  ngOnInit() {
    
    this.createForm();
    //this.search();    
    this.districts = this.dataService.districts;
    this.blocks = this.dataService.blocks;
    this.RevVillage();
    this.constituencyassembly();
    this.constituencyparliamentary();
    

   this.paramstreet_id = this.route.snapshot.paramMap.get('paramstreet_id') == null ? "" : this.route.snapshot.paramMap.get('paramstreet_id');

   this.editStreetload();


  }


  createForm() {
    this.CreateStreetForm = this.formBuilder.group({
      district: [''],
      block: [''],
      village:[''],
      habitation:[''],
      facilityhsc:[''],
      hud:[''],
      street_name:'',
      ward:'',
      latitude:'',
      longitude:'',
      pincode:'',
      cateringanganwadi:[''],
      revvillage:[''],
      constituencyassembly:[''],
      constituencyparliamentary:[''],
      hscunit:[''],
      isactive:[''],
      costalarea:false,
      hillyarea:false,
      forestarea:false,
      tribalarea:false


      // hud: [''],
      // village: [''],
      // habitaion: [''],
      // street: [''],
      // cateringHSC: ['']
    });
    // (this.CreateStreetForm.controls as any).hscunit.enable()

    // (this.CreateStreetForm.controls as any).isactive.enable()
  }

  Backtostreet(){
    this.router.navigate(['/admin/street-management']);

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
      
      this.Facility();
      
      this.Village();
      
      this.CateringAnganwadi();
      this.HUD();
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

  finalBlocks() {
    //console.log('final block called', this.StreetForm.value.district);
    this.finalBlockList = this.blocks.filter(obj => obj.district_id.includes(this.CreateStreetForm.value.district));
    //console.log('final blocks', this.finalBlockList);
  }


  SaveStreet(){
    const payload={
      
      "STREET_DATA": {
          "street_id": this.CreateStreetForm.value.street_id ? this.CreateStreetForm.value.street_id : '',
          "street_gid": this.CreateStreetForm.value.street_gid ? this.CreateStreetForm.value.street_gid : '',
          "district_id": this.CreateStreetForm.value.district ? this.CreateStreetForm.value.district : '',
          "hud_id": this.CreateStreetForm.value.hud ? this.CreateStreetForm.value.hud : '',
          "block_id": this.CreateStreetForm.value.block ? this.CreateStreetForm.value.block : '',
          "village_id": this.CreateStreetForm.value.village ? this.CreateStreetForm.value.village : '',
          "habitation_id": this.CreateStreetForm.value.habitaion ? this.CreateStreetForm.value.habitaion : '',
          "facility_id": this.CreateStreetForm.value.facilityhsc ? this.CreateStreetForm.value.facilityhsc : '',
          "rev_village_id": this.CreateStreetForm.value.revvillage ? this.CreateStreetForm.value.revvillage : '',
          "assembly_constituency_id": this.CreateStreetForm.value.constituencyassembly ? this.CreateStreetForm.value.constituencyassembly : '',
          "parlimentary_constituency_id": this.CreateStreetForm.value.constituencyparliamentary ? this.CreateStreetForm.value.constituencyparliamentary : '',
          "catering_anganwadi_id": this.CreateStreetForm.value.cateringanganwadi ? this.CreateStreetForm.value.cateringanganwadi : '',
          "pincode": this.CreateStreetForm.value.pincode ? this.CreateStreetForm.value.pincode : '',
          "street_latitude": this.CreateStreetForm.value.latitude ? this.CreateStreetForm.value.latitude : '',
          "street_longitude": this.CreateStreetForm.value.longitude ? this.CreateStreetForm.value.longitude : '',
          "ward_number": this.CreateStreetForm.value.ward ? this.CreateStreetForm.value.ward : '',
          "hsc_unit_name": this.CreateStreetForm.value.hscunit ? this.CreateStreetForm.value.hscunit : '',
      }
    }


    this.adminService.savestreetlist(payload).subscribe((data: any) => {
      //this.Habitations = data.data;
      console.log(data.data);
      //(this.CreateStreetForm.controls as any).habitation.enable()
      // this.facilities = data.data.map((item: any) => {
      //   item.name = `${item.block_name}`.trim();
      //   return item;
      // });
      }, error => {
    
      });

  }


  editStreetload() {

//alert(this.paramstreet_id)

    const payload =
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS": {
        "BLOCK_ID": "",
        "VILLAGE_ID": "",
        "HABITATION_ID": "",
        "STREET_NAME": "",
        "FACILITY_ID": "",
        "STREET_GID": this.paramstreet_id ? this.paramstreet_id : '',
        "DISTRICT_ID": ""
      },
      "LIMIT": 1000,
      "OFFSET": 0
    }

    this.adminService.getstreets(payload).subscribe((data: any) => {
      console.log(data.data);
      this.CreateStreetForm = this.formBuilder.group({
        street_id: [data.data.street_id],
        street_name: [data.data.street_name],
        street_gid: [data.data.street_gid],
        district: [data.data.district_id],
        cateringanganwadi: [data.data.catering_anganwadi_id],
        catering_anganwadi_name: [data.data.catering_anganwadi_name],
        district_name: [data.data.district_name],
        hud: [data.data.hud_id],
        hud_name: [data.data.hud_name],
        block: [data.data.block_id],
        block_name: [data.data.block_name],
        village: [data.data.village_id],
        village_name: [data.data.village_name],
        revvillage: [data.data.rev_village_id],
        rev_village_name: [data.data.rev_village_name],
        habitation: [data.data.habitation_id],
        habitation_name: [data.data.habitation_name],
        latitude: [data.data.street_latitude],
        longitude: [data.data.directorate_id],

        facilityhsc: [data.data.facility_id],
        facility_name: [data.data.facility_name],
        costalarea: [data.data.coastal_area],
        hillyarea: [data.data.hilly_area],
        forestarea: [data.data.forest_area],
        tribalarea: [data.data.tribal_area],


        assembly_constituency_name: [data.data.assembly_constituency_name],
        constituencyassembly: [data.data.assembly_constituency_id],
        parlimentary_constituency_name: [data.data.parlimentary_constituency_name],
        constituencyparliamentary: [data.data.parlimentary_constituency_id],
        pincode: [data.data.pincode],
        hscunit: [data.data.hsc_unit_id],

        hsc_unit_name: [data.data.hsc_unit_name],
        ward: [data.data.ward_number],
        isactive:[data.data.active],

      });
    }, error => {

    });


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
    "VILLAGE_ID": this.CreateStreetForm.value.village ? this.CreateStreetForm.value.village : '',
    "HABITATION_NAME": "",
    "HABITATION_GID": ""
  },
    "LIMIT": 10,
  "OFFSET": 0
}

this.adminService.getHabitation(payload).subscribe((data: any) => {
  this.Habitations = data.data;
  console.log(this.Habitations);
  (this.CreateStreetForm.controls as any).habitation.enable()
  // this.facilities = data.data.map((item: any) => {
  //   item.name = `${item.block_name}`.trim();
  //   return item;
  // });
  }, error => {

  });


}


HUD()
{

const payload=
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
      "BLOCK_ID": this.CreateStreetForm.value.block ? this.CreateStreetForm.value.block : '',
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
  (this.CreateStreetForm.controls as any).village.enable()
  // this.facilities = data.data.map((item: any) => {
  //   item.name = `${item.block_name}`.trim();
  //   return item;
  // });
  }, error => {

  });


}

Facility(){

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
    "BLOCK_ID": this.CreateStreetForm.value.block ? this.CreateStreetForm.value.block : '',
    "INSTITUTION_GID":""
  },
  "GOVT_DEPARTMENT":"Health",
  "LIMIT": 10,
  "OFFSET": 0
}

this.adminService.getfacilityList(payload).subscribe((data: any) => {
  
  
  this.facilities = data.data;
  console.log(this.facilities);
  (this.CreateStreetForm.controls as any).facilityhsc.enable()
  // this.facilities = data.data.map((item: any) => {
  //   item.name = `${item.block_name}`.trim();
  //   return item;
  // });
  }, error => {

  });


}


CateringAnganwadi(){

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
      "BLOCK_ID": this.CreateStreetForm.value.block ? this.CreateStreetForm.value.block : '',
      "INSTITUTION_GID":""
    },
    "GOVT_DEPARTMENT":"ICDS",
      "LIMIT": 10,
    "OFFSET": 0
  }
  
  this.adminService.getfacilityList(payload).subscribe((data: any) => {
    this.cateringanganwadilist = data.data;
    //console.log(this.cateringanganwadilist);

    (this.CreateStreetForm.controls as any).cateringanganwadi.enable()

    //(this.CreateStreetForm.controls as any).facility.enable()
    // this.facilities = data.data.map((item: any) => {
    //   item.name = `${item.block_name}`.trim();
    //   return item;
    // });
    }, error => {
  
    });
  
  
  }


  RevVillage(){

    const payload=
    {
      "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
      "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625",
      "FILTERS": 
      {
        "DISTRICT_ID": this.CreateStreetForm.value.block ? this.CreateStreetForm.value.block : '',
        "TALUK_ID": "",
        "REV_VILLAGE_NAME": "",
        "REV_VILLAGE_GID": ""        
      },

      "LIMIT": 10,
      "OFFSET": 0
    }
    
    this.adminService.getRevVillage(payload).subscribe((data: any) => {
      this.RevVillageList = data.data;
      (this.CreateStreetForm.controls as any).revvillage.enable()
      // console.log(this.cateringanganwadilist);
      //(this.CreateStreetForm.controls as any).facility.enable()
      // this.facilities = data.data.map((item: any) => {
      //   item.name = `${item.block_name}`.trim();
      //   return item;
      // });
      }, error => {
    
      });
    
    
    }


    constituencyassembly(){

      const payload=
      {
        "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
        "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625"        
      }
      
      this.adminService.getconstituencyassembly(payload).subscribe((data: any) => {
        this.constituencyassemblyList = data.data;
        (this.CreateStreetForm.controls as any).constituencyassembly.enable()
        // console.log(this.cateringanganwadilist);
        //(this.CreateStreetForm.controls as any).facility.enable()
        // this.facilities = data.data.map((item: any) => {
        //   item.name = `${item.block_name}`.trim();
        //   return item;
        // });
        }, error => {
      
        });
      
      
      }


      constituencyparliamentary(){

        const payload=
        {
          "USER_ID": "94af8940-9562-4ce7-865d-457e2881ff33",
          "USER_FACILITY_ID": "a32fbc4f-8b08-4d56-b4e8-12c0be8db625"        
        }
        
        this.adminService.getconstituencyparliamentary(payload).subscribe((data: any) => {
          this.constituencyparliamentaryList = data.data;
          (this.CreateStreetForm.controls as any).constituencyparliamentary.enable()
          // console.log(this.cateringanganwadilist);
          //(this.CreateStreetForm.controls as any).facility.enable()
          // this.facilities = data.data.map((item: any) => {
          //   item.name = `${item.block_name}`.trim();
          //   return item;
          // });
          }, error => {
        
          });
        
        
        }


}
