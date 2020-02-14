import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequestModel } from '../Utils/models';
import { Observable } from 'rxjs';
import { API_END_POINTS } from '../Utils/utils';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {

  }

  postData(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data);
  }

}
