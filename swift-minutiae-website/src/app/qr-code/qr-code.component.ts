import { Component, OnInit } from '@angular/core';
import {JwtServerService} from '../jwt-server.service';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  qr = '';

  constructor(private jwtServerService: JwtServerService) {
  }

  ngOnInit(): void {
    this.qr = this.jwtServerService.qrCode;
  }

}
