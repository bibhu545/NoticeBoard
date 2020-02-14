import { TestBed } from '@angular/core/testing';

import { Custom.CookieService } from './custom.cookie.service';

describe('Custom.CookieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Custom.CookieService = TestBed.get(Custom.CookieService);
    expect(service).toBeTruthy();
  });
});
