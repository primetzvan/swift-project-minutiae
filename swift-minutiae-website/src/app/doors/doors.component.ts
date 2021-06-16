import { Component, OnInit } from '@angular/core';
import {Door} from '../models/door';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.css']
})
export class DoorsComponent implements OnInit {

  DOOR_DATA: Door[];
  displayedColumns: string[] = ['id', 'name', 'ip', 'remove'];

  constructor() {
    this.DOOR_DATA = [];
    this.DOOR_DATA.push(new Door(1, 'Hintertür', '12.234.12.23'));
  }

  ngOnInit(): void {
  }

}
