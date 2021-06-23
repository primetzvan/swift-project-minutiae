import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Door} from '../models/door';
import {User} from '../models/user';
import {JsonServerService} from '../json-server.service';
import {FormControl, FormGroup} from '@angular/forms';
import {JwtServerService} from '../jwt-server.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, formatDate} from "@angular/common";


@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.css']
})
export class GenerateTokenComponent implements OnInit {

  users: User[];
  doors: Door[];

  qr: string | null;

  selectedUser: User | null;
  selectedDoor: Door | null;
  startDate: Date | null;
  endDate: Date | null;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private userService: JsonServerService, private jwtService: JwtServerService, private router: Router, private route: ActivatedRoute) {
    this.selectedUser = null;
    this.selectedDoor = null;
    this.startDate = null;
    this.endDate = null;
    this.qr = null;
  }

  ngOnInit(): void {
    this.getUsers();
    this.getDoors();
  }


  getUsers(): void {
    this.userService.getAllUser()
      .subscribe(users => this.users = users);
  }

  getDoors(): void {
    this.userService.getAllDoors()
      .subscribe(doors => this.doors = doors);
  }

  generateToken(): void {
    const format = 'dd.MM.yy';
    const locale = 'en-US';
    const startDate = formatDate(this.startDate, format, locale);
    const endDate = formatDate(this.endDate, format, locale);

    if (this.selectedDoor != null && this.selectedUser != null && this.startDate != null && this.endDate) {
      this.jwtService.getToken(this.selectedUser.userID, this.selectedDoor.doorID, startDate, endDate)
        .subscribe(html => this.jwtService.qrCode = html, () => console.log('error jwt'),
          () => this.router.navigate(['/users']));
      //           () => this.router.navigate(['/getToken']));
    }
  }
}
