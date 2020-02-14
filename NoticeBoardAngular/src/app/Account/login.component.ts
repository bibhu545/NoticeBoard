import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/http.service';
import { LoginRequestModel, LoginResponseModel } from '../Utils/models';
import { API_END_POINTS } from '../Utils/utils';
import { Router } from '@angular/router';
import { CustomCookieService } from '../Services/custom.cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: LoginRequestModel = new LoginRequestModel();
  constructor(
    private http: HttpService, 
    private router: Router,
    private cookie: CustomCookieService
    ) { }

  ngOnInit() {
  }

  onLogin() {
    this.http.postData(API_END_POINTS.Login, this.loginData).subscribe(responseData => {
      if (responseData.results[0] == null) {
        console.log('invalid data');
      } else {
        var loginResponse: LoginResponseModel = responseData.results[0];
        this.cookie.saveLoginDataInCookies(loginResponse);
        this.router.navigateByUrl('/home');
      }
    }, error => {
      console.log(error);
    });
  }

}
