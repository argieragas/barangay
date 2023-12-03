
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetLocation, ReportData } from 'src/utils/data';
import { ApiResponse } from 'src/utils/data';
import { CaseData } from 'src/utils/data';
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

  public getLocationReport(): Observable<GetLocation[]> {
    return this.http.get<GetLocation[]>(environment.apiUrl + '/getLocationReport')
  }

  public getCase(): Observable<CaseData[]> {
    return this.http.get<CaseData[]>(environment.apiUrl + '/getCase')
  }

  public addCase(data: CaseData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + '/newCase', data)
  }

  public updateCase(data: CaseData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + '/updateCase', data)
  }

  public getLocationCase(): Observable<GetLocation[]> {
    return this.http.get<GetLocation[]>(environment.apiUrl + '/getLocationCase')
  }

  public getCountReport(): Observable<number> {
    return this.http.get<number>(environment.apiUrl + '/getCountReport');
  }

  public getCountCase(): Observable<number> {
    return this.http.get<number>(environment.apiUrl + '/getCountCase')
  }
}
