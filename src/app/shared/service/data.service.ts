import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  districts = [];
  blocks = [];
  roles = [];

  constructor() { }
}
