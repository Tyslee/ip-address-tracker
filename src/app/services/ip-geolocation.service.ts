import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpGeolocationService {
  apiUrl = 'http://ip-api.com/json';

  constructor(private http: HttpClient) {}

  getLocationByIP(ipNum: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${ipNum}`);
  }
}
