import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upsert-user-registration',
  templateUrl: './upsert-user-registration.component.html',
  styleUrls: ['./upsert-user-registration.component.scss']
})
export class UpsertUserRegistrationComponent {
  isLinear = false;
  personalDetailForm: any;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.personalDetailForm = this.formBuilder.group({
      title: [''],
      firstName: [''],
      lastName: [''],
      gender: [''],
      dob: [''],
      number: [''],
      email: [''],
      address: ['']
    });
  }

  search() {

  }

  navigateBack() {
    this.router.navigate(['/admin/registration'])
  }
}
