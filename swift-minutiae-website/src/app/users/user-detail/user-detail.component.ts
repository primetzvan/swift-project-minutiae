import {ActivatedRoute} from '@angular/router';
import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public id;
  public firstName: string;
  public lastName: string;
  public email: string;
  public role: Role | null;

  constructor(private route: ActivatedRoute) {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.role = null;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  public checkEmail(): boolean{
    return !!(this.email !== '' && this.email.search('@'));
  }

  addUser(): void {
    // TODO
  }
}

export enum Role {
  Admin,
  User
}
