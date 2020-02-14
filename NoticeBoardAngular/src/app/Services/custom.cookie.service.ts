import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginResponseModel } from '../Utils/models';


@Injectable({
  providedIn: 'root'
})
export class CustomCookieService {

  constructor(private cookieService: CookieService) { }
  saveLoginDataInCookies(data: LoginResponseModel) {
    var expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + 7);
    var dataToSave: string = data.userId + '||' + data.userName + '||' + data.email;
    this.cookieService.set('loggedUser', dataToSave, expiredDate, '/');
  }

  clearLoginDataFromCookies() {
    this.cookieService.delete('loggedUser');
  }

}
