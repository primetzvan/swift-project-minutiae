import { Component, OnInit } from '@angular/core';
import {JwtServerService} from '../jwt-server.service';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  qrCode: string;

  constructor(private jwtServerService: JwtServerService) {
    console.log(this.qrCode);
    this.qrCode = this.jwtServerService.qrCode;
  }

  ngOnInit(): void {
  }

}
