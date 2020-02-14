import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Notice/home.component';
import { LoginComponent } from './Account/login.component';
import { HttpService } from './Services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomCookieService } from './Services/custom.cookie.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService, CookieService, CustomCookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
