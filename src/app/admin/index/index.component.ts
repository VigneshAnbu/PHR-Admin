import { Component } from '@angular/core';
import { AdminServiceService } from 'src/app/shared/service/admin-service.service';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  constructor( private adminService: AdminServiceService,
               private dataService: DataService) {

  }

  ngOnInit() {
  }
}
