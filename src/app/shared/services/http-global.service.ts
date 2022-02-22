import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {api} from "../constants/api";

@Injectable({
  providedIn: 'root'
})
export class HttpGlobalService {

  constructor(private httpClient: HttpClient) { }

  get(request: string): Observable<any>{
    const url = `${api.Gateway}/${request}`;
    return this.httpClient.get(url);
  }

  insert(request: string, data: any): Observable<any>{
    const url = `${api.Gateway}/${request}`;
    return this.httpClient.post(url, data);
  }

  put(request: string, data: any): Observable<any>{
    const url = `${api.Gateway}/${request}`;
    return this.httpClient.put(url, data);
  }

  patch(request: string, data: any): Observable<any>{
    const url = `${api.Gateway}/${request}`;
    return this.httpClient.patch(url, data);
  }

  delete(request: string): Observable<any>{
    const url = `${api.Gateway}/${request}`;
    return this.httpClient.delete(url);
  }

}
