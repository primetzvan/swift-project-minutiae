import { Component, OnInit } from '@angular/core';
import {Door} from '../models/door';
import {JsonServerService} from '../json-server.service';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.css']
})
export class DoorsComponent implements OnInit {

  DOOR_DATA: Door[];
  displayedColumns: string[] = ['id', 'name', 'ip'];

  constructor(private doorService: JsonServerService) {
  }

  ngOnInit(): void {
    this.getDoors();
  }

  getDoors(): void {
    this.doorService.getAllDoors()
      .subscribe(doors => this.DOOR_DATA = doors);
  }

}
