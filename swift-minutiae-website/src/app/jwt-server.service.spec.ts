import { TestBed } from '@angular/core/testing';

import { JwtServerService } from './jwt-server.service';

describe('JwtServerService', () => {
  let service: JwtServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
