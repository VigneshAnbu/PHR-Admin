import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  panelOpenState = true;
  filterForm: any;
  districts: any;
  finalBlockList: any;
  blocks: any;
  displayedColumns: any;
  dataSource: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  displayedColumn: any[] = [];

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
  }

  ngOnInit() {
    this.createForm();
    this.districts = this.dataService.districts;
    this.blocks = this.dataService.blocks;
    this.displayedColumns = ['name', 'weight'];
    this.displayedColumn = ['name', 'weight'];
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
      district: [''],
      block: ['']
    });
  }

  selectChange(districtData: string) {
    this.finalBlockList = this.blocks.filter((obj: any) => obj.district_id.includes(this.filterForm.value.district));
  }

  search() {
  }
  clearSearch() {
    this.filterForm.reset();
    if (this.filterForm.value.district == null) {
      this.finalBlockList = [];
    }
  }
}
