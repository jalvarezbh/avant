import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpBaseService {
    public baseUrl = environment.apiUrl;

    constructor(protected http: HttpClient) { }

    public Get(url: string, parametros?: any): Observable<any> {
        return this.http.get<any>(this.baseUrl + url, { params: parametros });
    }

    public Post(url: string, body: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + url, body);
    }

    public Delete(url: string): Observable<any> {
        return this.http.delete<any>(this.baseUrl + url);
    }

    public Put(url: string, body: any): Observable<any> {
        return this.http.put<any>(this.baseUrl + url, body);
    }
}
