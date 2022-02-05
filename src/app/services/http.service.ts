import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public get<T> (url: string, params?:HttpParams): Observable<T> {
    return this.http.get<T>(url, {params})
  }

  constructor(private http: HttpClient) { }
}
