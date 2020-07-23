import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {
    const host = window.location.hostname;


    if (host === 'localhost' && !environment.production) {
      this.configUrl = 'assets/config-local.json';
    }
  }

  getConfig$() {
    return this.http.get(this.configUrl);
  }
}
