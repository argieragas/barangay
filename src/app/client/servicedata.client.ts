
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ReportData } from 'src/utils/data';
import { ApiResponse } from 'src/utils/data';
@Injectable({
  providedIn: 'root',
})

export class ServiceData {
  constructor(private http: HttpClient) {}

  public getReport(): Observable<ReportData[]> {
    return this.http.get<ReportData[]>(
      environment.apiUrl + '/getReport'
    )
  }

  public deleteReport(id): Observable<string> {
    return this.http.delete<string>(environment.apiUrl + '/deleteReport/'+id)
  }

  public addReport(data: ReportData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + '/newReport',data)
  }

  public updateReport(data: ReportData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + '/updateReport',data)
  }
}
