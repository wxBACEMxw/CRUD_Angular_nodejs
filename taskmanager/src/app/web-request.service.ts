import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL= 'http://localhost:3000';
  }

  get(uri: String){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: String, payLoad: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payLoad);
  }

  patch(uri: String, payLoad: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payLoad);
  }

  delete(uri: String){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }


}


